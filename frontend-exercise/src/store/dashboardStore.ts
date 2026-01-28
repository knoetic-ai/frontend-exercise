import { create } from 'zustand';

type TableView = 'comfortable' | 'compact';
type SortDirection = 'asc' | 'desc';
type EmployeeColumn = 'name' | 'department' | 'title' | 'salary' | 'hireDate';

interface DashboardState {
  /** Table display density (working example) */
  tableView: TableView;

  /** Which columns are visible — not yet wired up */
  visibleColumns: EmployeeColumn[];

  /** Current sort column — not yet wired up */
  sortColumn: EmployeeColumn | null;

  /** Sort direction — not yet wired up */
  sortDirection: SortDirection;
}

interface DashboardActions {
  setTableView: (view: TableView) => void;
  setVisibleColumns: (columns: EmployeeColumn[]) => void;
  toggleColumn: (column: EmployeeColumn) => void;
  setSorting: (column: EmployeeColumn, direction: SortDirection) => void;
  reset: () => void;
}

type DashboardStore = DashboardState & DashboardActions;

const initialState: DashboardState = {
  tableView: 'comfortable',
  visibleColumns: ['name', 'department', 'title', 'salary', 'hireDate'],
  sortColumn: null,
  sortDirection: 'asc',
};

/**
 * Zustand store for managing UI preferences
 *
 * - tableView: Working example — toggle between comfortable/compact
 * - visibleColumns: Not yet implemented — candidate could wire this up
 * - sortColumn/sortDirection: Not yet implemented — candidate could wire this up
 *
 * Use this for client-only state (preferences, UI toggles).
 * For shareable state (filters), use URL search params instead.
 */
const useDashboardStore = create<DashboardStore>((set) => ({
  // State
  ...initialState,

  // Actions
  setTableView: (view) => set({ tableView: view }),

  setVisibleColumns: (columns) => set({ visibleColumns: columns }),

  toggleColumn: (column) =>
    set((state) => ({
      visibleColumns: state.visibleColumns.includes(column)
        ? state.visibleColumns.filter((c) => c !== column)
        : [...state.visibleColumns, column],
    })),

  setSorting: (column, direction) =>
    set({ sortColumn: column, sortDirection: direction }),

  reset: () => set(initialState),
}));

// Individual selector hooks to prevent unnecessary re-renders
export const useTableView = () => useDashboardStore((s) => s.tableView);
export const useSetTableView = () => useDashboardStore((s) => s.setTableView);

export const useVisibleColumns = () => useDashboardStore((s) => s.visibleColumns);
export const useToggleColumn = () => useDashboardStore((s) => s.toggleColumn);

export const useSortColumn = () => useDashboardStore((s) => s.sortColumn);
export const useSortDirection = () => useDashboardStore((s) => s.sortDirection);
export const useSetSorting = () => useDashboardStore((s) => s.setSorting);

export const useResetDashboard = () => useDashboardStore((s) => s.reset);

export { useDashboardStore };
export type { TableView, SortDirection, EmployeeColumn };
