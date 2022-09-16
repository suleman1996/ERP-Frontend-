/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useAppSelector } from 'store/hooks';
import { Employee } from 'interfaces/employee';

import { removeKey } from 'main-helper';
import AuthService from 'services/auth-service';
import SettingsService from 'services/settings-service';
import EmployeeService from 'services/employee-service';

import sortIcon from 'assets/logo1.svg';

export const useManageAccountHelper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAppSelector((state) => state.app);

  const pageSize = 10;
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [sorts, setSorts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnLoader, setBtnLoading] = useState(false);
  const [addEmployee, setAddEmployee] = useState(false);
  const [editEmployee, setEditEmployee] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [singleId, setSingleId] = useState<number | string>('');
  const [employees, setEmployees] = useState<Employee[] | []>([]);
  const [manageAccountsTable, setManageAccountsTable] = useState(false);

  const getEmployeesData = async () => {
    setLoading(true);
    const res = await SettingsService.getAllUsers({
      pageSize,
      page,
      ...(filters && { filters: JSON.stringify(filters) }),
      ...(sorts && { sorts: JSON.stringify(sorts) }),
    });
    if (res.status === 200) {
      setEmployees(res.data?.data);
      setCount(res.data?.count);
    }
    setLoading(false);
  };

  const removeEmployee = async () => {
    setBtnLoading(true);
    await SettingsService.deleteEmployee(singleId);
    setDeleteModalOpen(false);
    setBtnLoading(false);
    getEmployeesData();
  };

  const handleEdit = (id: string) => {
    navigate(`/settings/edit/${id}`);
  };

  useEffect(() => {
    if (location.pathname.includes('add')) {
      setAddEmployee(true);
      setEditEmployee(false);
      setManageAccountsTable(false);
    } else if (location.pathname.includes('edit')) {
      setEditEmployee(true);
      setAddEmployee(false);
      setManageAccountsTable(false);
    } else {
      setManageAccountsTable(true);
      setAddEmployee(false);
      setEditEmployee(false);
    }
  }, [location]);

  useEffect(() => {
    if (currentUser?.role && currentUser?.role !== 'Employee') getEmployeesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.role, page, pageSize, filters, sorts]);

  return {
    page,
    count,
    sorts,
    loading,
    filters,
    location,
    pageSize,
    singleId,
    btnLoader,
    employees,
    currentUser,
    addEmployee,
    editEmployee,
    deleteModalOpen,
    manageAccountsTable,
    setPage,
    navigate,
    setCount,
    setSorts,
    setFilters,
    setLoading,
    handleEdit,
    setSingleId,
    setEmployees,
    setBtnLoading,
    removeEmployee,
    setAddEmployee,
    setEditEmployee,
    getEmployeesData,
    setDeleteModalOpen,
    setManageAccountsTable,
  };
};

interface Props {
  getEmployeesData: () => void;
}

export const useAddEmployee = ({ getEmployeesData }: Props) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [employeeIds, setEmployeeIds] = useState<string[] | []>([]);
  const [emailReadOnly, setEmailReadOnly] = useState(true);
  const [employeesData, setEmployeesData] = useState<Employee[] | []>([]);
  const [img, setImg] = useState<string>('');

  const { register, handleSubmit, errors, setValue, watch } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  const createEmployeeIdsArr = (employees: any) => {
    const ids: string[] = [];
    employees.forEach((employee: any) => {
      ids.push(employee.employeeId);
    });
    setEmployeeIds(ids);
  };

  const handleEmployeeSelect = (employeesData: any) => {
    const value = watch('employeeId', '');
    const selectedEmployee = employeesData.find((x: any) => x.employeeId === value);
    setValue('email', selectedEmployee?.email);
    setImg(selectedEmployee?.img);
  };

  const onSubmit = async (data: ManageAccountsAddUser) => {
    handleAddUser(data);
  };

  const handleAddUser = async (data: ManageAccountsAddUser) => {
    const newData = removeKey({ ...data, img });
    setIsLoading(true);
    const res = await AuthService.addUser({ ...newData });

    if (res?.status === 200) {
      setIsLoading(false);
      getEmployeesData();
      navigate('/settings');
    }
    setIsLoading(false);
  };

  const getEmployeesLists = async () => {
    const res = await EmployeeService.getAllEmployees({ pageSize: 100 });
    if (res?.status === 200) {
      setEmployeesData(res.data.employees);
      createEmployeeIdsArr(res.data.employees);
    }
  };

  useEffect(() => {
    getEmployeesLists();
  }, []);

  useEffect(() => {
    handleEmployeeSelect(employeesData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, employeesData]);

  return {
    img,
    errors,
    isLoading,
    employeeIds,
    emailReadOnly,
    employeesData,
    setImg,
    navigate,
    register,
    onSubmit,
    handleSubmit,
    handleAddUser,
    setEmailReadOnly,
    handleEmployeeSelect,
    createEmployeeIdsArr,
  };
};

export interface ManageAccountsEditEmployee {
  id?: string | number;
  employeeId: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  account: string;
  status: string;
  role: string;
  img?: string;
}

export interface ManageAccountsAddUser {
  employeeId: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  account: string;
  status?: string;
  role?: string;
  img?: string;
}

export const adminAccountsLinks = [
  { title: 'Manage Account', link: '/settings', left: '35px' },
  { title: 'General Settings', link: '/settings', left: '40px' },
];

export const employeeAccountsLinks = [
  { title: 'General Settings', link: '/settings', left: '40px' },
];

export const columns = [
  {
    key: 'employeeId',
    name: 'Employee ID',
    icon: sortIcon,
    width: '200px',
    alignText: 'center',
  },
  { key: 'name', name: 'Name', width: '250px', alignText: 'left' },
  {
    key: 'designation',
    name: 'Designation',
    icon: sortIcon,
    width: '200px',
    alignText: 'left',
  },
  { key: 'status', name: 'Status', width: '150px', alignText: 'center' },
  { key: 'actions', name: 'Actions', width: '150px', alignText: 'center' },
];

const schema = yup
  .object()
  .shape({
    employeeId: yup.string().required('employeeId is required'),
    email: yup.string().required(),
    password: yup
      .string()
      .required('password is required')
      .min(8, 'minimum 8 characters required '),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'passwords must match'),
    account: yup.string().required('account is required'),
    // status: yup.string().required(),
  })
  .required();
