import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface Data {
  gender: string;
  department: string;
  designation: string;
  employmentType: string;
  payType: string;
}

export const useProfileSetting = () => {
  const { register, handleSubmit, errors, control } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = () => {};
  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    control,
  };
};

export const schema = yup.object().shape({
  gender: yup.string().required('Gender is a required field'),
  department: yup.string().required('Department is a required field'),
  designation: yup.string().required('Designation is a required field'),
  employmentType: yup.string().required('Employment Type is a required field'),
  payType: yup.string().required('Pay Type is a required field'),
});

export const gender = [
  {
    value: 'Male',
    description: 'Male',
  },
  {
    value: 'Female',
    description: 'Female',
  },
  {
    value: 'Other',
    description: 'Other',
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

export const designation = [
  {
    value: 'Senior Front-end Developer',
    description: 'Senior Front-end Developer',
  },
  {
    value: 'Senior Backend-developer',
    description: 'Senior Backend-developer',
  },
];

export const employmentType = [
  {
    value: 'Part Time',
    description: 'Part Time',
  },
  {
    value: 'Full Time',
    description: 'Full Time',
  },
];

export const referenceOptions = [
  {
    value: 'Checkin',
    description: 'Checkin',
  },
  {
    value: 'Checkout',
    description: 'Checkout',
  },
];

export const conditionOptions = [
  {
    value: 'Greater than',
    description: 'Greater than',
  },
  {
    value: 'Less than',
    description: 'Less than',
  },
];

export const colorOptions = [
  {
    value: 'Light red',
    description: 'Light red',
  },
  {
    value: 'Light Green',
    description: 'Light Green',
  },
];
