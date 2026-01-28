import { createFileRoute, Link } from '@tanstack/react-router';
import { useEmployees } from '../hooks/useEmployees';
import { useTableView, useSetTableView } from '../store/dashboardStore';

export const Route = createFileRoute('/employees')({
  component: EmployeesPage,
});

function EmployeesPage() {
  const { data: employees, isLoading, error } = useEmployees();
  const tableView = useTableView();
  const setTableView = useSetTableView();

  const isCompact = tableView === 'compact';
  const cellPadding = isCompact ? '8px 16px' : '12px 16px';

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
      <div style={{ padding: '48px', textAlign: 'center', color: '#6b7280' }}>
        Loading employees...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '48px', textAlign: 'center', color: '#dc2626' }}>
        Failed to load employees
      </div>
    );
  }

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      <Link
        to="/"
        style={{
          color: '#6b7280',
          textDecoration: 'none',
          fontSize: '14px',
          display: 'inline-block',
          marginBottom: '16px',
        }}
      >
        ← Back to Dashboard
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1
            style={{
              margin: '0 0 8px 0',
              fontSize: '28px',
              fontWeight: 700,
              color: '#111827',
            }}
          >
            Employees
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: '16px',
              color: '#6b7280',
            }}
          >
            {employees?.length || 0} total employees
          </p>
        </div>

        {/* Table view toggle - working example of Zustand usage */}
        <div style={{ display: 'flex', gap: '4px', backgroundColor: '#f3f4f6', padding: '4px', borderRadius: '6px' }}>
          <button
            onClick={() => setTableView('comfortable')}
            style={{
              padding: '6px 12px',
              fontSize: '13px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              backgroundColor: tableView === 'comfortable' ? '#ffffff' : 'transparent',
              color: tableView === 'comfortable' ? '#111827' : '#6b7280',
              boxShadow: tableView === 'comfortable' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
            }}
          >
            Comfortable
          </button>
          <button
            onClick={() => setTableView('compact')}
            style={{
              padding: '6px 12px',
              fontSize: '13px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              backgroundColor: tableView === 'compact' ? '#ffffff' : 'transparent',
              color: tableView === 'compact' ? '#111827' : '#6b7280',
              boxShadow: tableView === 'compact' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
            }}
          >
            Compact
          </button>
        </div>
      </div>

      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          overflow: 'hidden',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <th style={{ padding: cellPadding, textAlign: 'left', fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>Name</th>
              <th style={{ padding: cellPadding, textAlign: 'left', fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>Department</th>
              <th style={{ padding: cellPadding, textAlign: 'left', fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>Title</th>
              <th style={{ padding: cellPadding, textAlign: 'left', fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>Salary</th>
              <th style={{ padding: cellPadding, textAlign: 'left', fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>Hire Date</th>
            </tr>
          </thead>
          <tbody>
            {employees?.map((emp) => (
              <tr key={emp.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: cellPadding, color: '#111827' }}>{emp.name}</td>
                <td style={{ padding: cellPadding, color: '#6b7280' }}>{emp.department}</td>
                <td style={{ padding: cellPadding, color: '#6b7280' }}>{emp.title}</td>
                <td style={{ padding: cellPadding, color: '#111827' }}>{formatSalary(emp.salary)}</td>
                <td style={{ padding: cellPadding, color: '#6b7280' }}>{formatDate(emp.hireDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
