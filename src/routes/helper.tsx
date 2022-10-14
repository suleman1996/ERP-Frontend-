import { ReactElement } from 'react';

import Applications from 'pages/applications';
import Attendance from 'new-pages/attendance';
import Calender from 'pages/calender';
import Policy from 'new-pages/policy';
import ClientInfo from 'pages/client-info';
import DashBoard from 'pages/dashboard';
import ExpenseManagement from 'pages/expense-management';
import Payroll from 'pages/payroll';
import ProjectDetails from 'pages/project-details';
import SalesManagement from 'pages/sales-management';
import Settings from 'new-pages/settings';
import Tax from 'pages/tax';
import Login from 'pages/login';
import ForgetPassword from 'pages/forget';
import ResetPassword from 'pages/reset-password';
import MobileForgotVerification from 'pages/forget/verification';
import EmployeeProfileDetails from 'new-pages/employee-module/employee-profile';
import AddEmployee from 'new-pages/employee-module/add-employee';
import SingleEmployee from 'new-pages/employee-module/single-employee';
import ProfileSetting from 'new-pages/settings/profile-settings';

export interface RouteInterface {
  path: string;
  component: ReactElement;
  role?: string[];
}

const roles: any = {
  all: ['Admin', 'Human Resource', 'Employee'],
  adminHr: ['Admin', 'Human Resource'],
  admin: ['Admin'],
};

export const routes: RouteInterface[] = [
  {
    path: '/',
    component: <DashBoard />,
    role: [...roles.all],
  },
  {
    path: '/profile-setting',
    component: <ProfileSetting />,
    role: [...roles.all],
  },
  {
    path: '/employee',
    component: <EmployeeProfileDetails />,
    role: [...roles.adminHr],
  },
  {
    path: '/employee/add',
    component: <AddEmployee />,
    role: [...roles.adminHr],
  },
  {
    path: '/employee/edit/:id',
    component: <AddEmployee />,
    role: [...roles.adminHr],
  },
  {
    path: '/employee/:id',
    component: <SingleEmployee />,
    role: [...roles.all],
  },
  {
    path: '/payroll',
    component: <Payroll />,
    role: [...roles.adminHr],
  },
  {
    path: '/tax',
    component: <Tax />,
    role: [...roles.all],
  },
  {
    path: '/clients-info',
    component: <ClientInfo />,
    role: [...roles.adminHr],
  },
  {
    path: '/project-details',
    component: <ProjectDetails />,
    role: [...roles.adminHr],
  },
  {
    path: '/expense-management',
    component: <ExpenseManagement />,
    role: [...roles.admin],
  },
  {
    path: '/sales-management',
    component: <SalesManagement />,
    role: [...roles.adminHr],
  },
  {
    path: '/calender',
    component: <Calender />,
    role: [...roles.all],
  },
  {
    path: '/policy',
    component: <Policy />,
    role: [...roles.all],
  },
  {
    path: '/attendance',
    component: <Attendance />,
    role: [...roles.all],
  },
  {
    path: '/attendance/add',
    component: <Attendance />,
    role: [...roles.adminHr],
  },
  {
    path: '/applications',
    component: <Applications />,
    role: [...roles.all],
  },
  {
    path: '/settings',
    component: <Settings />,
    role: [...roles.all],
  },
  {
    path: '/settings/add',
    component: <Settings />,
    role: [...roles.adminHr],
  },
  {
    path: '/settings/edit/:id',
    component: <Settings />,
    role: [...roles.adminHr],
  },
];

export const publicRoute: RouteInterface[] = [
  {
    path: '/login',
    component: <Login />,
  },
  {
    path: '/reset/:token',
    component: <ResetPassword />,
  },
  {
    path: '/forgot',
    component: <ForgetPassword />,
  },
  {
    path: '/verification',
    component: <MobileForgotVerification />,
  },
];
