import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';

import EmployeeService from 'services/employee-service';
import { removeKey } from 'main-helper';

export const useCompanyInfo = ({ handleNext, setFormData, formData, employeeId }: any) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { register, handleSubmit, errors, reset, watch, control } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const prob = watch('probation', '');

  const onSubmit = async (data: any) => {
    let temp = removeKey({ ...data });
    temp = { ...temp, probation: data?.probation === 'true' ? true : false };
    setFormData({
      ...formData,
      companyInformation: {
        ...temp,
      },
    });
    if (!id) {
      setIsLoading(true);
      const res = await EmployeeService.addEmployee({
        type: 3,
        companyInformation: {
          ...temp,
        },
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
          type: 3,
          employeeId,
          companyInformation: { ...temp },
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
    if (Object.keys(formData?.companyInformation)?.length) {
      const temp = { ...formData?.companyInformation };
      reset({
        ...temp,
        joiningDate: temp?.joiningDate ? new Date(temp?.joiningDate) : '',
        probationEndDate: temp?.probationEndDate ? new Date(temp?.probationEndDate) : '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    isLoading,
    prob,
    errors,
    control,
    options,
    register,
    handleSubmit,
    onSubmit,
  };
};

const options = ['Management', 'Development', 'HR', 'QA'];

const schema = yup
  .object()
  .shape({
    department: yup.string().required(),
    designation: yup.string().required(),
    joiningDate: yup.string().required(),
    annualLeaves: yup.string().required(),
    medicalLeaves: yup.string().required(),
    casualLeaves: yup.string().required(),
    loginTime: yup.string().required(),
    logoutTime: yup.string().required(),
    probation: yup.string(),
    probationEndDate: yup.string().when('probation', {
      is: 'true',
      then: yup.string().required(),
      otherwise: yup.string(),
    }),
    note: yup.string(),
  })
  .required();
