import employeeDetailsImg from 'new-assets/white/profile.svg';
import payRollImg from 'new-assets/white/payroll.svg';
import taxImg from 'new-assets/white/tax.svg';
import clientInfoImg from 'new-assets/white/expense.svg';
import projectDetailImg from 'new-assets/white/projects.svg';
import salesOrderManagementImg from 'new-assets/white/sales.svg';
import calenderImg from 'new-assets/white/calender.svg';
import attendanceImg from 'new-assets/white/attendance.svg';
import advanceSalaryLoanImg from 'new-assets/white/policies.svg';
import applicationImg from 'new-assets/white/application.svg';
import roaster from 'new-assets/white/roaster.svg';

// Green Img
import gEmployeeDetailsImg from 'new-assets/green/profile.svg';
import gPayRollImg from 'new-assets/green/payroll.svg';
import gTaxImg from 'new-assets/green/tax.svg';
import gClientInfoImg from 'new-assets/green/expense.svg';
import gProjectDetailImg from 'new-assets/green/projects.svg';
import gSalesOrderManagementImg from 'new-assets/green/sales.svg';
import gCalenderImg from 'new-assets/green/calender.svg';
import gAttendanceImg from 'new-assets/green/attendance.svg';
import gAdvanceSalaryLoanImg from 'new-assets/green/policies.svg';
import gapplicationImg from 'new-assets/green/application.svg';
import gRoaster from 'new-assets/green/roaster.svg';

// form Hr and Admin Role
const roles: { all: string[]; adminHr: string[]; admin: string[] } = {
  all: ['Admin', 'Human Resource', 'Employee'],
  adminHr: ['Admin', 'Human Resource'],
  admin: ['Admin'],
};

export const adminListArr = [
  {
    path: '/profile-setting',
    active: 'Settings',
    title: 'Profile Setting',
    img1: employeeDetailsImg,
    img2: gEmployeeDetailsImg,
    role: [...roles.all],
  },
  {
    path: '/employee',
    active: 'employee',
    title: 'Payroll Setting',
    img1: payRollImg,
    img2: gPayRollImg,
    role: [...roles.all],
  },
  {
    path: '/payroll',
    active: 'payroll',
    title: 'Tax Setting',
    img1: taxImg,
    img2: gTaxImg,
    role: [...roles.adminHr],
  },
  {
    path: '/tax',
    active: 'tax',
    title: 'Projects Setting',
    img1: projectDetailImg,
    img2: gProjectDetailImg,
    role: [...roles.all],
  },
  {
    path: '/clients-info',
    active: 'clients-info',
    title: 'Expense Setting ',
    img1: clientInfoImg,
    img2: gClientInfoImg,
    role: [...roles.adminHr],
  },
  {
    path: '/project-details',
    active: 'project-details',
    title: 'Sales Setting',
    img1: salesOrderManagementImg,
    img2: gSalesOrderManagementImg,
    role: [...roles.adminHr],
  },
  {
    path: '/expense-management',
    active: 'expense-management',
    title: 'Calender ',
    img1: calenderImg,
    img2: gCalenderImg,
    role: [...roles.admin],
  },
  {
    path: '/sales-management',
    active: 'sales-management',
    title: 'Attendance',
    img1: attendanceImg,
    img2: gAttendanceImg,
    role: [...roles.adminHr],
  },
  {
    path: '/calender',
    active: 'calender',
    title: 'Application',
    img1: applicationImg,
    img2: gapplicationImg,
    role: [...roles.adminHr],
  },
  {
    path: '/attendance',
    active: 'attendance',
    title: 'Policies Setting',
    img1: advanceSalaryLoanImg,
    img2: gAdvanceSalaryLoanImg,
    role: [...roles.all],
  },
  {
    path: '/applications',
    active: 'applications',
    title: 'Roster Setting',
    img1: roaster,
    img2: gRoaster,
    role: [...roles.all],
  },
];

// for Employee Role
export const employeeListArr = [
  {
    path: '/profile-setting',
    active: 'Settings',
    title: 'Profile Setting',
    img1: employeeDetailsImg,
    img2: gEmployeeDetailsImg,
    role: [...roles.all],
  },
  {
    path: '/employee',
    active: 'employee',
    title: 'Payroll Setting',
    img1: payRollImg,
    img2: gPayRollImg,
    role: [...roles.all],
  },
  {
    path: '/payroll',
    active: 'payroll',
    title: 'Tax Setting',
    img1: taxImg,
    img2: gTaxImg,
    role: [...roles.adminHr],
  },
  {
    path: '/tax',
    active: 'tax',
    title: 'Projects Setting',
    img1: projectDetailImg,
    img2: gProjectDetailImg,
    role: [...roles.all],
  },
  {
    path: '/clients-info',
    active: 'clients-info',
    title: 'Expense Setting ',
    img1: clientInfoImg,
    img2: gClientInfoImg,
    role: [...roles.adminHr],
  },
  {
    path: '/project-details',
    active: 'project-details',
    title: 'Sales Setting',
    img1: salesOrderManagementImg,
    img2: gSalesOrderManagementImg,
    role: [...roles.adminHr],
  },
  {
    path: '/expense-management',
    active: 'expense-management',
    title: 'Calender ',
    img1: calenderImg,
    img2: gCalenderImg,
    role: [...roles.admin],
  },
  {
    path: '/sales-management',
    active: 'sales-management',
    title: 'Attendance',
    img1: attendanceImg,
    img2: gAttendanceImg,
    role: [...roles.adminHr],
  },
  {
    path: '/calender',
    active: 'calender',
    title: 'Application',
    img1: applicationImg,
    img2: gapplicationImg,
    role: [...roles.adminHr],
  },
  {
    path: '/attendance',
    active: 'attendance',
    title: 'Policies Setting',
    img1: advanceSalaryLoanImg,
    img2: gAdvanceSalaryLoanImg,
    role: [...roles.all],
  },
  {
    path: '/applications',
    active: 'applications',
    title: 'Roster Setting',
    img1: roaster,
    img2: gRoaster,
    role: [...roles.all],
  },
];
