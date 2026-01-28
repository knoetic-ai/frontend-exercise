import { useQuery } from '@tanstack/react-query';
import { fetchDepartmentMetrics } from '../api/departments';

export function useDepartmentMetrics() {
  return useQuery({
    queryKey: ['department-metrics'],
    queryFn: fetchDepartmentMetrics,
  });
}
