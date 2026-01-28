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
      <div style={{ padding: '48px', textAlign: 'center', color: '#6b7280' }}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '48px', textAlign: 'center', color: '#dc2626' }}>
        Failed to load department data
      </div>
    );
  }

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1
            style={{
              margin: '0 0 8px 0',
              fontSize: '28px',
              fontWeight: 700,
              color: '#111827',
            }}
          >
            Department Metrics
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: '16px',
              color: '#6b7280',
            }}
          >
            Overview of headcount, compensation, and tenure by department
          </p>
        </div>
        <Link
          to="/employees"
          style={{
            padding: '8px 16px',
            backgroundColor: '#111827',
            color: '#ffffff',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          View All Employees
        </Link>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
        }}
      >
        {departments?.map((dept) => (
          <DepartmentCard key={dept.department} metrics={dept} />
        ))}
      </div>
    </div>
  );
}
