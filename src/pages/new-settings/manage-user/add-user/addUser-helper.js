import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const AddUserHelper = () => {
  const [imgBlob, setImgBlob] = useState();
  const { register, handleSubmit, errors, control, reset, watch, setValue, setError, clearErrors } =
    useForm();

  const onSubmit = (data) => {};

  return {
    register,
    handleSubmit,
    clearErrors,
    control,
    onSubmit,
    imgBlob,
    setImgBlob,
  };
};
