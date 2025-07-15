import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, beforeEach, vi, expect } from 'vitest';
import { AuthForm } from './AuthForm';
import userEvent from '@testing-library/user-event'

const loginMock = vi.fn(() => new Promise((res) => setTimeout(res, 300)));
const signupMock = vi.fn(() => new Promise((res) => setTimeout(res, 100)));

vi.mock('../../store/authStore', () => {
  return {
    __esModule: true,
    default: (selector) =>
      selector({
        login: loginMock,
        signup: signupMock,
      }),
  };
});

vi.mock('../../services/auth', () => ({
  __esModule: true,
  default: {},
}));

vi.mock('./schema', async () => {
  const z = await import('zod');
  return {
    formSchema: z.object({
      email: z.string().email("Even spam bots do better. Give it another shot."),
      password: z.string().regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
        "This password couldn't scare a hacker if it tried."
      ),
    }),
  };
});

vi.mock('@hookform/resolvers/zod', () => ({
  zodResolver: (schema) => (data) => {
    try {
      schema.parse(data);
      return { values: data, errors: {} };
    } catch (e) {
      return {
        values: {},
        errors: e.formErrors?.fieldErrors || {},
      };
    }
  },
}));

vi.mock('lucide-react', () => ({
  Loader2Icon: () => <span data-testid="loader" />,
  AlertCircleIcon: () => <span data-testid="alert-icon" />,
}));

describe('AuthForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login view by default', () => {
    render(<AuthForm />);
    expect(screen.getByText('Welcome again')).toBeInTheDocument();
    expect(screen.getByText('Your journey continues here')).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByText(/Do not have an account\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign up/i)).toBeInTheDocument();
  });

  it('toggles to signup view', () => {
    render(<AuthForm />);
    fireEvent.click(screen.getByRole('button', { name: /Sign up/i }));
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText('Your journey starts here')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign up/i })).toBeInTheDocument();
    expect(screen.getByText(/Already have an account\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it('submits login form', async () => {
    render(<AuthForm />);
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'SecurePass123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'SecurePass123',
      });
    });
  });

  it('submits signup form', async () => {
    render(<AuthForm />);
    fireEvent.click(screen.getByRole('button', { name: /Sign up/i }));

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'newuser@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'SecurePass123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Sign up/i }));

    await waitFor(() => {
      expect(signupMock).toHaveBeenCalledWith({
        email: 'newuser@example.com',
        password: 'SecurePass123',
      });
    });
  });

  it('shows error alert when email already in use', async () => {
    signupMock.mockRejectedValueOnce({ code: 'auth/email-already-in-use' });
    render(<AuthForm />);
    fireEvent.click(screen.getByRole('button', { name: /Sign up/i }));

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'existing@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'ValidPass1' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/Déjà vu\?/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Looks like you've already signed up/i)
      ).toBeInTheDocument();
    });
  });

  it('shows loader when submitting', async () => {
    render(<AuthForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/Password/i), 'SecurePass123');
    await user.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() =>
      expect(
        screen.getByText((_, node) => node.textContent === 'Please wait')
      ).toBeInTheDocument()
    );

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalled();
    });
  });
});
