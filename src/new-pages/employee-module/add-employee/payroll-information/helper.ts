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
  employeeDocId: string;
}

export const usePayrollDetail = ({ employeeId, employeeDocId }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [allowence, setAllowence] = useState<any>();
  const [btnLoader, setBtnLoader] = useState(false);

  const { register, handleSubmit, errors, control, reset } = useForm();

  const onSubmit = async (data: any) => {
    const {
      basicSalary,
      houseRent,
      bankName,
      accountNumber,
      accountHolderName,
      paytype,
      payrolltype,
      yes,
      roaster,
    } = data;
    setBtnLoader(true);
    try {
      const userData = {
        payrollDetails: {
          basicSalary,
          houseRentAllowance: houseRent,
          bankName,
          accountHolderName,
          accountNumber: accountNumber.toString(),
          payType: paytype,
          payRollType: payrolltype,
          overtimeApplicable: yes,
          roaster,
          allownce: allowence.map((item: any) => {
            return {
              allowanceId: item?._id,
              amount: data[item.name],
            };
          }),
        },
      };

      if (id) {
        const res = await EmployeeService.addPostPayroll(userData, id);
      } else {
        const res = await EmployeeService.addPostPayroll({ ...userData }, employeeDocId);
        if (res.status === 200) {
          navigate('/employee');
        }
      }
    } catch (err) {
      console.log(err);
    }
    setBtnLoader(false);
  };

  const getUser = async () => {
    const res = await EmployeeService.getPayrollEmployee(employeeDocId);
    const { accountHolderName, accountNumber, bankName, basicSalary } = res?.data?.payrollDetail;
    reset({
      basicSalary,
      bankName,
      accountHolderName,
      accountNumber,
    });
  };

  useEffect(() => {
    id && getUser();
  }, []);

  useEffect(() => {
    getAllAllowence();
  }, []);

  const getAllAllowence = async () => {
    const res = await EmployeeService.getAllowence();
    setAllowence(res?.data?.Allownce);
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    control,
    allowence,
  };
};

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
