# Frontend Exercise: Department Dashboard

A React dashboard showing department metrics. This is a feature-building exercise, not a bug-fixing exercise.

## Setup

```bash
cd frontend-exercise
pnpm install
pnpm run dev
```

Open http://localhost:5173

## Project Structure

```
src/
├── routes/
│   ├── __root.tsx           # Root layout
│   ├── index.tsx            # Dashboard page (/)
│   └── employees.tsx        # Employees table (/employees)
├── components/
│   └── DepartmentCard.tsx   # Individual department card
├── hooks/
│   ├── useDepartmentMetrics.ts  # Fetch department metrics
│   └── useEmployees.ts          # Fetch all employees
├── store/
│   └── dashboardStore.ts    # Zustand store for UI state
├── api/
│   └── departments.ts       # API functions
├── mocks/
│   └── handlers.ts          # MSW mock API handlers
├── types/
│   └── index.ts             # TypeScript interfaces
└── main.tsx                 # App entry point
```

## The App

A static dashboard showing department metrics:
- Department name
- Employee count
- Average salary
- Average tenure

## Available API Endpoints

```
GET /api/departments/metrics           → DepartmentMetrics[]
GET /api/departments/:name/employees   → Employee[]
```

## Commands

```bash
# Development server
pnpm run dev

# Run tests
pnpm test

# Build
pnpm run build
```
