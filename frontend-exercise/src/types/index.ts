export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  hireDate: string;
  salary: number;
  title: string;
}

export interface DepartmentMetrics {
  department: string;
  employeeCount: number;
  averageSalary: number;
  averageTenureDays: number;
}

export interface User {
  id: string;
  name: string;
  departments: string[];
}

export interface EmployeeFilters {
  department?: string;
  name?: string;
  title?: string;
  minSalary?: number;
  maxSalary?: number;
  hiredAfter?: string;
  hiredBefore?: string;
}
