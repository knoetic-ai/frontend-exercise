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
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
      }}
    >
      <h3
        style={{
          margin: '0 0 16px 0',
          fontSize: '18px',
          fontWeight: 600,
          color: '#111827',
        }}
      >
        {metrics.department}
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
            Employees
          </div>
          <div style={{ fontSize: '24px', fontWeight: 600, color: '#111827' }}>
            {metrics.employeeCount}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
            Avg. Salary
          </div>
          <div style={{ fontSize: '20px', fontWeight: 500, color: '#111827' }}>
            {formatSalary(metrics.averageSalary)}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
            Avg. Tenure
          </div>
          <div style={{ fontSize: '20px', fontWeight: 500, color: '#111827' }}>
            {formatTenure(metrics.averageTenureDays)}
          </div>
        </div>
      </div>
    </div>
  );
}
