import { Dispatch, SetStateAction, useState, useEffect, useRef } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';

import EmployeeService from 'services/employee-service';
import { convertBase64Image } from 'main-helper';
import { removeKeys } from 'helper';

interface Props {
  formData: any;
  setFormData: any;
  employeeId: string;
  setSkillData: Dispatch<SetStateAction<Skill[] | []>>;
}

export interface Skill {
  skillLevel: string;
  skills: string;
  experince: number;
  year?: number;
  letter?: string;
  file: string;
  skillName?: string;
  _id?: string | number;
}

export const useSkill = ({ formData, setFormData, employeeId, setSkillData }: Props) => {
  const { id } = useParams();
  const [educations, setEducations] = useState<Skill[] | []>([]);
  const skillIndex = useRef(-1);
  const [toggle, setToggle] = useState<number>();

  const [updateEdu, setUpdateEdu] = useState({
    update: false,
    editInd: -1,
  });
  const { register, handleSubmit, errors, control, reset, watch } = useForm({
    resolver: yupResolver(schema),
  });

  const handleAddEduction = async (data: any) => {
    const fileBase64 =
      data?.file && data?.file?.length > 0 && (await convertBase64Image(data.file[0]));

    const skillData = {
      ...data,
      skillLevel: data?.skills,
      // ...(fileBase64 && { file: `${fileBase64}` }),
      file: data.file && (data.file[0] ? fileBase64 : data.file),
    };
    if (!skillData.file || Object.keys(skillData.file).length === 0) {
      removeKeys(skillData, ['file']);
    }

    removeKeys(skillData, ['skills']);
    setSkillData((current) => [...current, skillData]);
    const newEducations: Skill[] = [...educations];
    const tempObj = {
      ...data,
      skillLevel: data?.skills.toLocaleLowerCase(),
    };
    if (skillIndex.current < 0) {
      newEducations.push(tempObj);
    } else {
      newEducations[skillIndex.current] = { ...tempObj };
      setUpdateEdu({ update: false, editInd: -1 });
    }
    setEducations([...newEducations]);
    setFormData({ ...formData, setSkillData: [...newEducations] });
    reset({});
    setToggle(-1);
    skillIndex.current = -1;
  };

  const handleEducation = (index: number) => {
    skillIndex.current = index;
    const data = educations.find((data, i) => i === index);
    reset({
      skillName: data?.skillName,
      year: data?.year,
      experince: data?.experince,
      skills: data?.skillLevel,
    });
  };

  const handleDeleteIndex = (index: number) => {
    const delEdu = [...educations];
    delEdu.splice(index, 1);
    setEducations([...delEdu]);
  };

  const getUser = async () => {
    const res = await EmployeeService.getEmployee(id);
    setEducations(res?.data?.skills);

    const data = res?.data?.skills.map((item: any) => {
      removeKeys(item, ['_id']);
      return item;
    });

    setSkillData((current) => [...current, ...data]);
  };

  useEffect(() => {
    id && getUser();
    if (formData?.setSkillData !== undefined && Object.keys(formData?.setSkillData)?.length) {
      setEducations([...formData?.setSkillData]);
      setSkillData((current) => [...current, ...formData?.setSkillData]);
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
    activeEdit: skillIndex.current,
    handleDeleteIndex,
    toggle,
    setToggle,
  };
};

export const schema = yup.object().shape({
  skillName: yup.string().required('Skill  is a required field'),
  experince: yup.number().typeError('Experience is a required & should be a number').required(),
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

export const columns = [
  {
    key: 'skillName',
    name: 'Skill',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'experince',
    name: 'Experience',
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
