import { useQuery } from '@tanstack/react-query';
import { fetchEmployees } from '../api/departments';
import type { EmployeeFilters } from '../types';

export function useEmployees(filters?: EmployeeFilters) {
  return useQuery({
    queryKey: ['employees', filters],
    queryFn: () => fetchEmployees(filters),
  });
}
