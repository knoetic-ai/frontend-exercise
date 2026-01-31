import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import type { EmployeeFilters } from '../types';
import { useEmployees } from '../hooks/useEmployees';

const employeeSearchSchema = {
  parse: (search: Record<string, unknown>): EmployeeFilters => ({
    department: typeof search.department === 'string' ? search.department : undefined,
    name: typeof search.name === 'string' ? search.name : undefined,
    title: typeof search.title === 'string' ? search.title : undefined,
    minSalary: typeof search.minSalary === 'string' ? Number(search.minSalary) : undefined,
    maxSalary: typeof search.maxSalary === 'string' ? Number(search.maxSalary) : undefined,
    hiredAfter: typeof search.hiredAfter === 'string' ? search.hiredAfter : undefined,
    hiredBefore: typeof search.hiredBefore === 'string' ? search.hiredBefore : undefined,
  }),
};

export const Route = createFileRoute('/employees')({
  validateSearch: employeeSearchSchema.parse,
  component: EmployeesPage,
});

function EmployeesPage() {
  const { data: employees, isLoading, error } = useEmployees();
  const [tableView, setTableView] = useState<'comfortable' | 'compact'>('comfortable');

  const filters = Route.useSearch();

  const isCompact = tableView === 'compact';

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(salary);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="p-12 text-center text-gray-500">
        Loading employees...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-12 text-center text-red-600">
        Failed to load employees
      </div>
    );
  }

  const cellPadding = isCompact ? 'py-2 px-4' : 'py-3 px-4';

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <Link
        to="/"
        className="text-gray-500 text-sm inline-block mb-4 hover:text-gray-700 transition-colors"
      >
        ← Back to Dashboard
      </Link>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Employees
          </h1>
          <p className="text-base text-gray-500">
            {employees?.length || 0} total employees
          </p>
        </div>

        {/* Table view toggle - resets on navigation, could use store to persist */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-md">
          <button
            onClick={() => setTableView('comfortable')}
            className={`px-3 py-1.5 text-sm rounded cursor-pointer border-none transition-colors ${
              tableView === 'comfortable'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'bg-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Comfortable
          </button>
          <button
            onClick={() => setTableView('compact')}
            className={`px-3 py-1.5 text-sm rounded cursor-pointer border-none transition-colors ${
              tableView === 'compact'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'bg-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Compact
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className={`${cellPadding} text-left font-semibold text-gray-700 border-b border-gray-200`}>Name</th>
              <th className={`${cellPadding} text-left font-semibold text-gray-700 border-b border-gray-200`}>Department</th>
              <th className={`${cellPadding} text-left font-semibold text-gray-700 border-b border-gray-200`}>Title</th>
              <th className={`${cellPadding} text-left font-semibold text-gray-700 border-b border-gray-200`}>Salary</th>
              <th className={`${cellPadding} text-left font-semibold text-gray-700 border-b border-gray-200`}>Hire Date</th>
            </tr>
          </thead>
          <tbody>
            {employees?.map((emp) => (
              <tr key={emp.id} className="border-b border-gray-200 last:border-b-0">
                <td className={`${cellPadding} text-gray-900`}>{emp.name}</td>
                <td className={`${cellPadding} text-gray-500`}>{emp.department}</td>
                <td className={`${cellPadding} text-gray-500`}>{emp.title}</td>
                <td className={`${cellPadding} text-gray-900`}>{formatSalary(emp.salary)}</td>
                <td className={`${cellPadding} text-gray-500`}>{formatDate(emp.hireDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
