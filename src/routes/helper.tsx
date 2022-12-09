import { ReactElement } from 'react'
import Attendance from 'pages/attendance'
import Policy from 'pages/policy'
import DashBoard from 'pages/dashboard'
import Settings from 'pages/new-settings'
import Login from 'pages/login'
import ForgetPassword from 'pages/forget'
import ResetPassword from 'pages/reset-password'
import MobileForgotVerification from 'pages/forget/verification'
import EmployeeProfileDetails from 'pages/employee-module/employee-profile'
import AddEmployee from 'pages/employee-module/add-employee'
import SingleEmployee from 'pages/employee-module/single-employee'
import TaxSlab from 'pages/tax'
import Calender from 'pages/calender'
import Applications from 'pages/applications'
import Hierarchy from 'pages/hierarchy'
import VerifyEmail from 'pages/verify-email/index'

export interface RouteInterface {
  path: string
  component: ReactElement
  role?: string[]
}

const roles: any = {
  all: ['Admin', 'Human Resource', 'Employee'],
  adminHr: ['Admin', 'Human Resource'],
  admin: ['Admin'],
}

export const routes: RouteInterface[] = [
  {
    path: '/',
    component: <DashBoard />,
    role: [...roles.all],
  },

  {
    path: '/tax',
    component: <TaxSlab />,
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
  {
    path: '/hierarchy',
    component: <Hierarchy />,
    role: [...roles.all],
  },
]

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
    path: '/reset',
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
]

export const allRoute: RouteInterface[] = [
  {
    path: '/verifyEmail/:id',
    component: <VerifyEmail />,
  },
]
