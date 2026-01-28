import { http, HttpResponse, delay } from 'msw';
import { Employee, DepartmentMetrics } from '../types';

// Mock employee data - more realistic with multiple departments
const mockEmployees: Employee[] = [
  // Engineering (4 employees)
  { id: '1', name: 'Alice Johnson', email: 'alice@company.com', department: 'Engineering', hireDate: '2023-01-15', salary: 145000, title: 'Staff Engineer' },
  { id: '2', name: 'Bob Smith', email: 'bob@company.com', department: 'Engineering', hireDate: '2023-06-01', salary: 125000, title: 'Senior Engineer' },
  { id: '3', name: 'Eva Martinez', email: 'eva@company.com', department: 'Engineering', hireDate: '2024-02-15', salary: 110000, title: 'Engineer' },
  { id: '4', name: 'Henry Chen', email: 'henry@company.com', department: 'Engineering', hireDate: '2024-08-01', salary: 95000, title: 'Junior Engineer' },

  // Product (3 employees)
  { id: '5', name: 'Carol Williams', email: 'carol@company.com', department: 'Product', hireDate: '2023-03-20', salary: 140000, title: 'Senior PM' },
  { id: '6', name: 'Grace Kim', email: 'grace@company.com', department: 'Product', hireDate: '2023-09-15', salary: 125000, title: 'Product Manager' },
  { id: '7', name: 'Mike Taylor', email: 'mike@company.com', department: 'Product', hireDate: '2024-04-01', salary: 115000, title: 'Associate PM' },

  // Design (3 employees)
  { id: '8', name: 'David Brown', email: 'david@company.com', department: 'Design', hireDate: '2023-05-10', salary: 130000, title: 'Design Lead' },
  { id: '9', name: 'Iris Patel', email: 'iris@company.com', department: 'Design', hireDate: '2023-11-01', salary: 110000, title: 'Senior Designer' },
  { id: '10', name: 'Nina Rodriguez', email: 'nina@company.com', department: 'Design', hireDate: '2024-06-15', salary: 85000, title: 'Designer' },

  // Sales (3 employees)
  { id: '11', name: 'Frank Lee', email: 'frank@company.com', department: 'Sales', hireDate: '2023-02-28', salary: 95000, title: 'Sales Manager' },
  { id: '12', name: 'Jack Wilson', email: 'jack@company.com', department: 'Sales', hireDate: '2023-07-15', salary: 75000, title: 'Account Executive' },
  { id: '13', name: 'Sarah Davis', email: 'sarah@company.com', department: 'Sales', hireDate: '2024-01-10', salary: 70000, title: 'Sales Rep' },

  // Marketing (2 employees)
  { id: '14', name: 'Tom Anderson', email: 'tom@company.com', department: 'Marketing', hireDate: '2023-04-01', salary: 105000, title: 'Marketing Manager' },
  { id: '15', name: 'Lisa White', email: 'lisa@company.com', department: 'Marketing', hireDate: '2024-03-01', salary: 80000, title: 'Marketing Specialist' },

  // Finance (2 employees)
  { id: '16', name: 'Chris Moore', email: 'chris@company.com', department: 'Finance', hireDate: '2023-08-15', salary: 120000, title: 'Finance Manager' },
  { id: '17', name: 'Amy Garcia', email: 'amy@company.com', department: 'Finance', hireDate: '2024-05-01', salary: 85000, title: 'Financial Analyst' },

  // HR (2 employees)
  { id: '18', name: 'Rachel Green', email: 'rachel@company.com', department: 'HR', hireDate: '2023-10-01', salary: 95000, title: 'HR Manager' },
  { id: '19', name: 'Kevin Brown', email: 'kevin@company.com', department: 'HR', hireDate: '2024-07-15', salary: 70000, title: 'HR Coordinator' },
];

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
  // Get all employees
  http.get('/api/employees', async () => {
    await delay(150); // Simulate network delay
    return HttpResponse.json(mockEmployees);
  }),

  // Get department metrics (aggregated data)
  http.get('/api/departments/metrics', async () => {
    await delay(200); // Simulate network delay
    const metrics = calculateDepartmentMetrics();
    return HttpResponse.json(metrics);
  }),

  // Get employees by department
  http.get('/api/departments/:department/employees', async ({ params }) => {
    await delay(150); // Simulate network delay
    const { department } = params;
    const employees = mockEmployees.filter(
      emp => emp.department === decodeURIComponent(department as string)
    );
    return HttpResponse.json(employees);
  }),
];
