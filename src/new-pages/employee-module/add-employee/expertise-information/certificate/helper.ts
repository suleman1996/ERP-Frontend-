import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation, useParams } from 'react-router-dom';
import EmployeeService from 'services/employee-service';

import { convertBase64Image } from 'main-helper';
import { removeKeys } from 'helper';

interface Props {
  formData: any;
  setFormData: any;
  employeeId: string;
  setCertificate: Dispatch<SetStateAction<Certificate[] | []>>;
}

export interface Certificate {
  certificateName?: string;
  skillLevel?: string;
  skills?: string;
  name?: string;
  platform?: string;
  year?: number;
  letter?: string;
  file: string;
}

export const useCerificate = ({ formData, setFormData, employeeId, setCertificate }: Props) => {
  const { id } = useParams();
  const [toggle, setToggle] = useState<number>();
  const [educations, setEducations] = useState<Certificate[] | []>([]);
  const certificateIndex = useRef(-1);
  const [updateEdu, setUpdateEdu] = useState({
    update: false,
    editInd: -1,
  });
  const { register, handleSubmit, errors, control, reset, watch } = useForm({
    resolver: yupResolver(schema),
  });

  const handleAddEduction = async (data: Certificate) => {
    const fileBase64 =
      data?.file && data?.file?.length > 0 && (await convertBase64Image(data.file[0]));
    const certificateData = {
      ...data,
      skillLevel: 'intermediate',
      ...(fileBase64 ? { file: `${fileBase64}` } : {}),
    };
    if (!certificateData.file || Object.keys(certificateData.file).length === 0) {
      removeKeys(certificateData, ['file']);
    }
    removeKeys(certificateData, ['skills']);
    setCertificate((current) => [...current, certificateData]);
    const newEducations: Certificate[] = [...educations];
    const tempObj = {
      ...data,
      skillLevel: data?.skills,
    };
    if (certificateIndex.current < 0) {
      newEducations.push(tempObj);
    } else {
      newEducations[certificateIndex.current] = { ...tempObj };
      setUpdateEdu({ update: false, editInd: -1 });
    }
    setEducations([...newEducations]);
    setFormData({ ...formData, certificateData: [...newEducations] });
    reset({});
    setToggle(-1);
    certificateIndex.current = -1;
  };

  const handleEducation = (index: number) => {
    certificateIndex.current = index;
    const data = educations.find((data, i) => i === index);
    reset({
      certificateName: data?.certificateName,
      year: data?.year,
      platform: data?.platform,
      skills: data?.skillLevel,
    });
  };

  const handleDeleteIndex = (index: number) => {
    const delCert = [...educations];
    delCert.splice(index, 1);
    setEducations([...delCert]);
  };

  const getUser = async () => {
    const res = await EmployeeService.getEmployee(id);
    setEducations(res?.data?.certificates);

    const data = res?.data?.certificates.map((item: any) => {
      removeKeys(item, ['_id']);
      return item;
    });

    setCertificate((current) => [...current, ...data]);
  };

  useEffect(() => {
    id && getUser();
    if (formData?.certificateData !== undefined && Object.keys(formData?.certificateData)?.length) {
      setEducations([...formData?.certificateData]);
      setCertificate((current) => [...current, ...formData?.certificateData]);
    }
  }, []);

  return {
    handleSubmit,
    register,
    errors,
    control,
    handleAddEduction,
    educations,
    handleEducation,
    activeEdit: certificateIndex.current,
    handleDeleteIndex,
    toggle,
    setToggle,
  };
};

export const schema = yup.object().shape({
  certificateName: yup.string().required('Name  is a required field'),
  platform: yup.string().required('Platform is a required field'),
  year: yup
    .number()
    .required('Year is a required field')
    .typeError('Year is required & should be a number'),
  // file: yup
  //   .mixed()
  //   .test("required", "You need to provide a file", (file) => {
  //     if (file[0]) return true;
  //     return false;
  //   })
  //   .test("fileSize", "The file is too large", (file) => {
  //     return file[0] && file[0].size <= 2000000;
  //   }),
  skills: yup.string().required('Skills is a required field'),
});

export const selectRates = [
  {
    value: '50 Percent',
    description: '50 Percent',
  },
  {
    value: '100 Percent',
    description: '100 Percent',
  },
  {
    value: '80 Percent',
    description: '80 Percent',
  },
];

export const columns = [
  {
    key: 'certificateName',
    name: 'Name',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'platform',
    name: 'Platform',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'year',
    name: 'Year',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'skillLevel',
    name: 'Skill Level',
    alignText: 'center',
    width: '150px',
  },

  { key: 'actions', name: 'Actions', alignText: 'center', width: '200px' },
];

export const rows = [
  {
    name: 'Urdu',
    platform: '2 %',
    year: '2002',
    skillLevel: 'Designer',
  },
  {
    skill: 'SprintX',
    experience: '2 years',
    year: '2002',
    skillLevel: 'Designer',
  },
  {
    skill: 'SprintX',
    experience: '2 years',
    year: '2002',
    skillLevel: 'Designer',
  },
];
