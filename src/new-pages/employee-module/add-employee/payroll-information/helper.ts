import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import EmployeeService from 'services/employee-service';

interface Data {
  basicSalary: string;
  houseRent: string;
  conveyanceAllowance: string;
  medicalAllowance: string;
  specialAllowance: string;
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  yes: string;
  paytype: string;
  payrolltype: string;
  roaster: string;
}

interface Props {
  employeeId?: string;
}

export const usePayrollDetail = ({ employeeId }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [btnLoader, setBtnLoader] = useState(false);

  const { register, handleSubmit, errors, control, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({
    basicSalary,
    houseRent,
    conveyanceAllowance,
    medicalAllowance,
    specialAllowance,
    bankName,
    accountNumber,
    accountHolderName,
    paytype,
    payrolltype,
    yes,
    roaster,
  }: Data) => {
    setBtnLoader(true);
    const userData = {
      type: 7,
      employeeId: employeeId?.toUpperCase(),
      payrollDetail: {
        basicSalary,
        houseRentAllowance: houseRent,
        conveyanceAllowance,
        medicalAllowance,
        spacialAllowance: specialAllowance,
        bankName,
        accountHolderName,
        accountNumber: accountNumber.toString(),
        payType: paytype,
        payRollType: payrolltype,
        overtimeApplicable: yes,
        roaster,
      },
    };

    if (id) {
      const res = await EmployeeService.updateAddedEmployee(userData, id);
    } else {
      const res = await EmployeeService.addEmployee({ ...userData });
      if (res.status === 200) {
        navigate('/employee');
      }
    }
    setBtnLoader(false);
  };

  const getUser = async () => {
    const res = await EmployeeService.getEmployee(id);
    const {
      accountHolderName,
      accountNumber,
      bankName,
      basicSalary,
      conveyanceAllowance,
      houseRentAllowance,
      medicalAllowance,
      spacialAllowance,
    } = res?.data?.payrollDetail;
    reset({
      basicSalary,
      houseRent: houseRentAllowance,
      conveyanceAllowance,
      medicalAllowance,
      specialAllowance: spacialAllowance,
      bankName,
      accountHolderName,
      accountNumber,
    });
  };

  useEffect(() => {
    id && getUser();
  }, []);

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    control,
  };
};

export const schema = yup.object().shape({
  basicSalary: yup.string().required('Basic salary is a required field'),
  houseRent: yup.string().required('House rent is a required field'),
  conveyanceAllowance: yup.string().required('Convance allowance is a required field'),
  medicalAllowance: yup.string().required('Medical allowance is a required field'),
  specialAllowance: yup.string().required('Special allowance is a required field'),
  bankName: yup.string().required('Bank name is a required field'),
  accountHolderName: yup.string().required('Account holder name is a required field'),
  accountNumber: yup
    .number()
    .required()
    .typeError('Account number is a required field')
    .min(1111111111, 'Minimun 10 digits are required')
    .max(99999999999999999999, 'Maximum 20 digits are required'),
  payrolltype: yup.string().required('Payroll type is a required field'),
  paytype: yup.string().required('Paytype is a required field'),
  roaster: yup.string().required('Roster is a required field'),
  yes: yup.string().required(),
});

export const selectCountry = [
  {
    value: 'hr',
    description: 'Hr',
  },
  {
    value: 'employee',
    description: 'Employee',
  },
  {
    value: 'admin',
    description: 'Admin',
  },
];
export const roster = [
  {
    value: 'Fixed',
    description: 'Fixed',
  },
  {
    value: 'Variable',
    description: 'Variable',
  },
];

export const payType = [
  {
    value: 'Monthly',
    description: 'Monthly',
  },
  {
    value: 'Bi-Monthly',
    description: 'Bi-Monthly',
  },
  {
    value: 'Weekly',
    description: 'Weekly',
  },
  {
    value: 'Daily',
    description: 'Daily',
  },
];
export const payrollType = [
  {
    value: 'Fixed',
    description: 'Fixed',
  },
  {
    value: 'Hour Based',
    description: ' Hour Based',
  },
  {
    value: 'Attendance Based',
    description: 'Attendance Based',
  },
];

export const department = [
  {
    value: 'Front-end Developer',
    description: 'Front-end Developer',
  },
  {
    value: 'Backend-developer',
    description: 'Backend-developer',
  },
];
