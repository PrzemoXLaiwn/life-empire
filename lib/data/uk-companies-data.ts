/**
 * UK-Style Companies Data
 * 
 * Features:
 * - Multiple positions per company
 * - Grade system (1-4) with hourly rate progression
 * - Probation periods
 * - Balanced economy
 */

export interface CompanyPosition {
  id: string;
  title: string;
  level: 'ENTRY' | 'SKILLED' | 'MANAGEMENT' | 'EXECUTIVE';
  
  // Hourly rates per grade
  gradeRates: {
    grade1: number; // Base rate
    grade2: number; // +10-15%
    grade3: number; // +20-30%
    grade4: number; // +30-40%
  };
  
  // Requirements
  requiredAge: number;
  requiredEducation: string;
  requiredExperience: number; // months
  requiredSkills?: Record<string, number>;
  requiredCertifications?: string[];
  
  // Work details
  hoursPerWeek: number;
  energyPerShift: number;
  stressLevel: number;
  
  // Probation
  probationDays: number;
  probationPerformanceRequired: number;
  
  // Grade progression (automatic after each probation)
  gradeProbationDays: number; // Days between grades
  
  // Promotion
  promotionEligibilityDays: number; // Days before can apply for next position
  nextPositionId?: string;
  
  // Benefits
  benefits: string[];
  
  // Description
  description: string;
  duties: string[];
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  employees: string;
  reputation: number; // 1-5 stars
  description: string;
  positions: CompanyPosition[];
}

export const UK_COMPANIES: Company[] = [
  // ========================================
  // 1. AMAZON WAREHOUSE
  // ========================================
  {
    id: 'amazon-warehouse',
    name: 'Amazon Warehouse',
    industry: 'Logistics & Warehousing',
    location: 'Industrial District',
    employees: '500+',
    reputation: 4.2,
    description: 'Global e-commerce giant. Fast-paced environment with excellent benefits and clear career progression.',
    positions: [
      {
        id: 'amazon-warehouse-associate',
        title: 'Warehouse Associate',
        level: 'ENTRY',
        gradeRates: {
          grade1: 8.00,
          grade2: 9.00,
          grade3: 10.00,
          grade4: 11.00,
        },
        requiredAge: 18,
        requiredEducation: 'High School',
        requiredExperience: 0,
        requiredSkills: {},
        hoursPerWeek: 40,
        energyPerShift: 25,
        stressLevel: 6,
        probationDays: 15,
        probationPerformanceRequired: 70,
        gradeProbationDays: 15,
        promotionEligibilityDays: 60,
        nextPositionId: 'amazon-forklift-operator',
        benefits: [
          'Health Insurance (after 3 months)',
          '20 days paid vacation',
          'Employee discount (10%)',
          'Free training programs',
          'Overtime opportunities',
        ],
        description: 'Pick, pack, and ship customer orders in a fast-paced warehouse environment.',
        duties: [
          'Pick and pack orders accurately',
          'Load and unload delivery trucks',
          'Maintain inventory accuracy',
          'Perform quality checks',
          'Keep work area clean and safe',
        ],
      },
      {
        id: 'amazon-forklift-operator',
        title: 'Forklift Operator',
        level: 'SKILLED',
        gradeRates: {
          grade1: 11.00,
          grade2: 12.00,
          grade3: 13.00,
          grade4: 14.00,
        },
        requiredAge: 21,
        requiredEducation: 'High School',
        requiredExperience: 12, // 1 year
        requiredSkills: { driving: 40 },
        requiredCertifications: ['Forklift License'],
        hoursPerWeek: 40,
        energyPerShift: 28,
        stressLevel: 7,
        probationDays: 20,
        probationPerformanceRequired: 75,
        gradeProbationDays: 20,
        promotionEligibilityDays: 90,
        nextPositionId: 'amazon-shift-supervisor',
        benefits: [
          'All Warehouse Associate benefits',
          'Forklift certification paid',
          'Overtime premium (+50%)',
          'Safety bonus eligibility',
        ],
        description: 'Operate forklifts and heavy machinery to move pallets and containers safely.',
        duties: [
          'Operate forklift safely and efficiently',
          'Move pallets and containers',
          'Load shipping containers',
          'Perform equipment maintenance checks',
          'Train new forklift operators',
        ],
      },
      {
        id: 'amazon-shift-supervisor',
        title: 'Shift Supervisor',
        level: 'MANAGEMENT',
        gradeRates: {
          grade1: 16.00,
          grade2: 17.00,
          grade3: 18.00,
          grade4: 19.00,
        },
        requiredAge: 23,
        requiredEducation: 'High School',
        requiredExperience: 24, // 2 years
        requiredSkills: { management: 50, leadership: 45 },
        hoursPerWeek: 40,
        energyPerShift: 32,
        stressLevel: 9,
        probationDays: 30,
        probationPerformanceRequired: 80,
        gradeProbationDays: 30,
        promotionEligibilityDays: 120,
        nextPositionId: 'amazon-operations-manager',
        benefits: [
          'All previous benefits',
          'Management training program',
          'Bonus eligibility (10%)',
          'Company phone',
          'Additional vacation (25 days)',
        ],
        description: 'Supervise warehouse operations and manage a team of 20-30 associates.',
        duties: [
          'Supervise team of 20-30 workers',
          'Manage shift schedules',
          'Conduct performance reviews',
          'Ensure safety compliance',
          'Handle escalated issues',
        ],
      },
      {
        id: 'amazon-operations-manager',
        title: 'Operations Manager',
        level: 'EXECUTIVE',
        gradeRates: {
          grade1: 22.00,
          grade2: 24.00,
          grade3: 26.00,
          grade4: 28.00,
        },
        requiredAge: 25,
        requiredEducation: 'University Degree',
        requiredExperience: 48, // 4 years
        requiredSkills: { management: 70, leadership: 65, intelligence: 60 },
        hoursPerWeek: 45,
        energyPerShift: 35,
        stressLevel: 12,
        probationDays: 45,
        probationPerformanceRequired: 85,
        gradeProbationDays: 45,
        promotionEligibilityDays: 999, // No promotion (top level)
        benefits: [
          'All previous benefits',
          'Company car',
          'Bonus eligibility (20%)',
          'Stock options',
          'Executive training',
          'Relocation assistance',
        ],
        description: 'Oversee entire warehouse operations, budget management, and strategic planning.',
        duties: [
          'Oversee entire warehouse operations',
          'Manage P&L and budgets',
          'Strategic planning and forecasting',
          'Hiring and firing decisions',
          'Regional coordination',
        ],
      },
    ],
  },

  // ========================================
  // 2. MCDONALD'S RESTAURANT
  // ========================================
  {
    id: 'mcdonalds',
    name: "McDonald's Restaurant",
    industry: 'Fast Food & Service',
    location: 'Downtown',
    employees: '50+',
    reputation: 3.8,
    description: 'World-famous fast food chain. Flexible hours, great for students and first-time workers.',
    positions: [
      {
        id: 'mcdonalds-crew-member',
        title: 'Crew Member',
        level: 'ENTRY',
        gradeRates: {
          grade1: 7.00,
          grade2: 8.00,
          grade3: 9.00,
          grade4: 10.00,
        },
        requiredAge: 16,
        requiredEducation: 'None',
        requiredExperience: 0,
        requiredSkills: {},
        hoursPerWeek: 40,
        energyPerShift: 22,
        stressLevel: 7,
        probationDays: 10,
        probationPerformanceRequired: 65,
        gradeProbationDays: 10,
        promotionEligibilityDays: 45,
        nextPositionId: 'mcdonalds-crew-trainer',
        benefits: [
          'Free meals on shift',
          'Flexible scheduling',
          '10 days paid vacation',
          'Employee discount (50%)',
          'Uniform provided',
        ],
        description: 'Serve customers, prepare food, and maintain restaurant cleanliness.',
        duties: [
          'Take customer orders',
          'Prepare food items',
          'Operate cash register',
          'Clean dining area and kitchen',
          'Provide excellent customer service',
        ],
      },
      {
        id: 'mcdonalds-crew-trainer',
        title: 'Crew Trainer',
        level: 'SKILLED',
        gradeRates: {
          grade1: 10.00,
          grade2: 11.00,
          grade3: 12.00,
          grade4: 13.00,
        },
        requiredAge: 18,
        requiredEducation: 'High School',
        requiredExperience: 6,
        requiredSkills: { charisma: 35 },
        hoursPerWeek: 40,
        energyPerShift: 24,
        stressLevel: 8,
        probationDays: 15,
        probationPerformanceRequired: 70,
        gradeProbationDays: 15,
        promotionEligibilityDays: 60,
        nextPositionId: 'mcdonalds-shift-manager',
        benefits: [
          'All Crew Member benefits',
          'Training certification',
          'Bonus eligibility (5%)',
          'Priority scheduling',
        ],
        description: 'Train new employees and ensure quality standards are maintained.',
        duties: [
          'Train new crew members',
          'Monitor food quality',
          'Handle customer complaints',
          'Assist shift manager',
          'Conduct training sessions',
        ],
      },
      {
        id: 'mcdonalds-shift-manager',
        title: 'Shift Manager',
        level: 'MANAGEMENT',
        gradeRates: {
          grade1: 14.00,
          grade2: 15.00,
          grade3: 16.00,
          grade4: 17.00,
        },
        requiredAge: 20,
        requiredEducation: 'High School',
        requiredExperience: 12,
        requiredSkills: { management: 40, charisma: 40 },
        hoursPerWeek: 40,
        energyPerShift: 30,
        stressLevel: 10,
        probationDays: 20,
        probationPerformanceRequired: 75,
        gradeProbationDays: 20,
        promotionEligibilityDays: 90,
        nextPositionId: 'mcdonalds-assistant-manager',
        benefits: [
          'All previous benefits',
          'Management training',
          'Bonus eligibility (10%)',
          'Paid vacation (15 days)',
          'Shift differential pay',
        ],
        description: 'Manage restaurant operations during your shift and supervise crew.',
        duties: [
          'Manage shift operations',
          'Handle cash and deposits',
          'Create staff schedules',
          'Order inventory',
          'Resolve customer issues',
        ],
      },
      {
        id: 'mcdonalds-assistant-manager',
        title: 'Assistant Manager',
        level: 'MANAGEMENT',
        gradeRates: {
          grade1: 18.00,
          grade2: 19.00,
          grade3: 20.00,
          grade4: 21.00,
        },
        requiredAge: 22,
        requiredEducation: 'High School',
        requiredExperience: 24,
        requiredSkills: { management: 55, leadership: 50 },
        hoursPerWeek: 45,
        energyPerShift: 33,
        stressLevel: 11,
        probationDays: 30,
        probationPerformanceRequired: 80,
        gradeProbationDays: 30,
        promotionEligibilityDays: 120,
        nextPositionId: 'mcdonalds-general-manager',
        benefits: [
          'All previous benefits',
          'Bonus eligibility (15%)',
          'Company car allowance',
          'Health insurance premium',
          'Paid vacation (20 days)',
        ],
        description: 'Assist General Manager with all aspects of restaurant operations.',
        duties: [
          'Assist General Manager',
          'Hiring and training staff',
          'Budget management',
          'Marketing initiatives',
          'Quality control',
        ],
      },
      {
        id: 'mcdonalds-general-manager',
        title: 'General Manager',
        level: 'EXECUTIVE',
        gradeRates: {
          grade1: 24.00,
          grade2: 26.00,
          grade3: 28.00,
          grade4: 30.00,
        },
        requiredAge: 25,
        requiredEducation: 'University Degree',
        requiredExperience: 48,
        requiredSkills: { management: 70, leadership: 65, intelligence: 60 },
        hoursPerWeek: 50,
        energyPerShift: 38,
        stressLevel: 14,
        probationDays: 45,
        probationPerformanceRequired: 85,
        gradeProbationDays: 45,
        promotionEligibilityDays: 999,
        benefits: [
          'All previous benefits',
          'Bonus eligibility (25%)',
          'Company car',
          'Stock options',
          'Franchise opportunities',
          'Executive pension plan',
        ],
        description: 'Run entire restaurant operations with full P&L responsibility.',
        duties: [
          'Full restaurant management',
          'P&L responsibility',
          'Strategic planning',
          'Franchise relations',
          'Community engagement',
        ],
      },
    ],
  },

  // ========================================
  // 2. TESCO SUPERMARKET
  // ========================================
  {
    id: 'tesco',
    name: 'Tesco Supermarket',
    industry: 'Retail & Customer Service',
    location: 'Shopping District',
    employees: '200+',
    reputation: 4.0,
    description: 'Leading UK supermarket chain. Excellent benefits, employee-focused culture, strong union support.',
    positions: [
      {
        id: 'tesco-customer-assistant',
        title: 'Customer Assistant',
        level: 'ENTRY',
        gradeRates: {
          grade1: 7.50,
          grade2: 8.50,
          grade3: 9.50,
          grade4: 10.50,
        },
        requiredAge: 16,
        requiredEducation: 'None',
        requiredExperience: 0,
        requiredSkills: {},
        hoursPerWeek: 40,
        energyPerShift: 20,
        stressLevel: 5,
        probationDays: 12,
        probationPerformanceRequired: 68,
        gradeProbationDays: 12,
        promotionEligibilityDays: 50,
        nextPositionId: 'tesco-team-leader',
        benefits: [
          'Employee discount (15%)',
          'Flexible shift patterns',
          '15 days paid vacation',
          'Pension scheme',
          'Staff room facilities',
        ],
        description: 'Assist customers, stock shelves, and operate tills in a friendly retail environment.',
        duties: [
          'Stock shelves and displays',
          'Assist customers with queries',
          'Operate checkout till',
          'Maintain store cleanliness',
          'Handle returns and exchanges',
        ],
      },
      {
        id: 'tesco-team-leader',
        title: 'Team Leader',
        level: 'SKILLED',
        gradeRates: {
          grade1: 11.00,
          grade2: 12.00,
          grade3: 13.00,
          grade4: 14.00,
        },
        requiredAge: 18,
        requiredEducation: 'High School',
        requiredExperience: 12,
        requiredSkills: { leadership: 35, charisma: 35 },
        hoursPerWeek: 40,
        energyPerShift: 26,
        stressLevel: 8,
        probationDays: 18,
        probationPerformanceRequired: 72,
        gradeProbationDays: 18,
        promotionEligibilityDays: 75,
        nextPositionId: 'tesco-department-manager',
        benefits: [
          'All Customer Assistant benefits',
          'Leadership training',
          'Bonus eligibility (5%)',
          'Extra vacation (18 days)',
          'Team building budget',
        ],
        description: 'Lead a team of 5-10 staff members and ensure excellent customer service.',
        duties: [
          'Lead team of 5-10 staff',
          'Train new employees',
          'Manage stock levels',
          'Handle customer complaints',
          'Coordinate with management',
        ],
      },
      {
        id: 'tesco-department-manager',
        title: 'Department Manager',
        level: 'MANAGEMENT',
        gradeRates: {
          grade1: 15.00,
          grade2: 16.00,
          grade3: 17.00,
          grade4: 18.00,
        },
        requiredAge: 21,
        requiredEducation: 'High School',
        requiredExperience: 24,
        requiredSkills: { management: 45, leadership: 45 },
        hoursPerWeek: 42,
        energyPerShift: 30,
        stressLevel: 10,
        probationDays: 25,
        probationPerformanceRequired: 78,
        gradeProbationDays: 25,
        promotionEligibilityDays: 100,
        nextPositionId: 'tesco-store-manager',
        benefits: [
          'All previous benefits',
          'Management training',
          'Bonus eligibility (12%)',
          'Enhanced pension',
          'Department budget control',
        ],
        description: 'Manage a specific department (Grocery, Electronics, etc.) with full responsibility.',
        duties: [
          'Manage department operations',
          'Control department budget',
          'Staff scheduling and training',
          'Merchandising and displays',
          'Sales target achievement',
        ],
      },
      {
        id: 'tesco-store-manager',
        title: 'Store Manager',
        level: 'EXECUTIVE',
        gradeRates: {
          grade1: 20.00,
          grade2: 22.00,
          grade3: 24.00,
          grade4: 26.00,
        },
        requiredAge: 25,
        requiredEducation: 'University Degree',
        requiredExperience: 48,
        requiredSkills: { management: 65, leadership: 60, intelligence: 55 },
        hoursPerWeek: 48,
        energyPerShift: 36,
        stressLevel: 13,
        probationDays: 40,
        probationPerformanceRequired: 83,
        gradeProbationDays: 40,
        promotionEligibilityDays: 999,
        benefits: [
          'All previous benefits',
          'Bonus eligibility (20%)',
          'Company car',
          'Stock options',
          'Executive pension',
          'Regional networking events',
        ],
        description: 'Run entire store with full P&L responsibility and strategic oversight.',
        duties: [
          'Full store management',
          'P&L management',
          'Hiring decisions',
          'Regional meetings',
          'Community relations',
        ],
      },
    ],
  },

  // ========================================
  // 3. NHS HOSPITAL
  // ========================================
  {
    id: 'nhs-hospital',
    name: 'NHS City Hospital',
    industry: 'Healthcare & Medical',
    location: 'Medical District',
    employees: '1,000+',
    reputation: 4.5,
    description: 'National Health Service hospital. Rewarding career helping people, excellent job security and benefits.',
    positions: [
      {
        id: 'nhs-healthcare-assistant',
        title: 'Healthcare Assistant',
        level: 'ENTRY',
        gradeRates: {
          grade1: 8.50,
          grade2: 9.50,
          grade3: 10.50,
          grade4: 11.50,
        },
        requiredAge: 18,
        requiredEducation: 'High School',
        requiredExperience: 0,
        requiredSkills: { charisma: 30 },
        requiredCertifications: ['First Aid Certificate'],
        hoursPerWeek: 37.5, // NHS standard
        energyPerShift: 28,
        stressLevel: 9,
        probationDays: 20,
        probationPerformanceRequired: 72,
        gradeProbationDays: 20,
        promotionEligibilityDays: 90,
        nextPositionId: 'nhs-staff-nurse',
        benefits: [
          'NHS pension scheme (excellent)',
          '27 days paid vacation + bank holidays',
          'Free uniform and equipment',
          'Training and development',
          'Sick pay (full salary)',
          'Maternity/paternity leave',
        ],
        description: 'Support nurses and doctors in providing patient care on hospital wards.',
        duties: [
          'Assist with patient care',
          'Monitor vital signs',
          'Help with meals and hygiene',
          'Maintain patient records',
          'Support nursing staff',
        ],
      },
      {
        id: 'nhs-staff-nurse',
        title: 'Staff Nurse',
        level: 'SKILLED',
        gradeRates: {
          grade1: 13.00,
          grade2: 14.50,
          grade3: 16.00,
          grade4: 17.50,
        },
        requiredAge: 21,
        requiredEducation: 'University Degree',
        requiredExperience: 36, // 3 years
        requiredSkills: { intelligence: 50, charisma: 45 },
        requiredCertifications: ['Nursing Degree', 'NMC Registration'],
        hoursPerWeek: 37.5,
        energyPerShift: 32,
        stressLevel: 12,
        probationDays: 30,
        probationPerformanceRequired: 78,
        gradeProbationDays: 30,
        promotionEligibilityDays: 120,
        nextPositionId: 'nhs-senior-nurse',
        benefits: [
          'All Healthcare Assistant benefits',
          'Professional development budget',
          'Bonus eligibility (8%)',
          'Additional vacation (30 days)',
          'Study leave for courses',
        ],
        description: 'Provide direct patient care, administer medications, and coordinate with medical team.',
        duties: [
          'Provide direct patient care',
          'Administer medications',
          'Coordinate with doctors',
          'Supervise healthcare assistants',
          'Maintain medical records',
        ],
      },
      {
        id: 'nhs-senior-nurse',
        title: 'Senior Nurse',
        level: 'MANAGEMENT',
        gradeRates: {
          grade1: 18.00,
          grade2: 20.00,
          grade3: 22.00,
          grade4: 24.00,
        },
        requiredAge: 25,
        requiredEducation: 'University Degree',
        requiredExperience: 60, // 5 years
        requiredSkills: { intelligence: 60, leadership: 55, management: 50 },
        requiredCertifications: ['Nursing Degree', 'NMC Registration', 'Advanced Practice'],
        hoursPerWeek: 37.5,
        energyPerShift: 35,
        stressLevel: 14,
        probationDays: 40,
        probationPerformanceRequired: 82,
        gradeProbationDays: 40,
        promotionEligibilityDays: 150,
        nextPositionId: 'nhs-ward-manager',
        benefits: [
          'All previous benefits',
          'Leadership training',
          'Bonus eligibility (12%)',
          'Conference attendance',
          'Research opportunities',
        ],
        description: 'Lead nursing team, mentor junior staff, and manage complex patient cases.',
        duties: [
          'Lead nursing team',
          'Mentor junior nurses',
          'Manage complex cases',
          'Quality improvement projects',
          'Clinical audits',
        ],
      },
      {
        id: 'nhs-ward-manager',
        title: 'Ward Manager',
        level: 'EXECUTIVE',
        gradeRates: {
          grade1: 25.00,
          grade2: 27.00,
          grade3: 29.00,
          grade4: 31.00,
        },
        requiredAge: 28,
        requiredEducation: 'University Degree',
        requiredExperience: 84, // 7 years
        requiredSkills: { management: 70, leadership: 68, intelligence: 65 },
        requiredCertifications: ['Nursing Degree', 'NMC Registration', 'Management Qualification'],
        hoursPerWeek: 40,
        energyPerShift: 38,
        stressLevel: 16,
        probationDays: 50,
        probationPerformanceRequired: 85,
        gradeProbationDays: 50,
        promotionEligibilityDays: 999,
        benefits: [
          'All previous benefits',
          'Bonus eligibility (18%)',
          'Company car',
          'Executive pension',
          'Private healthcare',
          'Sabbatical eligibility',
        ],
        description: 'Manage entire hospital ward with full operational and budgetary responsibility.',
        duties: [
          'Manage entire ward operations',
          'Budget and resource management',
          'Staff recruitment and development',
          'Patient safety and quality',
          'Strategic planning',
        ],
      },
    ],
  },
];

// Helper function to calculate annual salary from hourly rate
export function calculateAnnualSalary(hourlyRate: number, hoursPerWeek: number = 40): number {
  return Math.floor(hourlyRate * hoursPerWeek * 52);
}

// Helper function to calculate daily pay
export function calculateDailyPay(hourlyRate: number, hoursPerDay: number = 8): number {
  return Math.floor(hourlyRate * hoursPerDay);
}

// Helper function to get grade multiplier
export function getGradeMultiplier(grade: number): number {
  const multipliers = {
    1: 1.00,
    2: 1.125, // +12.5%
    3: 1.25,  // +25%
    4: 1.375, // +37.5%
  };
  return multipliers[grade as keyof typeof multipliers] || 1.00;
}
