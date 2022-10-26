import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useForm } from 'react-hook-form';

import EmployeeService from 'services/employee-service';
import { removeKeys } from 'helper';
import { setErrors } from './../../../../helper/index';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDepartments, getAllSettings } from 'store/actions';
import { getAllLeaves } from './../../../../store/actions';

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

export const useCompanyInfo = ({ handleNext, formData, setFormData, employeeDocId }: Props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [type, setType] = useState('per-day');
  const [customErr, setCustomErr] = useState();

  const [probation, setProbation] = useState(false);
  const [designation, setDesignation] = useState<any>();
  const [check, setCheck] = useState<number[]>([]);
  const [btnLoader, setBtnLoader] = useState(false);
  const { register, handleSubmit, errors, control, reset, watch, setError, clearErrors } =
    useForm();

  const state = useSelector((state) => state.app);
  const { departments, leaves } = state;

  const departmentChangeHandler = async (e: any) => {
    await getAllDesignations(e.target.value);
  };

  useEffect(() => {
    id && leaves && getSingleEmployeeData();
  }, [leaves]);

  const init = async () => {
    if (!formData?.companyInformation) return;
    await getAllDepartments();
    await getAllDesignations(formData?.companyInformation.departmentId);
    formData?.companyInformation &&
      reset({
        ...formData?.companyInformation,
      });
    setCheck(formData?.companyInformation.workingDaysInWeek);
    setProbation(formData?.companyInformation?.probation);
  };
  useEffect(() => {
    init();
  }, []);

  const getSingleEmployeeData = async () => {
    const res = await EmployeeService.getCompanyEmployee(id || employeeDocId);

    if (res?.data?.company?.departmentId)
      await getAllDesignations(res?.data?.company?.departmentId);
    reset({
      ...res?.data?.company,
      joiningDate: moment(res?.data?.company?.joiningDate).toDate(),
      probation: Boolean(res?.data?.company?.probation?.employeeId),
      employmentInfo: {
        workingHours: res?.data?.company?.workingHours,
        checkIn: moment(res?.data?.company?.checkIn, 'hh:mm a').format('HH:mm'),
        checkOut: moment(res?.data?.company?.checkOut, 'hh:mm a').format('HH:mm'),
      },
      ...leaves?.reduce((acc: { [key: string]: any }, leave: any) => {
        const leaveData = res?.data?.company?.leaves?.find((e: any) => e.leaveId === leave._id);
        return { ...acc, [leave.name]: leaveData?.quantity };
      }, {}),
    });

    setCheck(res?.data?.company?.workingDaysInWeek);
    setTimeout(() => {
      setProbation(res?.data?.company?.active);
    }, 50);
  };

  const onSubmit = async (data: Data) => {
    !customErr && setCustomErr('Required field');
    setBtnLoader(true);
    try {
      setFormData({ ...formData, companyInformation: { ...data, workingDaysInWeek: check } });
      removeKeys(data, ['startDate', 'endDate']);
      const { joiningDate, checkIn, probation, checkOut } = data;
      let user: any = {
        ...data,
        joiningDate: joiningDate ? moment(joiningDate).format('YYYY-MM-DD') : undefined,
        departmentId: data?.departmentId,
        designationId: data?.designationId,
        leaves: leaves.map((leave: Leave, index: number) => {
          return { leaveId: leave?._id, quantity: data.leaves[index].quantity };
        }),
        employmentInfo: {
          checkIn:
            data?.employmentInfo?.checkIn &&
            moment(data?.employmentInfo?.checkIn, 'HH:mm').format('hh:mm a'),
          checkOut:
            data?.employmentInfo?.checkOut &&
            moment(data?.employmentInfo?.checkOut, 'HH:mm').format('hh:mm a'),
          workingHours:
            data?.employmentInfo?.workingHours &&
            data?.employmentInfo?.workingHours
              .split(':')
              .map((e: string) => String(e).padStart(2, '0'))
              .join(':'),
          workingHoursType: watch().employmentType === 'Part-Time' && type,
        },
        workingDaysInWeek: check,
        probation: probation ? Boolean(probation) : false,
        ...(probation && { probationDurationDays: data?.probationDurationDays }),
      };
      removeKeys(user, ['department', 'designation', ...leaves.map((leave: Leave) => leave.name)]);
      if (id) {
        const res = await EmployeeService.addPostCompany(user, id);
        if (res.status === 200) {
          handleNext('Education');
        }
        if (res?.response?.data?.error && res.response.status === 422) {
          setErrors(res?.response?.data?.error, setError);
        }
      } else {
        const res = await EmployeeService.addPostCompany(user, employeeDocId);
        if (res.status === 200) {
          handleNext('Education');
        }
        if (res?.response?.data?.error && res.response.status === 422) {
          setErrors(res?.response?.data?.error, setError);
        }
      }
    } catch (err: any) {
      if (err.response?.data?.error) {
        setErrors(err.response.data.error, setError);
      }
    }
    setBtnLoader(false);
  };

  const getAllDesignations = async (id: string) => {
    try {
      const res = await EmployeeService.getDesignation(id);
      setDesignation(res?.data?.Designation);
    } catch (e) {
      console.log('designation not get yet');
    }
  };

  useEffect(() => {
    dispatch(getAllDepartments());
    dispatch(getAllLeaves());
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
    clearErrors,
    customErr,
    setCustomErr,
  };
};

export const employmentType = [
  {
    value: 'Full-Time',
    description: 'Full-Time',
  },
  {
    value: 'Part-Time',
    description: 'Part-Time',
  },
];
