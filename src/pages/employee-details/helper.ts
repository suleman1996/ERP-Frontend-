/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppSelector } from 'store/hooks';
import EmployeeService from 'services/employee-service';

export const useEmployeeListHelper = () => {
  const pageSize = 15;
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<any>([]);
  const { currentUser } = useAppSelector((state) => state?.app);

  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const getEmployeesData = async () => {
    setLoading(true);
    const res = await EmployeeService.getAllEmployees({ pageSize, page });
    if (res?.status === 200) {
      setEmployees(res.data.employees);
      setCount(res?.data?.count);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    if (currentUser?.role) {
      if (currentUser?.role !== 'Employee') {
        getEmployeesData();
      } else {
        navigate(`/employee/${currentUser?.id}`);
      }
    }
    setLoading(false);
  }, [currentUser, navigate]);

  useEffect(() => {
    getEmployeesData();
  }, [page]);

  return {
    Link,
    page,
    count,
    open,
    employees,
    loading,
    setOpen,
    setPage,
    pageSize,
    setEmployees,
    setCount,
    getEmployeesData,
  };
};
