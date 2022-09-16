import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import EmployeeService from 'services/employee-service';
import { EmployeeFilterData } from '../employee-cards-helper';
import { Employee } from 'interfaces/employee';

export interface Props {
  setOpen: (value: boolean) => void;
  setEmployees: Dispatch<SetStateAction<Employee[]>>;
  open?: boolean;
  setCount: (value: number) => void;
  getData: () => void;
}

export const useEmployeeFilter = ({ setOpen, setEmployees, setCount, getData }: Props) => {
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: EmployeeFilterData) => {
    const res = await EmployeeService.getSearchedEmployees(data);
    if (res?.status === 200) {
      setEmployees(res?.data.employees);
      setCount(res?.data.count);
    }
  };

  const cancelHandler = () => {
    setOpen(false);
    getData();
    reset({});
  };
  return { options, register, handleSubmit, onSubmit, cancelHandler };
};

const options = ['Management', 'Development', 'HR', 'QA'];

const schema = yup
  .object()
  .shape({
    name: yup.string().optional(),
    employeeId: yup.string().optional(),
    department: yup.string().optional(),
  })
  .required();
