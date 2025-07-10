import { Topbar } from './Topbar.jsx';
import { SidebarProvider } from "@/components/ui/sidebar";

import { test, expect  } from 'vitest';
import { render } from '@testing-library/react';

describe('Topbar', () => {
  test('renders "Toggle Sidebar" button', () => {
    const { getByText } = render(<SidebarProvider><Topbar /></SidebarProvider>);
    const btnElement = getByText("Toggle Sidebar");
    expect(btnElement).toBeDefined()
  });

  test('renders "Add application" button', () => {
    const { getByText } = render(<SidebarProvider><Topbar /></SidebarProvider>);
    const btnElement = getByText("Add application");
    expect(btnElement).toBeDefined()
  });
});
