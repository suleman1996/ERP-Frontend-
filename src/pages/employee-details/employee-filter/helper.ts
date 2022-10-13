import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import EmployeeService from 'services/employee-service';
import { EmployeeFilterData } from '../employee-cards-helper';
import { Employee } from 'interfaces/employee';

export interface Props {
  setOpen?: (value: boolean) => void;
  setEmployees?: Dispatch<SetStateAction<Employee[]>>;
  open?: boolean;
  setCount?: (value: number) => void;
  getData?: () => void;
}

export const useEmployeeFilter = ({ setOpen, setEmployees, setCount, getData }: Props) => {
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const [departments, setDepartments] = useState<any>();
  const [designation, setDesignation] = useState<any>();

  const onSubmit = async (data: any) => {
    console.log('data', data);
    const res = await EmployeeService.getAllEmployees(data);
    console.log('filter', res.data?.employees);
    if (res?.status === 200) {
      setEmployees && setEmployees(res?.data.employees);
      setCount && setCount(res?.data.employees[0].count);
    }
  };

  const cancelHandler = () => {
    setOpen && setOpen(false);
    getData && getData();
    reset({});
  };

  const getAllDepartments = async () => {
    const res = await EmployeeService.getDepartments();
    setDepartments(res?.data?.department);
    console.log('department', res?.data?.department);
  };

  const getAllDesignations = async () => {
    const res = await EmployeeService.getDesignation();
    setDesignation(res?.data?.Designation);
    console.log('department', res?.data?.Designation);
  };

  useEffect(() => {
    getAllDepartments();
    getAllDesignations();
  }, []);

  return { options, register, handleSubmit, onSubmit, cancelHandler, departments, designation };
};

const options = ['Management', 'Development', 'HR', 'QA'];

const schema = yup
  .object()
  .shape({
    name: yup.string().optional(),
    // employeeId: yup.string().optional(),
    department: yup.string().optional(),
  })
  .required();
