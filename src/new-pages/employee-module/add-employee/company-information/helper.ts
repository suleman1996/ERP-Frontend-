import { useEffect, useState } from 'react';
import * as yup from 'yup';
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
  console.log('eid', employeeId);
  console.log('doc', employeeDocId);
  const { id } = useParams();
  const [type, setType] = useState('per-day');
  const [probation, setProbation] = useState(false);
  const [departments, setDepartments] = useState<any>();
  const [designation, setDesignation] = useState<any>();
  const [check, setCheck] = useState<number[]>([]);
  const [leaves, setLeaves] = useState<any>();
  const [btnLoader, setBtnLoader] = useState(false);
  const { register, handleSubmit, errors, control, reset, watch, setError } = useForm();

  useEffect(() => {
    console.log('formdata', formData);
    (id || employeeDocId) && getSingleEmployeeData();
  }, []);

  useEffect(() => {
    reset({
      ...formData?.companyInformation,
    });
  }, []);

  const getSingleEmployeeData = async () => {
    const res = await EmployeeService.getCompanyEmployee(id || employeeDocId);
    /////////  will be used is future////////////
    // console.log('doc id', employeeDocId);
    // console.log('res data', res.data.company);
    // reset({
    //   ...res?.data?.company,
    //   joiningDate: moment(res?.data?.company?.joiningDate).format('YYYY-DD-MM'),
    // });
    // setCheck(res?.data?.company?.workingDaysInWeek);
  };

  const onSubmit = async (data: Data) => {
    setBtnLoader(true);
    try {
      setFormData({ ...formData, companyInformation: { ...data } });
      removeKeys(data, ['startDate', 'endDate']);
      const { joiningDate, checkIn, probation, workingTime, checkOut, workingHours } = data;
      let user: any = {
        ...data,
        joiningDate: moment(joiningDate).format('YYYY-MM-DD'),
        departmentId: data?.departmentId,
        designationId: data?.designationId,
        leaves: leaves.map((leave: Leave) => {
          return { leaveId: leave?._id, quantity: data[leave?.name] };
        }),
        employmentInfo: {
          checkIn: checkIn && moment(checkIn, 'HH:mm').format('hh:mm a'),
          checkOut: checkOut && moment(checkOut, 'HH:mm').format('hh:mm a'),
          workingHours: parseInt(workingHours),
          workingHoursType: type,
        },

        employeeId: '634505209601f4773bdcf3e8',
        workingDaysInWeek: check,

        probation: probation === 'true' ? true : false,
      };
      removeKeys(user, ['department', 'designation', ...leaves.map((leave: Leave) => leave.name)]);
      if (id) {
        const res = await EmployeeService.addPostCompany(user, employeeDocId);
        if (res.status === 200) {
          handleNext('Education');
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
    } catch (err) {
      console.log(err);
    }
    setBtnLoader(false);
  };

  const getAllDepartments = async () => {
    const res = await EmployeeService.getDepartments();
    setDepartments(res?.data?.department);
  };

  const getAllDesignations = async () => {
    const res = await EmployeeService.getDesignation();
    setDesignation(res?.data?.Designation);
  };

  const getAllLeaves = async () => {
    const res = await EmployeeService.getLeaves();
    setLeaves(res?.data?.Leave);
  };

  useEffect(() => {
    getAllDepartments();
    getAllDesignations();
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
