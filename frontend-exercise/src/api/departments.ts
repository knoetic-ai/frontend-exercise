import type { Employee, DepartmentMetrics, EmployeeFilters } from '../types';

const API_BASE = '/api';

export async function fetchEmployees(filters?: EmployeeFilters): Promise<Employee[]> {
  const params = new URLSearchParams();

  if (filters?.department) params.set('department', filters.department);
  if (filters?.name) params.set('name', filters.name);
  if (filters?.title) params.set('title', filters.title);
  if (filters?.minSalary !== undefined) params.set('minSalary', String(filters.minSalary));
  if (filters?.maxSalary !== undefined) params.set('maxSalary', String(filters.maxSalary));
  if (filters?.hiredAfter) params.set('hiredAfter', filters.hiredAfter);
  if (filters?.hiredBefore) params.set('hiredBefore', filters.hiredBefore);

  const queryString = params.toString();
  const url = queryString ? `${API_BASE}/employees?${queryString}` : `${API_BASE}/employees`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch employees');
  }

  return response.json();
}

export async function fetchDepartmentMetrics(): Promise<DepartmentMetrics[]> {
  const response = await fetch(`${API_BASE}/departments/metrics`);

  if (!response.ok) {
    throw new Error('Failed to fetch department metrics');
  }

  return response.json();
}
