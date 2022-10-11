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
  const { id } = useParams();
  const [type, setType] = useState('per-day');
  const [probation, setProbation] = useState(false);
  const [departments, setDepartments] = useState<any>();
  const [designation, setDesignation] = useState<any>();
  const [leaves, setLeaves] = useState<any>();
  const [btnLoader, setBtnLoader] = useState(false);
  const { register, handleSubmit, errors, control, reset, watch, setError } = useForm();

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

  useEffect(() => {
    if (
      formData?.companyInformation !== undefined &&
      Object.keys(formData?.companyInformation)?.length
    ) {
      const temp = { ...formData?.companyInformation };
      reset({
        joiningDate: new Date(formData?.companyInformation?.joiningDate),
        department: formData?.companyInformation?.department,
        designation: formData?.companyInformation?.designation,
        annualLeaves: formData?.companyInformation?.annualLeaves,
        medicalLeaves: formData?.companyInformation?.medicalLeaves,
        casualLeaves: formData?.companyInformation?.casualLeaves,
        probationDurationDays: formData?.companyInformation?.probationDurationDays,
        employmentType: formData?.companyInformation?.employmentType,
        probation: formData?.companyInformation?.probation,
        note: formData?.companyInformation?.note,
        workingHours: formData?.companyInformation?.workingHours,
        checkIn: formData?.companyInformation?.loginTime,
        checkOut: formData?.companyInformation?.logoutTime,
        startDate: formData?.companyInformation
          ? new Date(formData?.companyInformation?.startDate)
          : '',
        endDate: formData?.companyInformation
          ? new Date(formData?.companyInformation?.endDate)
          : '',
        probationEndDate: temp?.probationEndDate ? new Date(temp?.probationEndDate) : '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  useEffect(() => {
    id && getSingleEmployeeData();
  }, []);

  const getSingleEmployeeData = async () => {
    const res = await EmployeeService.getEmployee(id);
    reset({
      joiningDate: new Date(res?.data?.companyInformation?.joiningDate),
      department: res?.data?.companyInformation?.department.toString(),
      designation: res?.data?.companyInformation?.designation,
      annualLeaves: res?.data?.companyInformation?.annualLeaves,
      medicalLeaves: res?.data?.companyInformation?.medicalLeaves,
      casualLeaves: res?.data?.companyInformation?.casualLeaves,
      probationDurationDays: res?.data?.companyInformation?.probationDurationDays,
      employmentType: res?.data?.companyInformation?.employmentType,
      probation: res?.data?.companyInformation?.probation,
      note: res?.data?.companyInformation?.note,
      workingTime: res?.data?.companyInformation?.workingTime,
      loginTime: res?.data?.companyInformation?.loginTime,
      logoutTime: res?.data?.companyInformation?.logoutTime,
      startDate: res?.data?.companyInformation
        ? new Date(res?.data?.companyInformation?.startDate)
        : '',
      endDate: res?.data?.companyInformation
        ? new Date(res?.data?.companyInformation?.endDate)
        : '',
      probationEndDate: res?.data?.companyInformation?.probationEndDate
        ? new Date(res?.data?.companyInformation?.probationEndDate)
        : '',
    });
  };

  const onSubmit = async (data: Data) => {
    setBtnLoader(true);
    try {
      setFormData({ ...formData, companyInformation: { ...data } });
      removeKeys(data, ['startDate', 'endDate']);
      const { joiningDate, checkIn, probation, workingTime, checkOut, workingHours } = data;
      if (id) {
        // const userData = {
        //   type: 3,
        //   companyInformation: {
        //     ...data,
        //     joiningDate: moment(joiningDate).format('YYYY-MM-DD'),
        //     employeeInfo: {
        //       checkIn: checkIn && moment(checkIn, 'HH:mm').format('hh:mm a'),
        //       checkOut: checkOut && moment(checkOut, 'HH:mm').format('hh:mm a'),
        //       workingHours: workingHours,
        //     },

        //     probation: probation === 'true' ? true : false,
        //   },
        //   employeeId: employeeId.toUpperCase(),
        // };
        const userData = {
          ...data,
          joiningDate: moment(joiningDate).format('YYYY-MM-DD'),
          employeeInfo: {
            checkIn: checkIn && moment(checkIn, 'HH:mm').format('hh:mm a'),
            checkOut: checkOut && moment(checkOut, 'HH:mm').format('hh:mm a'),
            workingHours: workingHours,
          },
          probation: probation === 'true' ? true : false,
        };
        // const res = await EmployeeService.addPostCompany(userData, employeeDocId);
        const res = await EmployeeService.addPostCompany(userData, '634505209601f4773bdcf3e8');
        if (res.status === 200) {
          handleNext('Education');
        }
      } else {
        const user = {
          ...data,
          joiningDate: moment(joiningDate).format('YYYY-MM-DD'),
          departmentId: data?.department,
          designationId: data?.designation,
          leaves: leaves.map((leave: Leave) => {
            return { leaveId: leave?._id, quantity: data[leave?.name] };
          }),
          employmentInfo: {
            checkIn: checkIn && moment(checkIn, 'HH:mm').format('hh:mm a'),
            checkOut: checkOut && moment(checkOut, 'HH:mm').format('hh:mm a'),
            workingHours: workingHours,
            workingHoursType: type,
          },

          employeeId: '634505209601f4773bdcf3e8',

          probation: probation === 'true' ? true : false,
        };
        removeKeys(user, ['department', 'designation']);

        console.log('users', user);

        // const res = await EmployeeService.addEmployee({
        //   type: 3,
        //   companyInformation: { ...user },
        //   employeeId: employeeId,
        // });
        // const res = await EmployeeService.addPostCompany(user, employeeDocId);
        const res = await EmployeeService.addCompany(user);
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
