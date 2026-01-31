import { http, HttpResponse, delay } from 'msw';
import type { DepartmentMetrics, User } from '../types';
import { generateEmployees } from './employeeGenerator';

const currentUser: User = {
  id: 'user-1',
  name: 'Test User',
  departments: ['Engineering', 'Product', 'Design'],
};

// Generate employees with realistic department distribution (145 total)
const mockEmployees = generateEmployees(42);

// Calculate metrics from employee data
function calculateDepartmentMetrics(): DepartmentMetrics[] {
  const departments = [...new Set(mockEmployees.map(emp => emp.department))];
  const today = new Date();

  return departments.map(dept => {
    const deptEmployees = mockEmployees.filter(emp => emp.department === dept);
    const totalSalary = deptEmployees.reduce((sum, emp) => sum + emp.salary, 0);
    const totalTenure = deptEmployees.reduce((sum, emp) => {
      const hireDate = new Date(emp.hireDate);
      const days = Math.floor((today.getTime() - hireDate.getTime()) / (1000 * 60 * 60 * 24));
      return sum + days;
    }, 0);

    return {
      department: dept,
      employeeCount: deptEmployees.length,
      averageSalary: Math.round(totalSalary / deptEmployees.length),
      averageTenureDays: Math.round(totalTenure / deptEmployees.length),
    };
  });
}

export const handlers = [
  // Get employees with optional filters
  http.get('/api/employees', async ({ request }) => {
    await delay(150);

    const url = new URL(request.url);
    const department = url.searchParams.get('department');
    const name = url.searchParams.get('name');
    const title = url.searchParams.get('title');
    const minSalary = url.searchParams.get('minSalary');
    const maxSalary = url.searchParams.get('maxSalary');
    const hiredAfter = url.searchParams.get('hiredAfter');
    const hiredBefore = url.searchParams.get('hiredBefore');

    let filtered = [...mockEmployees];

    if (department) {
      filtered = filtered.filter((emp) => emp.department === department);
    }
    if (name) {
      filtered = filtered.filter((emp) =>
        emp.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    if (title) {
      filtered = filtered.filter((emp) =>
        emp.title.toLowerCase().includes(title.toLowerCase())
      );
    }
    if (minSalary) {
      filtered = filtered.filter((emp) => emp.salary >= Number(minSalary));
    }
    if (maxSalary) {
      filtered = filtered.filter((emp) => emp.salary <= Number(maxSalary));
    }
    if (hiredAfter) {
      filtered = filtered.filter((emp) => emp.hireDate >= hiredAfter);
    }
    if (hiredBefore) {
      filtered = filtered.filter((emp) => emp.hireDate <= hiredBefore);
    }

    return HttpResponse.json(filtered);
  }),

  // Get department metrics (aggregated data)
  http.get('/api/departments/metrics', async () => {
    await delay(200);
    const metrics = calculateDepartmentMetrics();
    return HttpResponse.json(metrics);
  }),

  // Get current user
  http.get('/api/me', async () => {
    await delay(100);
    return HttpResponse.json(currentUser);
  }),
];
