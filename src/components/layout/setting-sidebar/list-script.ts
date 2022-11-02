import employeeDetailsImg from 'assets/white/profile.svg';
import payRollImg from 'assets/white/payroll.svg';
import taxImg from 'assets/white/tax.svg';
import clientInfoImg from 'assets/white/expense.svg';
import projectDetailImg from 'assets/white/projects.svg';
import salesOrderManagementImg from 'assets/white/sales.svg';
import calenderImg from 'assets/white/calender.svg';
import attendanceImg from 'assets/white/attendance.svg';
import advanceSalaryLoanImg from 'assets/white/policies.svg';
import applicationImg from 'assets/white/application.svg';
import roaster from 'assets/white/roaster.svg';

// Green Img
import gEmployeeDetailsImg from 'assets/green/profile.svg';
import gPayRollImg from 'assets/green/payroll.svg';
import gTaxImg from 'assets/green/tax.svg';
import gClientInfoImg from 'assets/green/expense.svg';
import gProjectDetailImg from 'assets/green/projects.svg';
import gSalesOrderManagementImg from 'assets/green/sales.svg';
import gCalenderImg from 'assets/green/calender.svg';
import gAttendanceImg from 'assets/green/attendance.svg';
import gAdvanceSalaryLoanImg from 'assets/green/policies.svg';
import gapplicationImg from 'assets/green/application.svg';
import gRoaster from 'assets/green/roaster.svg';

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
