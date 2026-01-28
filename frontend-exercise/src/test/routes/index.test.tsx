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
import { Route as IndexRoute } from '../../routes/index';

// Helper to create a test router with React Query
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
    component: IndexRoute.options.component,
  });

  const employeesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/employees',
    component: () => <div>Employees Page</div>,
  });

  const routeTree = rootRoute.addChildren([indexRoute, employeesRoute]);

  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ['/'] }),
    context: { queryClient },
  });

  return { router, queryClient };
}

function renderDashboard() {
  const { router, queryClient } = createTestRouter();
  return render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

describe('Dashboard Page', () => {
  it('renders page title', async () => {
    renderDashboard();
    await waitFor(() => {
      expect(screen.getByText('Department Metrics')).toBeInTheDocument();
    });
  });

  it('renders page subtitle', async () => {
    renderDashboard();
    await waitFor(() => {
      expect(screen.getByText(/Overview of headcount/)).toBeInTheDocument();
    });
  });

  it('renders link to employees page', async () => {
    renderDashboard();
    await waitFor(() => {
      const link = screen.getByRole('link', { name: /view all employees/i });
      expect(link).toHaveAttribute('href', '/employees');
    });
  });

  it('renders department cards after loading', async () => {
    renderDashboard();
    // Wait for Engineering department to appear (from MSW mock data)
    await waitFor(() => {
      expect(screen.getByText('Engineering')).toBeInTheDocument();
    });
  });

  it('renders multiple departments', async () => {
    renderDashboard();
    await waitFor(() => {
      expect(screen.getByText('Engineering')).toBeInTheDocument();
      expect(screen.getByText('Product')).toBeInTheDocument();
      expect(screen.getByText('Design')).toBeInTheDocument();
    });
  });

  it('renders all 7 departments from mock data', async () => {
    renderDashboard();
    await waitFor(() => {
      expect(screen.getByText('Engineering')).toBeInTheDocument();
      expect(screen.getByText('Product')).toBeInTheDocument();
      expect(screen.getByText('Design')).toBeInTheDocument();
      expect(screen.getByText('Sales')).toBeInTheDocument();
      expect(screen.getByText('Marketing')).toBeInTheDocument();
      expect(screen.getByText('Finance')).toBeInTheDocument();
      expect(screen.getByText('HR')).toBeInTheDocument();
    });
  });

  // TODO: Add tests for department card click -> navigate to /employees?department=X
  // it('clicking a department card navigates to filtered employees', async () => {
  //   renderDashboard();
  //   await waitFor(() => {
  //     expect(screen.getByText('Engineering')).toBeInTheDocument();
  //   });
  //   // ... click card and verify navigation with search params
  // });
});
