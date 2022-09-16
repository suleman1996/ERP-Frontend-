import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import * as yup from 'yup';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';

import { removeKeys } from 'helper';
import { removeKey, convertBase64Image } from 'main-helper';

import EmployeeService from 'services/employee-service';

interface Data {
  firstName: string;
  lastName: string;
  employeeId: string;
  phoneNumber: number;
  email: string;
  cnic: number;
  gender: boolean;
  dob: string;
  frontPic: string;
  backPic: string;
}

interface Props {
  handleNext: (data?: string) => void;
  setFormData: any;
  formData: any;
  employeeId: string;
  setEmployeeId: Dispatch<SetStateAction<string>>;
  setEmployeeDocId: Dispatch<SetStateAction<string>>;
}

export const usePersonalInfo = ({
  handleNext,
  setFormData,
  formData,
  employeeId,
  setEmployeeId,
  setEmployeeDocId,
}: Props) => {
  const { id } = useParams();
  const [btnLoader, setBtnLoader] = useState(false);
  const [img, setImg] = useState<unknown>('');
  const { register, handleSubmit, errors, control, reset } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (
      formData?.personalInformation !== undefined &&
      Object.keys(formData?.personalInformation)?.length
    ) {
      const temp = { ...formData?.personalInformation };
      reset({
        firstName: temp?.personalInformation?.firstName,
        lastName: temp?.personalInformation?.lastName,
        employeeId: temp?.employeeId,
        phoneNumber: temp?.personalInformation?.phoneNumber,
        email: temp?.personalInformation?.email,
        dob: new Date(temp?.personalInformation?.dob),
        cnic: temp?.personalInformation?.cnic,
        gender: temp?.personalInformation?.gender,
      });
      setImg(temp?.personalInformation?.img);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  useEffect(() => {
    id && getSingleEmployeeData();
  }, []);

  const getSingleEmployeeData = async () => {
    const res = await EmployeeService.getEmployee(id);
    setImg(res?.data?.personalInformation?.img);
    reset({
      firstName: res?.data?.personalInformation?.firstName,
      lastName: res?.data?.personalInformation?.lastName,
      employeeId: res?.data?.personalInformation?.employeeId,
      phoneNumber: res?.data?.personalInformation?.phoneNumber,
      email: res?.data?.personalInformation?.email,
      dob: new Date(res?.data?.personalInformation?.dob),
      cnic: res?.data?.personalInformation?.cnic,
      gender: res?.data?.personalInformation?.gender,
    });
  };

  const onSubmit = async (data: Data) => {
    setBtnLoader(true);

    const { dob, cnic, frontPic, backPic, employeeId } = data;
    const temp = {
      ...data,
      img,
      dob: moment(dob).format('YYYY-MM-DD'),
      cnic: cnic.toString(),
      employeeId: employeeId.toUpperCase(),
      cnicFront: await convertBase64Image(frontPic[0]),
      cnicBack: await convertBase64Image(backPic[0]),
    };
    const obj = removeKey(temp);
    const userData = {
      personalInformation: { ...obj },
      employeeId: obj.employeeId,
      type: 1,
    };
    setFormData({ ...formData, personalInformation: { ...userData } });

    if (id) {
      removeKeys(userData.personalInformation, ['backPic', 'frontPic']);
      const res = await EmployeeService.updateAddedEmployee(userData, id);
      if (res.status === 200) {
        handleNext('Address');
      }
    } else {
      removeKeys(userData.personalInformation, ['employeeId', 'backPic', 'frontPic']);
      const res = await EmployeeService.addEmployee({ ...userData });
      if (res.status === 201) {
        setEmployeeDocId(res?.data?.newEmployeeDocId);
        setEmployeeId(res?.data?.newEmployeeId);
        handleNext('Address');
      }
    }
    setBtnLoader(false);
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    control,
    img,
    setImg,
    btnLoader,
  };
};

export const schema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is a required field')
    .matches(/^[A-Za-z ]*$/, 'Only alphabets are allowed'),
  lastName: yup
    .string()
    .required('Last name is a required field')
    .matches(/^[A-Za-z ]*$/, 'Only alphabets are allowed'),
  employeeId: yup.string().required('Employee id must be a number'),
  phoneNumber: yup.string().required('Phone number is a required field').min(9).max(13),
  email: yup.string().email().required('email is a required field'),
  cnic: yup
    .number()
    .typeError('CNIC is must be a number  ')
    .min(1000000000000, 'only 13 digits required')
    .max(9999999999999, 'only 13 digits required'),
  gender: yup.string().required(),
  dob: yup.string().required('Date of birth is  required field'),
  frontPic: yup
    .mixed()
    .test('required', 'You need to provide a file', (file) => {
      if (file[0]) return true;
      return false;
    })
    .test('fileSize', 'The file is too large', (file) => {
      return file[0] && file[0].size <= 2000000;
    }),
  backPic: yup
    .mixed()
    .test('required', 'You need to provide a file', (file) => {
      if (file[0]) return true;
      return false;
    })
    .test('fileSize', 'The file is too large', (file) => {
      return file[0] && file[0].size <= 2000000;
    }),
});
