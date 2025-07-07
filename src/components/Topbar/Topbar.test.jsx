import { Topbar } from './Topbar.jsx';
import { SidebarProvider } from "@/components/ui/sidebar";

import { test, expect  } from 'vitest';
import { render } from '@testing-library/react';

describe('Topbar', () => {
  test('renders button "Add application"', () => {
    const { getByText } = render(<SidebarProvider><Topbar /></SidebarProvider>);
    const btnElement = getByText("Add Application");
    expect(btnElement).toBeDefined()
  });
});
