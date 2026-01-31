import { DepartmentMetrics } from '../types';

interface DepartmentCardProps {
  metrics: DepartmentMetrics;
}

export function DepartmentCard({ metrics }: DepartmentCardProps) {
  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(salary);
  };

  const formatTenure = (days: number) => {
    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);
    if (years > 0) {
      return `${years}y ${months}m`;
    }
    return `${months}m`;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        {metrics.department}
      </h3>

      <div className="flex flex-col gap-3">
        <div>
          <div className="text-sm text-gray-500 mb-1">Employees</div>
          <div className="text-2xl font-semibold text-gray-900">
            {metrics.employeeCount}
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-500 mb-1">Avg. Salary</div>
          <div className="text-xl font-medium text-gray-900">
            {formatSalary(metrics.averageSalary)}
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-500 mb-1">Avg. Tenure</div>
          <div className="text-xl font-medium text-gray-900">
            {formatTenure(metrics.averageTenureDays)}
          </div>
        </div>
      </div>
    </div>
  );
}
