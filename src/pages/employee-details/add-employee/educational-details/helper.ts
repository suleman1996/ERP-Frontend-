import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { Education } from 'store/helper';

import EmployeeService from 'services/employee-service';
import { removeKey } from 'main-helper';

export const useEducationInfo = ({ handleNext, setFormData, formData, employeeId }: any) => {
  const { id } = useParams();
  const [educations, setEducations] = useState<Education[] | []>([]);
  const [openModal, setOpenModal] = useState(false);
  const [updateEdu, setUpdateEdu] = useState({
    update: false,
    editInd: -1,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [date, setDate] = useState({
    startDate: '',
    endDate: '',
  });

  const { register, handleSubmit, errors, reset, control, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    setFormData({ ...formData, educationDetails: [...educations] });
    if (educations?.length) {
      if (!id) {
        setIsLoading(true);
        const res = await EmployeeService.addEmployee({
          type: 4,
          educationDetails: [...educations],
          employeeId,
        });
        if (res.status === 201) {
          handleNext && handleNext();
        }
        setIsLoading(false);
      } else {
        setIsLoading(true);
        const res = await EmployeeService.updateAddedEmployee(
          {
            type: 4,
            employeeId,
            educationDetails: [...educations],
          },
          id,
        );
        if (res.status === 200) {
          handleNext && handleNext();
        }
        setIsLoading(false);
      }
    }
  };

  const handleAddEduction = (data: Education) => {
    const newEducations: any = [...educations];
    const tempObj = {
      ...data,
      endDate: moment(data?.endDate).format('MM/DD/YYYY'),
      startDate: moment(data?.startDate).format('MM/DD/YYYY'),
    };
    if (!updateEdu.update) {
      newEducations.push(tempObj);
    } else {
      newEducations[updateEdu.editInd] = { ...tempObj };
      setUpdateEdu({ update: false, editInd: -1 });
    }
    setEducations([...newEducations]);
    setFormData({ ...formData, educationDetails: [...newEducations] });
    reset({});
  };

  const handleDelete = () => {
    const temp: any = [...educations];
    temp.splice(updateEdu.editInd, 1);
    setEducations([...temp]);
    setOpenModal(false);
  };

  const handleEducation = (index: any) => {
    let temp: any = [...educations][index];
    temp = {
      ...temp,
      endDate: new Date(temp.endDate),
      startDate: new Date(temp.startDate),
    };
    reset({ ...temp });
    setUpdateEdu({ update: true, editInd: index });
  };

  const handleDateChange = (e: string, name: string) => {
    if (name === 'startDate') {
      setDate({ startDate: e, endDate: '' });
      setValue('endDate', '');
    } else {
      setDate({ ...date, endDate: e });
    }
  };

  useEffect(() => {
    if (Object.keys(formData?.educationDetails)?.length) {
      const temp = [...formData?.educationDetails];
      temp.forEach((ele) => {
        ele = removeKey(ele);
        ele.endDate = moment(ele?.endDate).format('MM/DD/YYYY');
        ele.startDate = moment(ele?.startDate).format('MM/DD/YYYY');
      });
      setEducations([...temp]);
    }
  }, [formData]);

  return {
    isLoading,
    openModal,
    educations,
    updateEdu,
    date,
    errors,
    control,
    register,
    handleSubmit,
    onSubmit,
    setOpenModal,
    setUpdateEdu,
    handleDelete,
    handleEducation,
    handleDateChange,
    handleAddEduction,
  };
};

const schema = yup
  .object()
  .shape({
    degree: yup
      .string()
      .required()
      .matches(/^[a-zA-Z(). ]*$/, 'Only alphabets and special characters'),
    startDate: yup.string().required(),
    endDate: yup.string().required(),
    institute: yup.string().required(),
    percentageCgpa: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .required('Must be a number')
      .min(1, 'minimum value is 1')
      .max(99, 'maximum value is 100'),
  })
  .required();

export const columns = [
  { key: 'degree', name: 'Degree', alignText: 'left', width: '150px' },
  { key: 'institute', name: 'Institute', alignText: 'left', width: '250px' },
  {
    key: 'startDate',
    name: 'Start Date',
    alignText: 'center',
    width: '150px',
  },
  { key: 'endDate', name: 'End Date', alignText: 'center', width: '150px' },
  {
    key: 'percentageCgpa',
    name: 'Percentage/CGPA',
    alignText: 'center',
    width: '180px',
  },
  { key: 'actions', name: 'Actions', alignText: 'center', width: '150px' },
];
