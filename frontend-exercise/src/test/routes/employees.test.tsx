import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

// Import the actual page component
import { Route as EmployeesRoute } from '../../routes/employees';

// Helper to create a test router for employees page
function createTestRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const rootRoute = createRootRoute();

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <div>Dashboard</div>,
  });

  const employeesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/employees',
    component: EmployeesRoute.options.component,
  });

  const routeTree = rootRoute.addChildren([indexRoute, employeesRoute]);

  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ['/employees'] }),
    context: { queryClient },
  });

  return { router, queryClient };
}

function renderEmployeesPage() {
  const { router, queryClient } = createTestRouter();
  return render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

describe('Employees Page', () => {
  it('renders page title', async () => {
    renderEmployeesPage();
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Employees' })).toBeInTheDocument();
    });
  });

  it('renders back link to dashboard', async () => {
    renderEmployeesPage();
    await waitFor(() => {
      const backLink = screen.getByRole('link', { name: /back to dashboard/i });
      expect(backLink).toHaveAttribute('href', '/');
    });
  });

  it('renders employee table with correct headers', async () => {
    renderEmployeesPage();
    await waitFor(() => {
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Department')).toBeInTheDocument();
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Salary')).toBeInTheDocument();
      expect(screen.getByText('Hire Date')).toBeInTheDocument();
    });
  });

  it('renders employee data from API', async () => {
    renderEmployeesPage();
    // Wait for employee data (from MSW mock)
    await waitFor(() => {
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
      expect(screen.getByText('Staff Engineer')).toBeInTheDocument();
    });
  });

  it('shows total employee count', async () => {
    renderEmployeesPage();
    await waitFor(() => {
      expect(screen.getByText('19 total employees')).toBeInTheDocument();
    });
  });

  it('renders employees from multiple departments', async () => {
    renderEmployeesPage();
    await waitFor(() => {
      // Check employees from different departments
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument(); // Engineering
      expect(screen.getByText('Carol Williams')).toBeInTheDocument(); // Product
      expect(screen.getByText('David Brown')).toBeInTheDocument(); // Design
    });
  });

  // TODO: Add tests for filtering functionality
  // it('filters employees by department when search param is set', async () => {
  //   // Render with ?department=Engineering
  //   // Verify only Engineering employees are shown
  // });
});
