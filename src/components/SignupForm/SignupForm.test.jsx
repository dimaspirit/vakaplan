import { test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SignupForm } from './SignupForm.jsx';
import { createRoutesStub } from "react-router";
import { useNavigate } from 'react-router';

const mockedUsedNavigate = vi.fn(); 

describe('SignupForm', () => {
  beforeEach(() => {
    vi.mock('react-router', () => {
      return {
        ...vi.importActual('react-router'),
        useNavigate: () => mockedUsedNavigate,
      };
    });
  });

  test('renders title', () => {
    // const Stub = createRoutesStub([
    //   {
    //     path: "/auth",
    //     Component: SignupForm,
    //   },
    // ]);

    // const button = await findByTestId('navigate-buttton');
    // expect(button).toBeTruthy();

    // fireEvent.click(button);
    // await waitFor(() => expect(mockedUsedNavigate).toBeCalledWith('/path'));
  
    const { getByText } = render(<SignupForm />);
    const titleElement = getByText("Welcome again");
    expect(titleElement).toBeInTheDocument();
  });
});
