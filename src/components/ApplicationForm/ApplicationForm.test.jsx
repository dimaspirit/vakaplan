import { ApplicationForm } from './ApplicationForm.jsx';

import { test, expect  } from 'vitest';
import { render } from '@testing-library/react';

describe('ApplicationForm', () => {
  test('renders "Company Name" form item', () => {
    const { getByText } = render(<ApplicationForm onSubmitForm={() => {}} />);
    const labelEl = getByText("Company Name");
    expect(labelEl).toBeDefined();
  });
});
