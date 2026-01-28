import { DepartmentMetrics, Employee } from '../types';

const API_BASE = '/api';

export async function fetchEmployees(): Promise<Employee[]> {
  const response = await fetch(`${API_BASE}/employees`);

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

export async function fetchEmployeesByDepartment(department: string): Promise<Employee[]> {
  const response = await fetch(`${API_BASE}/departments/${encodeURIComponent(department)}/employees`);

  if (!response.ok) {
    throw new Error('Failed to fetch employees');
  }

  return response.json();
}
