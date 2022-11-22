import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import EmployeeService from 'services/employee-service';
import { setErrors } from 'helper';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAllowence } from 'store/actions';

interface Data {
  basicSalary: string;
  houseRent: string;
  conveyanceAllowance: string;
  medicalAllowance: string;
  specialAllowance: string;
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  overtimeApplicable: string;
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [btnLoader, setBtnLoader] = useState(false);

  const { register, handleSubmit, errors, control, reset, setError } = useForm();

  const allowence = useSelector((state) => state.app?.allowence);

  const onSubmit = async (data: any) => {
    const {
      houseRent,
      bankName,
      accountNumber,
      accountHolderName,
      payrollDetails: { basicSalary, payType, payRollType, overtimeApplicable, roaster },
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
          payType: payType,
          payRollType: payRollType,
          overtimeApplicable: overtimeApplicable,
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
        if (res?.response?.data?.error && res?.response?.status === 422) {
          setErrors(res.response.data.error, setError);
        }
        if (res.status === 200) {
          navigate('/employee');
        }
      } else {
        const res = await EmployeeService.addPostPayroll({ ...userData }, employeeDocId);
        if (res?.response?.data?.error && res?.response?.status === 422) {
          setErrors(res.response.data.error, setError);
        }
        if (res.status === 200) {
          navigate('/employee');
        }
      }
    } catch (err: any) {
      setErrors(err?.response?.data?.error, setError);
      console.error(err);
    }
    setBtnLoader(false);
  };

  const getUser = async () => {
    const res = await EmployeeService.getPayrollEmployee(id ? id : employeeDocId);
    reset({
      ...res?.data?.Payroll,
      ...allowence?.reduce((acc: { [key: string]: any }, data: any) => {
        const allowanceData = res?.data?.Payroll?.allownce?.find(
          (e: any) => e.allowanceId === data._id,
        );
        return { ...acc, [data.name]: allowanceData?.amount };
      }, {}),
      payrollDetails: {
        basicSalary: res?.data?.Payroll?.basicSalary,
        payType: res?.data?.Payroll?.payType,
        payRollType: res?.data?.Payroll?.payRollType,
        overtimeApplicable: res?.data?.Payroll?.overtimeApplicable,
        roaster: res?.data?.Payroll?.roaster,
      },
    });
  };

  useEffect(() => {
    id && getUser();
  }, [allowence, id]);

  useEffect(() => {
    dispatch(getAllAllowence());
  }, []);

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    control,
    allowence,
    btnLoader,
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
