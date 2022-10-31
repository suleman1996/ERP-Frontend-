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
  skillData: any;
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

export const useSkill = ({ formData, setFormData, employeeId, setSkillData, skillData }: Props) => {
  const { id } = useParams();
  const [educations, setEducations] = useState<Skill[] | []>([]);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [activeEdit, setActiveEdit] = useState('');
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
      ...(selectedFileName && data.file && { file: data.file[0] ? fileBase64 : data.file }),
    };
    if (!skillData.file || Object.keys(skillData.file).length === 0) {
      !selectedFileName && removeKeys(skillData, ['file']);
    }

    !selectedFileName && removeKeys(skillData, ['file']);

    removeKeys(skillData, ['skills']);
    setSkillData((current) => [...current, skillData]);
    const newEducations: Skill[] = [...educations];
    const tempObj = {
      ...data,
      skillLevel: data?.skills.toLocaleLowerCase(),
      ...(fileBase64
        ? { file: fileBase64 }
        : {
            file: newEducations && newEducations[skillIndex.current]?.file,
          }),
    };

    if (tempObj?.file?.length === 0) {
      removeKeys(tempObj, ['file']);
    }
    if (skillIndex.current < 0) {
      newEducations.push(tempObj);
    } else {
      newEducations[skillIndex.current] = { ...tempObj };
      setUpdateEdu({ update: false, editInd: -1 });
    }
    setEducations([...newEducations]);
    setFormData({ ...formData, setSkillData: [...newEducations] });
    reset({ skills: '' });
    setToggle(-1);
    setActiveEdit('');
    skillIndex.current = -1;
    setSelectedFileName('');
  };

  const handleEducation = (index: number) => {
    skillIndex.current = index;
    const data = educations.find((data, i) => i === index);
    data?.file && setSelectedFileName('file');
    setActiveEdit(`${data?.skillLevel}`);
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
    setFormData({ ...formData, setSkillData: [...delEdu] });
  };

  const getUser = async () => {
    const res = await EmployeeService.getExpertiesEmployee(id);
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
      // setSkillData((current) => [...current, ...formData?.setSkillData]);
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
    activeEdit,
    handleDeleteIndex,
    toggle,
    setToggle,
    selectedFileName,
    setSelectedFileName,
  };
};

export const schema = yup.object().shape({
  skillName: yup.string().required('Skill  is a required field'),
  experince: yup.number().typeError('Experience is a required & should be a number').required(),
  year: yup
    .number()
    .required('Year is a required field')
    .typeError('Year is required & should be a number'),

  skills: yup.string().required('Skill level is a required field'),
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
