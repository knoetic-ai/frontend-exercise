import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DepartmentCard } from './DepartmentCard';
import { DepartmentMetrics } from '../types';

describe('DepartmentCard', () => {
  const mockMetrics: DepartmentMetrics = {
    department: 'Engineering',
    employeeCount: 10,
    averageSalary: 120000,
    averageTenureDays: 365,
  };

  it('renders department name', () => {
    render(<DepartmentCard metrics={mockMetrics} />);
    expect(screen.getByText('Engineering')).toBeInTheDocument();
  });

  it('renders employee count', () => {
    render(<DepartmentCard metrics={mockMetrics} />);
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('formats salary correctly', () => {
    render(<DepartmentCard metrics={mockMetrics} />);
    expect(screen.getByText('$120,000')).toBeInTheDocument();
  });

  it('formats tenure correctly for years and months', () => {
    render(<DepartmentCard metrics={mockMetrics} />);
    expect(screen.getByText('1y 0m')).toBeInTheDocument();
  });

  it('formats tenure correctly for months only', () => {
    const metricsWithShortTenure = { ...mockMetrics, averageTenureDays: 90 };
    render(<DepartmentCard metrics={metricsWithShortTenure} />);
    expect(screen.getByText('3m')).toBeInTheDocument();
  });
});
