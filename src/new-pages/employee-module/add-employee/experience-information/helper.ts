import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';

import EmployeeService from 'services/employee-service';
import { convertBase64Image } from 'main-helper';
import { removeKeys } from 'helper';
import AddressService from 'services/address-service';
import { legacy_createStore } from '@reduxjs/toolkit';
import { LoginCredentials } from './../../../../interfaces/login-credentials';

interface Props {
  formData: any;
  setFormData: any;
  employeeId: string;
  handleBack: (data?: string) => void;
  handleNext: (data?: string) => void;
  employeeDocId: string;
}

export interface Experince {
  company: string;
  country: string;
  city: string;
  jobTitle?: string;
  tenure?: string;
  letter: string;
  jobStartDate?: string;
  jobEndDate?: string;
  ongoing?: boolean;
}

export const useExperience = ({
  formData,
  setFormData,
  employeeId,
  handleBack,
  handleNext,
  employeeDocId,
}: Props) => {
  const { id } = useParams();
  const educationIndex = useRef(-1);
  const [btnLoader, setBtnLoader] = useState(false);
  const [currentCountryData, setCurrentCountryData] = useState([]);
  const [openTenure, setOpenTenure] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [onGoing, setOnGoing] = useState(false);
  const [cities, setCities] = useState([]);
  const [educations, setEducations] = useState<Experince[] | []>([]);
  const [updateEdu, setUpdateEdu] = useState({
    update: false,
    editInd: -1,
  });

  const { register, handleSubmit, errors, control, reset, watch, setValue, clearErrors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    setBtnLoader(true);
    try {
      setFormData({ ...formData, educationDetails: [...educations] });

      if (id) {
        const res = await EmployeeService.addPostExperience(
          {
            experienceDetails: [...educations],
          },
          id,
        );
        if (res.status === 200) {
          handleNext && handleNext('Expertise');
        }
      } else {
        const res = await EmployeeService.addPostExperience(
          {
            experienceDetails: [...educations],
          },
          employeeDocId,
        );
        if (res.status === 200) {
          handleNext && handleNext('Expertise');
        }
      }
    } catch (err) {
      console.log('err', err);
    }
    setBtnLoader(false);
  };

  const handleAddEduction = async (data: Experince) => {
    const newEducations: any = [...educations];
    const fileBase64 =
      data?.letter && data?.letter?.length > 0 && (await convertBase64Image(data.letter[0]));
    console.log('file', fileBase64);

    const tempObj = {
      ...data,
      jobStartDate: moment(data?.jobStartDate).format('YYYY-MM-DD'),
      jobEndDate: moment(data?.jobEndDate).format('YYYY-MM-DD'),
      ongoing: onGoing,
      ...(fileBase64
        ? { experienceLetter: `${fileBase64}` }
        : {
            experienceLetter:
              newEducations && newEducations[educationIndex.current].experienceLetter,
          }),
    };
    console.log('new', newEducations[educationIndex.current]);
    !watch().letter && removeKeys(tempObj, ['experienceLetter']);
    removeKeys(tempObj, ['letter']);
    onGoing && removeKeys(tempObj, ['jobEndDate']);
    if (educationIndex.current < 0) {
      newEducations.push(tempObj);
    } else {
      newEducations[educationIndex.current] = { ...tempObj };
      setUpdateEdu({ update: false, editInd: -1 });
    }
    setEducations([...newEducations]);
    setFormData({ ...formData, experienceDetails: [...newEducations] });
    reset({ country: '', city: '', jobStartDate: null, jobEndDate: null });
    clearErrors();
    educationIndex.current = -1;
    setOnGoing(false);
    setSelectedFileName('');
  };

  const handleEducation = (index: number) => {
    educationIndex.current = index;
    const data = educations.find((data, i) => i === index);
    console.log(data);

    data?.experienceLetter && setSelectedFileName('experience letter');
    reset({
      company: data?.company,
      country: data?.country,
      city: data?.city,
      jobTitle: data?.jobTitle,
      ongoing: data?.ongoing,
      jobStartDate: data?.jobStartDate && new Date(data?.jobStartDate),
      jobEndDate: data?.jobEndDate && new Date(data?.jobEndDate),
    });
    setOnGoing(!!data?.ongoing);
  };

  const handleDeleteIndex = (index: number) => {
    const delEdu = [...educations];
    delEdu.splice(index, 1);
    setEducations([...delEdu]);
  };

  const getData = async (data: { country?: string }) => {
    if (data?.country) {
      const res = await AddressService.getCountryStateCityData(data);
      if (res.status === 200) {
        if (res.data.address.length == 0) return;
        const { states } = res.data?.address[0];
        const cities = states.reduce(
          (acc: any[], data: any) => [...acc, ...data.cities.map((e: any) => e.name)],
          [],
        );
        setCities(cities);
      }
    }
  };

  useEffect(() => {
    (id || employeeDocId) && getUser();
  }, [id]);

  const getUser = async () => {
    const res = await EmployeeService.getExperienceEmployee(id ? id : employeeDocId);
    const newArr = res?.data?.Experience.map((item: any) => {
      return {
        ...item,
        jobStartDate: moment(item?.jobStartDate).format('YYYY-MM-DD'),
        jobEndDate: item?.jobEndDate && moment(item?.jobEndDate).format('YYYY-MM-DD'),
      };
    });
    setEducations([...newArr]);
  };

  const startDate = watch('jobStartDate');

  return {
    handleAddEduction,
    onSubmit,
    register,
    control,
    reset,
    handleSubmit,
    errors,
    educations,
    openTenure,
    setOpenTenure,
    setOnGoing,
    onGoing,
    handleEducation,
    handleDeleteIndex,
    btnLoader,
    getData,
    watch,
    cities,
    startDate,
    currentCountryData,
    selectedFileName,
    setSelectedFileName,
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
    key: 'company',
    name: 'Company',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'country',
    name: 'Country',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'city',
    name: 'City',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'jobTitle',
    name: 'Job Title',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'tenure',
    name: 'Tenure',
    alignText: 'center',
    width: '250px',
  },
  { key: 'actions', name: 'Actions', alignText: 'center', width: '200px' },
];

export const rows = [
  {
    company: 'SprintX',
    country: 'Pakistan',
    city: 'Lahore',
    jobTitle: 'Designer',
    tenure: '10 Jun, 2021-10 Jun, 2022',
  },
  {
    company: 'SprintX',
    country: 'Pakistan',
    city: 'Lahore',
    jobTitle: 'Designer',
    tenure: '10 Jun, 2021-10 Jun, 2022',
  },
];

export const schema = yup.object().shape({
  company: yup.string().required('Company is required'),
  country: yup.string().required('Country is required'),
  city: yup.string().required('City is required'),
  jobTitle: yup.string().required('Job is required'),
  jobStartDate: yup.string().nullable().required('Start date is required'),
  jobEndDate: yup
    .date()
    .typeError('End date is required')
    .when('ongoing', {
      is: 'false',
      then: yup.string().nullable().required('End date is required.'),
    }),
});
