import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import EmployeeService from 'services/employee-service';
import { removeKeys } from 'helper';
import { setErrors } from './../../../../helper/index';

interface Props {
  handleBack: (data?: string) => void;
  handleNext: (data?: string) => void;
  formData: any;
  setFormData: any;
  employeeId: string;
  employeeDocId?: string | any;
}
interface Leave {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
interface Data {
  startDate: string;
  endDate: string;
  joiningDate: string;
  checkOut: string;
  checkIn: string;
  workingTime?: string;
  probation: string;
  workingHours?: any;
  department?: any;
  designation?: any;
  [key: string]: any;
}

export const useCompanyInfo = ({
  handleBack,
  handleNext,
  formData,
  setFormData,
  employeeId,
  employeeDocId,
}: Props) => {
  const { id } = useParams();
  const [type, setType] = useState('per-day');
  const [probation, setProbation] = useState(false);
  const [departments, setDepartments] = useState<any>();
  const [designation, setDesignation] = useState<any>();
  const [check, setCheck] = useState<number[]>([]);
  const [leaves, setLeaves] = useState<any>();
  const [btnLoader, setBtnLoader] = useState(false);
  const { register, handleSubmit, errors, control, reset, watch, setError } = useForm();

  const departmentChangeHandler = async (e: any) => {
    await getAllDesignations(e.target.value);
  };

  useEffect(() => {
    id && leaves && getSingleEmployeeData();
  }, [leaves]);

  useEffect(() => {
    formData?.companyInformation &&
      reset({
        ...formData?.companyInformation,
      });
  }, []);

  const getSingleEmployeeData = async () => {
    const res = await EmployeeService.getCompanyEmployee(id || employeeDocId);
    await getAllDesignations(res.data.company.departmentId);
    reset({
      ...res?.data?.company,
      joiningDate: moment(res?.data?.company?.joiningDate).toDate(),
      probation: res?.data?.company?.active,
      ...leaves?.reduce((acc: { [key: string]: any }, leave: any) => {
        const leaveData = res?.data?.company?.leaves?.find((e: any) => e.leaveId === leave._id);
        return { ...acc, [leave.name]: leaveData?.quantity };
      }, {}),
    });

    setCheck(res?.data?.company?.workingDaysInWeek);
  };

  const onSubmit = async (data: Data) => {
    setBtnLoader(true);
    try {
      setFormData({ ...formData, companyInformation: { ...data } });
      removeKeys(data, ['startDate', 'endDate']);
      const { joiningDate, checkIn, probation, checkOut, workingHours } = data;
      let user: any = {
        ...data,
        workingHours: undefined,
        joiningDate: moment(joiningDate).format('YYYY-MM-DD'),
        departmentId: data?.departmentId,
        designationId: data?.designationId,
        leaves: leaves.map((leave: Leave) => {
          return { leaveId: leave?._id, quantity: data[leave?.name] };
        }),
        employmentInfo: {
          checkIn: checkIn && moment(checkIn, 'HH:mm').format('hh:mm a'),
          checkOut: checkOut && moment(checkOut, 'HH:mm').format('hh:mm a'),
          workingHours:
            workingHours &&
            workingHours
              .split(':')
              .map((e: string) => String(e).padStart(2, '0'))
              .join(':'),
          workingHoursType: type,
        },

        employeeId: '634505209601f4773bdcf3e8',
        workingDaysInWeek: check,

        probation: probation === 'true' ? true : false,
      };
      removeKeys(user, ['department', 'designation', ...leaves.map((leave: Leave) => leave.name)]);
      if (id) {
        const res = await EmployeeService.addPostCompany(user, id);
        if (res.status === 200) {
          handleNext('Education');
        }
        console.log(res, 'resresres');
        if (res?.response?.data?.error && res.response.status === 422) {
          setErrors(res.response.data.error, setError);
        }
      } else {
        // const res = await EmployeeService.addPostCompany(user, employeeDocId);
        const res = await EmployeeService.addPostCompany(user, employeeDocId);
        if (res.status === 200) {
          handleNext('Education');
        }
        if (res?.response?.data?.error && res.response.status === 422) {
          setErrors(res.response.data.error, setError);
        }
      }
    } catch (err: any) {
      if (err.response?.data?.error) {
        setErrors(err.response.data.error, setError);
      }
      console.log(err?.response?.data?.error);
    }
    setBtnLoader(false);
  };

  const getAllDepartments = async () => {
    const res = await EmployeeService.getDepartments();
    setDepartments(res?.data?.department);
    console.log('department', res?.data?.department);
  };

  const getAllDesignations = async (id: string) => {
    const res = await EmployeeService.getDesignation(id);
    setDesignation(res?.data?.Designation);
    console.log('department', res?.data?.Designation);
  };

  const getAllLeaves = async () => {
    const res = await EmployeeService.getLeaves();
    setLeaves(res?.data?.Leave);
  };

  useEffect(() => {
    getAllDepartments();
    // getAllDesignations();
    getAllLeaves();
  }, []);

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    control,
    watch,
    btnLoader,
    setProbation,
    probation,
    type,
    setType,
    departments,
    designation,
    leaves,
    check,
    setCheck,
    departmentChangeHandler,
  };
};

export const employmentType = [
  {
    value: 'Part-Time',
    description: 'Part-Time',
  },
  {
    value: 'Full-Time',
    description: 'Full-Time',
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
  {
    value: 'management',
    description: 'Management',
  },
  {
    value: 'quality-control',
    description: 'Quality-Control',
  },
];
