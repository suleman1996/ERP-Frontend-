import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

import { useAppSelector } from 'store/hooks';
import EmployeeService from 'services/employee-service';

export const useSingleEmployee = () => {
  const pageSize = 20;
  const { id } = useParams();
  const navigate = useNavigate();

  const [active, setActive] = useState(0);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState<number>(0);
  const [employeeData, setEmployeeData] = useState<any>({});
  const { currentUser } = useAppSelector((state) => state?.app);
  const [attendanceData, setAttendanceData] = useState<any>({});
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [deletePopupOpen, setDeletePopupOpen] = useState<boolean>(false);
  const [calendar, setCalendar] = useState({
    start: moment().subtract(6, 'days').format(),
    end: moment().format(),
  });

  useEffect(() => {
    const getEmployeeData = async () => {
      setLoading(true);
      const res = id && (await EmployeeService.getEmployee(id));
      if (res.status === 200) {
        setEmployeeData({ ...res?.data });
      }
      setLoading(false);
    };
    getEmployeeData();
  }, [id]);

  useEffect(() => {
    const getEmployeeAttendanceData = async () => {
      const params = {
        dateRange: { ...calendar },
        employeeId: employeeData?.personalInformation?.employeeId,
        pageSize,
        page,
      };
      const res = await EmployeeService.getEmployeeAttendance(params);
      setAttendanceData(res?.data);
      setCount(res?.data?.count);
    };
    if (Object.keys(employeeData).length > 0) {
      getEmployeeAttendanceData();
    }
  }, [employeeData, calendar, page]);

  const handleDelete = useCallback(async () => {
    setDeleteLoading(true);
    const res = id && (await EmployeeService.deleteEmployee(id));
    if (res) {
      navigate('/employee');
    }
    setDeleteLoading(false);
    setDeletePopupOpen(false);
  }, [setDeleteLoading, setDeletePopupOpen, navigate, id]);

  return {
    Link,
    active,
    page,
    count,
    deletePopupOpen,
    deleteLoading,
    attendanceData,
    currentUser,
    loading,
    employeeData,
    pageSize,
    id,
    navigate,
    setCalendar,
    setActive,
    setPage,
    handleDelete,
    setDeletePopupOpen,
  };
};
