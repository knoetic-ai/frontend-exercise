import { createFileRoute, Link } from '@tanstack/react-router';
import { useDepartmentMetrics } from '../hooks/useDepartmentMetrics';
import { DepartmentCard } from '../components/DepartmentCard';

export const Route = createFileRoute('/')({
  component: DashboardPage,
});

function DashboardPage() {
  const { data: departments, isLoading, error } = useDepartmentMetrics();

  if (isLoading) {
    return (
      <div className="p-12 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-12 text-center text-red-600">
        Failed to load department data
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Department Metrics
          </h1>
          <p className="text-base text-gray-500">
            Overview of headcount, compensation, and tenure by department
          </p>
        </div>
        <Link
          to="/employees"
          className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          View All Employees
        </Link>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
        {departments?.map((dept) => (
          <DepartmentCard key={dept.department} metrics={dept} />
        ))}
      </div>
    </div>
  );
}
