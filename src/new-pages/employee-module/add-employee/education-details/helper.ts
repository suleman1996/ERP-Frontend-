import { useState, useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import moment from 'moment';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import EmployeeService from 'services/employee-service';
import { convertBase64Image } from 'main-helper';
import { removeKeys } from 'helper';
import { setErrors } from './../../../../helper/index';

export interface Education {
  degree: string;
  institute: string;
  startDate?: string;
  endDate?: string;
  percentageCgpa: string;
  transcript: string | any;
  description: string;
  ongoing?: boolean;
  filename?: string;
  prevTranscript?: string;
  marksType?: any;
}

interface Props {
  formData: any;
  setFormData: any;
  employeeId: string;
  employeeDocId: string;
  handleBack: (data?: string) => void;
  handleNext: (data?: string) => void;
}

export const useEducationDetail = ({
  handleBack,
  handleNext,
  formData,
  setFormData,
  employeeId,
  employeeDocId,
}: Props) => {
  const { id } = useParams();
  const [btnLoader, setBtnLoader] = useState(false);
  const [marksType, setMarksType] = useState('percentage');
  const [marksVal, setMarkVal] = useState<number>();
  const [filename, setFilename] = useState<string | any>('');
  const [startDateHandle, setStartDateHandle] = useState<string | any>();
  const [educations, setEducations] = useState<Education[] | []>([]);
  const educationIndex = useRef(-1);
  const [ongiong, setOngoing] = useState(false);
  const { pathname } = useLocation();

  const [updateEdu, setUpdateEdu] = useState({
    update: false,
    editInd: -1,
  });
  const { register, handleSubmit, errors, control, reset, watch, setValue, setError } = useForm();

  const onSubmit = async () => {
    setBtnLoader(true);
    try {
      setFormData({ ...formData, educationDetails: [...educations] });
      if (id) {
        if (educations?.length) {
          const userData = {
            educationDetails: [...educations],
          };
          const res = await EmployeeService.addPostEducation(userData, id);
          if (res.status === 200) {
            handleNext && handleNext('Experience');
          }
        }
      } else {
        if (educations?.length) {
          const res = await EmployeeService.addPostEducation(
            {
              educationDetails: [...educations],
            },
            employeeDocId,
          );
          if (res.status === 200) {
            handleNext && handleNext('Experience');
          }
          // if (res?.response?.data?.error && res.response.status === 422) {
          //   setErrors(res.response.data.error, setError);
          // }
        }
      }
    } catch (err) {
      console.log(err);
    }
    setBtnLoader(false);
  };

  const handleAddEduction = async (data: Education) => {
    const newEducations: any = [...educations];
    const { startDate, endDate, transcript, prevTranscript, filename: prevFileName } = data;
    const tempObj = {
      ...data,
      endDate: moment(endDate).format('YYYY-MM-DD'),
      startDate: moment(startDate).format('YYYY-MM-DD'),
      percentageCgpa: marksVal,
      ongoing: ongiong,
      filename: transcript[0]?.name || prevFileName,
      transcript:
        transcript && (transcript[0] ? await convertBase64Image(transcript[0]) : prevTranscript),
      // percentage: marksType === 'percentage' && marksVal,
      ...(marksType === 'percentage' && { percentage: marksVal?.toString() }),
      ...(marksType === 'cgpa' && { cgpa: marksType === 'cgpa' && marksVal?.toString() }),
    };
    removeKeys(tempObj, ['percentageCgpa']);
    !transcript && removeKeys(tempObj, ['transcript']);
    ongiong && removeKeys(tempObj, ['endDate']);
    if (educationIndex.current < 0) {
      newEducations.push(tempObj);
    } else {
      newEducations[educationIndex.current] = { ...tempObj };
      setUpdateEdu({ update: false, editInd: -1 });
    }
    setEducations([...newEducations]);
    setFormData({ ...formData, educationDetails: [...newEducations] });
    educationIndex.current = -1;
    reset({});
    setFilename('');
  };

  const handleEducation = (index: number) => {
    educationIndex.current = index;
    const data = educations.find((data, i) => i === index);
    console.log('data', data);
    reset({
      institute: data?.institute,
      degree: data?.degree,
      description: data?.description,
      percentageCgpa: marksVal,
      startDate: moment(data?.startDate, 'YYYY-MM-DD').toDate(),
      endDate: moment(data?.endDate, 'YYYY-MM-DD').toDate(),
      ongoing: data?.ongoing,
      prevTranscript: data?.transcript,
    });
    console.log('type', marksType.toString());
    // setMarksType(marksType);
    setOngoing(!!data?.ongoing);
    setFilename(data?.filename);
  };

  const getUser = async () => {
    const res = await EmployeeService.getEducationEmployee(employeeDocId || id);

    const data = res.data.education.map((item: any, index: number) => {
      return {
        ...item,
        startDate: moment(item.startDate).format('YYYY-MM-DD'),
        endDate: moment(item.endDate).format('YYYY-MM-DD'),
        // ...(item.percentage && { percentageCgpa: item.percentage.toString() }),
      };
    });

    setEducations(data);
  };

  const handleDeleteIndex = (index: number) => {
    const delEdu = [...educations];
    delEdu.splice(index, 1);
    setEducations([...delEdu]);
  };

  useEffect(() => {
    (id || employeeDocId) && getUser();
  }, []);

  const startDate = watch('startDate');
  return {
    handleAddEduction,
    onSubmit,
    register,
    control,
    errors,
    reset,
    educations,
    handleSubmit,
    handleEducation,
    btnLoader,
    setOngoing,
    ongiong,
    handleDeleteIndex,
    setStartDateHandle,
    startDateHandle,
    startDate,
    setValue,
    filename,
    setMarksType,
    marksType,
    setMarkVal,
    marksVal,
  };
};

export const selectCountry = [
  {
    value: 'hr',
    description: 'Hr',
  },
  {
    value: 'employee',
    description: 'Employee',
  },
  {
    value: 'admin',
    description: 'Admin',
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
];

export const columns = [
  {
    key: 'degree',
    name: 'Degree',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'institute',
    name: 'Institute',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'startDate',
    name: 'Start Date',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'endDate',
    name: 'End Date',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'percentage',
    name: 'Percentage/CGPA',
    alignText: 'center',
    width: '150px',
  },
  { key: 'actions', name: 'Actions', alignText: 'center', width: '200px' },
];
