import dashboardImg from 'new-assets/white/dashboard.svg';
import employeeDetailsImg from 'new-assets/white/profile.svg';
import payRollImg from 'new-assets/white/payroll.svg';
import taxImg from 'new-assets/white/tax.svg';
import clientInfoImg from 'new-assets/white/expense.svg';
import projectDetailImg from 'new-assets/white/projects.svg';
import expenseManagementImg from 'new-assets/white/expense.svg';
import salesOrderManagementImg from 'new-assets/white/sales.svg';
import calenderImg from 'new-assets/white/calender.svg';
import attendanceImg from 'new-assets/white/attendance.svg';
import advanceSalaryLoanImg from 'new-assets/white/policies.svg';
import settingsImg from 'new-assets/white/settings.svg';
import applicationImg from 'new-assets/white/application.svg';

// Green Img
import gDashboardImg from 'new-assets/green/dashboard.svg';
import gEmployeeDetailsImg from 'new-assets/green/profile.svg';
import gPayRollImg from 'new-assets/green/payroll.svg';
import gTaxImg from 'new-assets/green/tax.svg';
import gClientInfoImg from 'new-assets/green/expense.svg';
import gProjectDetailImg from 'new-assets/green/projects.svg';
import gExpenseManagementImg from 'new-assets/green/expense.svg';
import gSalesOrderManagementImg from 'new-assets/green/sales.svg';
import gCalenderImg from 'new-assets/green/calender.svg';
import gAttendanceImg from 'new-assets/green/attendance.svg';
import gAdvanceSalaryLoanImg from 'new-assets/green/policies.svg';
import gSettingsImg from 'new-assets/green/settings.svg';
import gapplicationImg from 'new-assets/green/application.svg';

// form Hr and Admin Role
const roles: { all: string[]; adminHr: string[]; admin: string[] } = {
  all: ['Admin', 'Human Resource', 'Employee'],
  adminHr: ['Admin', 'Human Resource'],
  admin: ['Admin'],
};

export const adminListArr = [
  {
    path: '/',
    active: 'dashboard',
    title: 'Dashboard',
    img1: dashboardImg,
    img2: gDashboardImg,
    role: [...roles.all],
  },
  {
    path: '/employee',
    active: 'employee',
    title: 'Profiles',
    img1: employeeDetailsImg,
    img2: gEmployeeDetailsImg,
    role: [...roles.all],
  },
  {
    path: '/payroll',
    active: 'payroll',
    title: 'PayRoll',
    img1: payRollImg,
    img2: gPayRollImg,
    role: [...roles.adminHr],
  },
  {
    path: '/tax',
    active: 'tax',
    title: 'Tax',
    img1: taxImg,
    img2: gTaxImg,
    role: [...roles.all],
  },
  {
    path: '/project-details',
    active: 'project-details',
    title: 'Projects',
    img1: projectDetailImg,
    img2: gProjectDetailImg,
    role: [...roles.adminHr],
  },
  {
    path: '/clients-info',
    active: 'clients-info',
    title: 'Expenses',
    img1: clientInfoImg,
    img2: gClientInfoImg,
    role: [...roles.adminHr],
  },

  {
    path: '/sales-management',
    active: 'sales-management',
    title: 'Sales',
    img1: salesOrderManagementImg,
    img2: gSalesOrderManagementImg,
    role: [...roles.adminHr],
  },
  {
    path: '/calender',
    active: 'calender',
    title: 'Calender',
    img1: calenderImg,
    img2: gCalenderImg,
    role: [...roles.adminHr],
  },
  {
    path: '/attendance',
    active: 'attendance',
    title: 'Attendance',
    img1: attendanceImg,
    img2: gAttendanceImg,
    role: [...roles.all],
  },
  {
    path: '/applications',
    active: 'applications',
    title: 'Applications',
    img1: applicationImg,
    img2: gapplicationImg,
    role: [...roles.all],
  },
  {
    path: '/policy',
    active: 'policy',
    title: 'Policies',
    img1: advanceSalaryLoanImg,
    img2: gAdvanceSalaryLoanImg,
    role: [...roles.all],
  },
  {
    path: '/settings',
    active: 'settings',
    title: 'Settings',
    img1: settingsImg,
    img2: gSettingsImg,
    role: [...roles.all],
  },
];

// for Employee Role
export const employeeListArr = [
  {
    path: '/',
    active: 'dashboard',
    title: 'Dashboard',
    img1: dashboardImg,
    img2: gDashboardImg,
  },
  {
    path: '/employee',
    active: 'employee',
    title: 'Profiles',
    img1: employeeDetailsImg,
    img2: gEmployeeDetailsImg,
  },
  {
    path: '/tax',
    active: 'tax',
    title: 'Tax',
    img1: taxImg,
    img2: gTaxImg,
  },
  {
    path: '/attendance',
    active: 'attendance',
    title: 'Attendance',
    img1: attendanceImg,
    img2: gAttendanceImg,
  },
  {
    path: '/applications',
    active: 'applications',
    title: 'Applications',
    img1: applicationImg,
    img2: gapplicationImg,
  },
  {
    path: '/settings',
    active: 'settings',
    title: 'Settings',
    img1: settingsImg,
    img2: gSettingsImg,
  },
];
