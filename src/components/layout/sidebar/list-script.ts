import dashboardImg from 'assets/white/dashboard.svg';
import employeeDetailsImg from 'assets/white/profile.svg';
import payRollImg from 'assets/white/payroll.svg';
import taxImg from 'assets/white/tax.svg';
import clientInfoImg from 'assets/white/expense.svg';
import projectDetailImg from 'assets/white/projects.svg';
import expenseManagementImg from 'assets/white/expense.svg';
import salesOrderManagementImg from 'assets/white/sales.svg';
import calenderImg from 'assets/white/calender.svg';
import attendanceImg from 'assets/white/attendance.svg';
import advanceSalaryLoanImg from 'assets/white/policies.svg';
import settingsImg from 'assets/white/settings.svg';
import applicationImg from 'assets/white/application.svg';

// Green Img
import gDashboardImg from 'assets/green/dashboard.svg';
import gEmployeeDetailsImg from 'assets/green/profile.svg';
import gPayRollImg from 'assets/green/payroll.svg';
import gTaxImg from 'assets/green/tax.svg';
import gClientInfoImg from 'assets/green/expense.svg';
import gProjectDetailImg from 'assets/green/projects.svg';
import gExpenseManagementImg from 'assets/green/expense.svg';
import gSalesOrderManagementImg from 'assets/green/sales.svg';
import gCalenderImg from 'assets/green/calender.svg';
import gAttendanceImg from 'assets/green/attendance.svg';
import gAdvanceSalaryLoanImg from 'assets/green/policies.svg';
import gSettingsImg from 'assets/green/settings.svg';
import gapplicationImg from 'assets/green/application.svg';

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
  // {
  //   path: '/project-details',
  //   active: 'project-details',
  //   title: 'Projects',
  //   img1: projectDetailImg,
  //   img2: gProjectDetailImg,
  //   role: [...roles.adminHr],
  // },
  // {
  //   path: '/clients-info',
  //   active: 'clients-info',
  //   title: 'Expenses',
  //   img1: clientInfoImg,
  //   img2: gClientInfoImg,
  //   role: [...roles.adminHr],
  // },

  // {
  //   path: '/sales-management',
  //   active: 'sales-management',
  //   title: 'Sales',
  //   img1: salesOrderManagementImg,
  //   img2: gSalesOrderManagementImg,
  //   role: [...roles.adminHr],
  // },
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
