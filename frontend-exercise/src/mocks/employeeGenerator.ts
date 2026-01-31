import { Employee } from '../types';

const firstNames = [
  'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
  'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
  'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Lisa', 'Daniel', 'Nancy',
  'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley',
  'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle',
  'Kenneth', 'Dorothy', 'Kevin', 'Carol', 'Brian', 'Amanda', 'George', 'Melissa',
  'Timothy', 'Deborah', 'Ronald', 'Stephanie', 'Edward', 'Rebecca', 'Jason', 'Sharon',
  'Jeffrey', 'Laura', 'Ryan', 'Cynthia', 'Jacob', 'Kathleen', 'Gary', 'Amy',
  'Nicholas', 'Angela', 'Eric', 'Shirley', 'Jonathan', 'Anna', 'Stephen', 'Brenda',
  'Larry', 'Pamela', 'Justin', 'Emma', 'Scott', 'Nicole', 'Brandon', 'Helen',
  'Benjamin', 'Samantha', 'Samuel', 'Katherine', 'Raymond', 'Christine', 'Gregory', 'Debra',
  'Frank', 'Rachel', 'Alexander', 'Carolyn', 'Patrick', 'Janet', 'Jack', 'Catherine',
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas',
  'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White',
  'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young',
  'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
  'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell',
  'Carter', 'Roberts', 'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker',
  'Cruz', 'Edwards', 'Collins', 'Reyes', 'Stewart', 'Morris', 'Morales', 'Murphy',
  'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper', 'Peterson', 'Bailey',
  'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson',
  'Watson', 'Brooks', 'Chavez', 'Wood', 'James', 'Bennett', 'Gray', 'Mendoza',
  'Ruiz', 'Hughes', 'Price', 'Alvarez', 'Castillo', 'Sanders', 'Patel', 'Myers',
];

interface DepartmentConfig {
  name: string;
  headcount: number; // realistic headcount for a ~150 person company
  titles: { title: string; salaryMin: number; salaryMax: number }[];
}

const departments: DepartmentConfig[] = [
  {
    name: 'Engineering',
    headcount: 47, // largest department
    titles: [
      { title: 'Principal Engineer', salaryMin: 180000, salaryMax: 220000 },
      { title: 'Staff Engineer', salaryMin: 150000, salaryMax: 180000 },
      { title: 'Senior Engineer', salaryMin: 130000, salaryMax: 150000 },
      { title: 'Software Engineer', salaryMin: 100000, salaryMax: 130000 },
      { title: 'Junior Engineer', salaryMin: 75000, salaryMax: 100000 },
    ],
  },
  {
    name: 'Product',
    headcount: 12,
    titles: [
      { title: 'VP of Product', salaryMin: 200000, salaryMax: 250000 },
      { title: 'Director of Product', salaryMin: 160000, salaryMax: 200000 },
      { title: 'Senior Product Manager', salaryMin: 140000, salaryMax: 160000 },
      { title: 'Product Manager', salaryMin: 110000, salaryMax: 140000 },
      { title: 'Associate Product Manager', salaryMin: 80000, salaryMax: 110000 },
    ],
  },
  {
    name: 'Design',
    headcount: 9,
    titles: [
      { title: 'Head of Design', salaryMin: 180000, salaryMax: 220000 },
      { title: 'Design Lead', salaryMin: 140000, salaryMax: 180000 },
      { title: 'Senior Designer', salaryMin: 110000, salaryMax: 140000 },
      { title: 'Product Designer', salaryMin: 85000, salaryMax: 110000 },
      { title: 'Junior Designer', salaryMin: 65000, salaryMax: 85000 },
    ],
  },
  {
    name: 'Sales',
    headcount: 23,
    titles: [
      { title: 'VP of Sales', salaryMin: 180000, salaryMax: 240000 },
      { title: 'Sales Director', salaryMin: 140000, salaryMax: 180000 },
      { title: 'Sales Manager', salaryMin: 100000, salaryMax: 140000 },
      { title: 'Senior Account Executive', salaryMin: 80000, salaryMax: 100000 },
      { title: 'Account Executive', salaryMin: 60000, salaryMax: 80000 },
      { title: 'Sales Development Rep', salaryMin: 50000, salaryMax: 60000 },
    ],
  },
  {
    name: 'Marketing',
    headcount: 11,
    titles: [
      { title: 'VP of Marketing', salaryMin: 180000, salaryMax: 230000 },
      { title: 'Marketing Director', salaryMin: 140000, salaryMax: 180000 },
      { title: 'Senior Marketing Manager', salaryMin: 110000, salaryMax: 140000 },
      { title: 'Marketing Manager', salaryMin: 85000, salaryMax: 110000 },
      { title: 'Marketing Specialist', salaryMin: 60000, salaryMax: 85000 },
      { title: 'Marketing Coordinator', salaryMin: 45000, salaryMax: 60000 },
    ],
  },
  {
    name: 'Finance',
    headcount: 7,
    titles: [
      { title: 'CFO', salaryMin: 250000, salaryMax: 350000 },
      { title: 'Finance Director', salaryMin: 160000, salaryMax: 200000 },
      { title: 'Senior Financial Analyst', salaryMin: 110000, salaryMax: 140000 },
      { title: 'Financial Analyst', salaryMin: 80000, salaryMax: 110000 },
      { title: 'Accountant', salaryMin: 60000, salaryMax: 80000 },
    ],
  },
  {
    name: 'HR',
    headcount: 6,
    titles: [
      { title: 'VP of People', salaryMin: 180000, salaryMax: 230000 },
      { title: 'HR Director', salaryMin: 130000, salaryMax: 160000 },
      { title: 'HR Manager', salaryMin: 90000, salaryMax: 120000 },
      { title: 'HR Business Partner', salaryMin: 75000, salaryMax: 95000 },
      { title: 'HR Coordinator', salaryMin: 50000, salaryMax: 70000 },
    ],
  },
  {
    name: 'Operations',
    headcount: 8,
    titles: [
      { title: 'COO', salaryMin: 250000, salaryMax: 350000 },
      { title: 'Operations Director', salaryMin: 140000, salaryMax: 180000 },
      { title: 'Operations Manager', salaryMin: 90000, salaryMax: 120000 },
      { title: 'Operations Analyst', salaryMin: 65000, salaryMax: 90000 },
      { title: 'Operations Coordinator', salaryMin: 45000, salaryMax: 65000 },
    ],
  },
  {
    name: 'Customer Success',
    headcount: 18,
    titles: [
      { title: 'VP of Customer Success', salaryMin: 180000, salaryMax: 230000 },
      { title: 'CS Director', salaryMin: 130000, salaryMax: 160000 },
      { title: 'Senior CS Manager', salaryMin: 100000, salaryMax: 130000 },
      { title: 'Customer Success Manager', salaryMin: 70000, salaryMax: 100000 },
      { title: 'Customer Success Associate', salaryMin: 50000, salaryMax: 70000 },
    ],
  },
  {
    name: 'Legal',
    headcount: 4, // smallest department
    titles: [
      { title: 'General Counsel', salaryMin: 250000, salaryMax: 350000 },
      { title: 'Senior Legal Counsel', salaryMin: 180000, salaryMax: 230000 },
      { title: 'Legal Counsel', salaryMin: 140000, salaryMax: 180000 },
      { title: 'Paralegal', salaryMin: 60000, salaryMax: 85000 },
    ],
  },
];

// Seeded random number generator for consistent data
function seededRandom(seed: number): () => number {
  return function() {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
}

function generateRandomDate(random: () => number, startYear: number, endYear: number): string {
  const year = startYear + Math.floor(random() * (endYear - startYear + 1));
  const month = Math.floor(random() * 12) + 1;
  const day = Math.floor(random() * 28) + 1;
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function generateSalary(random: () => number, min: number, max: number): number {
  const base = min + random() * (max - min);
  return Math.round(base / 1000) * 1000;
}

// Total: 145 employees (47+12+9+23+11+7+6+8+18+4)
export function generateEmployees(seed: number = 42): Employee[] {
  const random = seededRandom(seed);
  const employees: Employee[] = [];
  const usedEmails = new Set<string>();

  let employeeId = 1;

  departments.forEach((dept) => {
    const deptCount = dept.headcount;

    for (let i = 0; i < deptCount; i++) {
      const firstName = firstNames[Math.floor(random() * firstNames.length)];
      const lastName = lastNames[Math.floor(random() * lastNames.length)];
      const name = `${firstName} ${lastName}`;

      // Generate unique email
      let email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`;
      let emailSuffix = 1;
      while (usedEmails.has(email)) {
        email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${emailSuffix}@company.com`;
        emailSuffix++;
      }
      usedEmails.add(email);

      // Select title based on position in department (senior roles first)
      const titleIndex = Math.min(
        Math.floor((i / deptCount) * dept.titles.length),
        dept.titles.length - 1
      );
      const titleConfig = dept.titles[titleIndex];

      employees.push({
        id: String(employeeId++),
        name,
        email,
        department: dept.name,
        hireDate: generateRandomDate(random, 2020, 2024),
        salary: generateSalary(random, titleConfig.salaryMin, titleConfig.salaryMax),
        title: titleConfig.title,
      });
    }
  });

  return employees;
}
