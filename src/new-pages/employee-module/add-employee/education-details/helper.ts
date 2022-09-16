import { useState, useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import moment from 'moment';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import EmployeeService from 'services/employee-service';
import { convertBase64Image } from 'main-helper';
import { removeKeys } from 'helper';

export interface Education {
  degree: string;
  institute: string;
  startDate?: string;
  endDate?: string;
  percentageCgpa: string;
  transcript: string;
  description: string;
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
  const [educations, setEducations] = useState<Education[] | []>([]);
  const educationIndex = useRef(-1);
  const [ongiong, setOngoing] = useState(false);
  const { pathname } = useLocation();

  const [updateEdu, setUpdateEdu] = useState({
    update: false,
    editInd: -1,
  });
  const { register, handleSubmit, errors, control, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    setBtnLoader(true);
    setFormData({ ...formData, educationDetails: [...educations] });
    if (id) {
      if (educations?.length) {
        const userData = {
          type: 4,
          educationDetails: [...educations],
          employeeId: 'SPX010',
        };
        const res = await EmployeeService.updateAddedEmployee(userData, id);
        if (res.status === 201) {
          handleNext && handleNext('Experience');
        }
      }
    } else {
      if (educations?.length) {
        const res = await EmployeeService.addEmployee({
          type: 4,
          educationDetails: [...educations],
          employeeId: 'SPX010',
        });
        if (res.status === 201) {
          handleNext && handleNext('Experience');
        }
      }
    }
    setBtnLoader(false);
  };

  const handleAddEduction = async (data: Education) => {
    const newEducations: any = [...educations];
    const { startDate, endDate, transcript } = data;
    const tempObj = {
      ...data,
      endDate: moment(endDate).format('YYYY-MM-DD'),
      startDate: moment(startDate).format('YYYY-MM-DD'),
      ongoing: ongiong,
      transcript: await convertBase64Image(transcript[0]),
    };
    ongiong && removeKeys(tempObj, ['endDate']);
    if (educationIndex.current < 0) {
      newEducations.push(tempObj);
    } else {
      newEducations[educationIndex.current] = { ...tempObj };
      setUpdateEdu({ update: false, editInd: -1 });
    }
    setEducations([...newEducations]);
    setFormData({ ...formData, educationDetails: [...newEducations] });
    reset({});
    educationIndex.current = -1;
  };

  const handleEducation = (index: number) => {
    educationIndex.current = index;
    const data = educations.find((data, i) => i === index);
    reset({
      institute: data?.institute,
      degree: data?.degree,
      description: data?.description,
      percentageCgpa: data?.percentageCgpa,
    });
  };

  const getUser = async () => {
    const res = await EmployeeService.getEmployee(id);

    const data = res.data.educationDetails.map((item: any, index: number) => {
      return {
        ...item,
        startDate: moment(item.startDate).format('YYYY-MM-DD'),
        endDate: moment(item.endDate).format('YYYY-MM-DD'),
        percentageCgpa: item.percentageCgpa.toString(),
      };
    });

    delete data[0].ongoing;
    delete data[1].ongoing;
    setEducations(data);
  };

  const handleDeleteIndex = (index: number) => {
    const delEdu = [...educations];
    delEdu.splice(index, 1);
    setEducations([...delEdu]);
  };

  useEffect(() => {
    id && getUser();
    if (
      formData?.educationDetails !== undefined &&
      Object.keys(formData?.educationDetails)?.length
    ) {
      setEducations([...formData?.educationDetails]);
    }
  }, []);

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
  };
};

export const schema = yup.object().shape({
  institute: yup.string().required('Institute is a required field'),
  degree: yup.string().required('Degree is a required field'),
  description: yup.string().required('Description is a required field'),
  startDate: yup.string().required('Start date is a required field'),
  percentageCgpa: yup.string().required('Percentage CGPA is a required field'),
  endDate: yup.string().when('ongoing', {
    is: 'false',
    then: yup.string().required('End date is required.'),
  }),
  transcript: yup
    .mixed()
    .test('required', 'You need to provide a file', (file) => {
      if (file[0]) return true;
      return false;
    })
    .test('fileSize', 'The file is too large', (file) => {
      return file[0] && file[0].size <= 2000000;
    }),
});

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
    key: 'percentageCgpa',
    name: 'Percentage',
    alignText: 'center',
    width: '150px',
  },
  { key: 'actions', name: 'Actions', alignText: 'center', width: '200px' },
];

export const rows = [
  {
    degree: 'Masters',
    institute: 'SprintX',
    startDate: '20/20/2022',
    endDate: '20/20/2022',
    percentage: '22%',
  },
  {
    degree: 'Masters',
    institute: 'SprintX',
    startDate: '20/20/2022',
    endDate: '20/20/2022',
    percentage: '22%',
  },
];
