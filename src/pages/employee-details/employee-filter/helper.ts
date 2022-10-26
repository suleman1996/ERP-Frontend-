import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import EmployeeService from 'services/employee-service';
import { Employee } from 'interfaces/employee';

export interface Props {
  setOpen?: (value: boolean) => void;
  setEmployees?: any;
  open?: boolean;
  setCount?: (value: number) => void;
  getData?: () => void;
}

export const useEmployeeFilter = ({ setOpen, setEmployees, setCount }: Props) => {
  const { register, handleSubmit, reset, watch } = useForm({
    resolver: yupResolver(schema),
  });

  const [depName, setDepName] = useState();

  const [departments, setDepartments] = useState<any>();
  const [designation, setDesignation] = useState<any>();

  const departmentChangeHandler = async (e: any) => {
    setDepName(departments[Number(e.target?.value)]?.name);
    await getAllDesignations(departments[e.target?.value]?._id);
  };

  const onSubmit = async (data: any) => {
    const filterData = {
      ...data,
      department: depName,
    };
    const res = await EmployeeService.getAllEmployees(filterData);
    if (res?.status === 200) {
      setEmployees && setEmployees(res?.data?.employees[0]?.data);
      res?.data?.employees.length > 0 && setCount && setCount(res?.data?.employees[0]?.count);
    }
  };

  const cancelHandler = () => {
    setOpen && setOpen(false);
  };

  const getAllDepartments = async () => {
    const res = await EmployeeService.getDepartments();
    setDepartments(res?.data?.department);
  };

  const getAllDesignations = async (id: string) => {
    const res = await EmployeeService.getDesignation(id);
    setDesignation(res?.data?.Designation);
  };

  useEffect(() => {
    (async () => {
      await getAllDepartments();
    })();
  }, []);

  return {
    options,
    register,
    handleSubmit,
    onSubmit,
    cancelHandler,
    departments,
    designation,
    departmentChangeHandler,
    watch,
  };
};

const options = ['Management', 'Development', 'HR', 'QA'];

const schema = yup
  .object()
  .shape({
    name: yup.string().optional(),
    department: yup.string().optional(),
  })
  .required();
