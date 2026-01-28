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
