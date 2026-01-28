import { useQuery } from '@tanstack/react-query';
import { fetchEmployees } from '../api/departments';

export function useEmployees() {
  return useQuery({
    queryKey: ['employees'],
    queryFn: fetchEmployees,
  });
}
