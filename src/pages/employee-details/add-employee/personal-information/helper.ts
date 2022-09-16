import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';

import EmployeeService from 'services/employee-service';
import { removeKey } from 'main-helper';

export const usePersonalInfo = ({
  handleNext,
  setOnlyActive,
  setFormData,
  formData,
  setEmployeeId,
  employeeId,
}: any) => {
  const { id } = useParams();

  const [img, setImg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { register, handleSubmit, errors, reset, control } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const temp = { ...data, img };
    const obj = removeKey(temp);
    setFormData({ ...formData, personalInformation: { ...obj } });
    if (!id) {
      setIsLoading(true);
      const res = await EmployeeService.addEmployee({
        personalInformation: { ...obj },
        type: 1,
      });
      if (res.status === 201) {
        setEmployeeId(res.data.newEmployeeId);
        setOnlyActive(false);
        handleNext && handleNext();
      }
      setIsLoading(false);
    } else {
      setIsLoading(true);
      const res = await EmployeeService.updateAddedEmployee(
        {
          personalInformation: { ...obj },
          employeeId,
          type: 1,
        },
        id,
      );
      if (res.status === 200) {
        handleNext && handleNext();
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (Object.keys(formData?.personalInformation)?.length) {
      const temp = { ...formData?.personalInformation };
      reset({ ...temp, dob: new Date(temp?.dob) });
      setImg(temp?.img);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  return {
    isLoading,
    img,
    errors,
    control,
    register,
    handleSubmit,
    onSubmit,
    setImg,
  };
};

const schema = yup
  .object()
  .shape({
    firstName: yup
      .string()
      .required('First name is a required field')
      .matches(/^[A-Za-z ]*$/, 'Only alphabets are allowed'),
    lastName: yup
      .string()
      .required('Last name is a required field')
      .matches(/^[A-Za-z ]*$/, 'Only alphabets are allowed'),
    phoneNumber: yup.string().required('Phone number is a required field').min(10).max(11),
    email: yup.string().when({
      is: (value: string) => value.length,
      then: yup.string().email(),
      otherwise: yup.string(),
    }),
    cnic: yup
      .number()
      .typeError('CNIC is must be a number  ')
      .min(1000000000000, 'only 13 digits required')
      .max(9999999999999, 'only 13 digits required'),
    gender: yup.string().required(),
    dob: yup.string().required(),
  })
  .required();
