import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import * as yup from 'yup';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';

import { removeKeys, setFormError } from 'helper';
import { removeKey, convertBase64Image } from 'main-helper';

import EmployeeService from 'services/employee-service';
import PersonalInformation from './../../../../pages/employee-details/add-employee/personal-information/index';
import { AxiosError } from 'axios';
import { setErrors } from './../../../../helper/index';
import { createNotification } from 'common/create-notification';

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
  id?: any;
}

interface Props {
  handleNext: (data?: string) => void;
  setFormData: any;
  formData: any;
  employeeDocId: string;
  setEmployeeId: Dispatch<SetStateAction<string>>;
  setEmployeeDocId: Dispatch<SetStateAction<string>>;
}

export const usePersonalInfo = ({
  handleNext,
  setFormData,
  formData,
  employeeDocId,
  setEmployeeId,
  setEmployeeDocId,
}: Props) => {
  const { id } = useParams();
  const [btnLoader, setBtnLoader] = useState(false);
  const [genderData, setGenderData] = useState<any>();
  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedFileNameBack, setSelectedFileNameBack] = useState('');
  const [userId, setUserId] = useState();
  const [img, setImg] = useState<unknown>('');
  const { register, handleSubmit, errors, control, reset, setValue, watch, setError, clearErrors } =
    useForm();

  const getEmployeeID = async () => {
    const res = await EmployeeService.getAllEmployeesID(watch().employeeId);
    if (res.status === 200) {
      setUserId(res?.data?.newEmployeeId);
    }
  };

  const getAllGenders = async () => {
    const res = await EmployeeService.getGenders();
    setGenderData(res?.data?.profileSetting?.gender);
  };

  useEffect(() => {
    getAllGenders();
  }, []);

  useEffect(() => {
    if (!employeeDocId) {
      watch().employeeId && getEmployeeID();
    }
  }, [watch().employeeId]);

  useEffect(() => {
    (employeeDocId || id) && getSingleEmployeeData();
  }, [employeeDocId]);

  const getSingleEmployeeData = async () => {
    if (employeeDocId) {
      const res = await EmployeeService.getEmployee(employeeDocId);
      console.log('res let ', res?.data?.employeePersonalInformation?.gender);
      setSelectedFileName(res.data?.employeePersonalInformation?.cnicFront?.name.toString());
      setSelectedFileNameBack(res.data?.employeePersonalInformation?.cnicBack?.name.toString());
      setImg(res?.data?.employeePersonalInformation?.profilePicture);
      setUserId(
        res?.data?.employeePersonalInformation?.employeeId?.split('').splice(3, 3).join(''),
      );
      reset({
        firstName: res?.data?.employeePersonalInformation?.firstName,
        lastName: res?.data?.employeePersonalInformation?.lastName,
        fullName: res?.data?.employeePersonalInformation?.fullName,
        employeeId: res?.data?.employeePersonalInformation?.employeeId
          ?.split('')
          .splice(0, 3)
          .join(''),
        phone: res?.data?.employeePersonalInformation?.phone.toString(),
        email: res?.data?.employeePersonalInformation?.email,
        dob: new Date(res?.data?.employeePersonalInformation?.dob),
        cnic: res?.data?.employeePersonalInformation?.cnic,
        gender: res?.data?.employeePersonalInformation?.gender,
      });
    } else if (id) {
      const res = await EmployeeService.getEmployee(id);
      setSelectedFileName(res.data?.employeePersonalInformation?.cnicFront?.name.toString());
      setSelectedFileNameBack(res.data?.employeePersonalInformation?.cnicBack?.name.toString());
      setImg(res?.data?.employeePersonalInformation?.profilePicture);
      setUserId(
        res?.data?.employeePersonalInformation?.employeeId?.split('').splice(3, 3).join(''),
      );
      reset({
        firstName: res?.data?.employeePersonalInformation?.firstName,
        lastName: res?.data?.employeePersonalInformation?.lastName,
        fullName: res?.data?.employeePersonalInformation?.fullName,
        employeeId: res?.data?.employeePersonalInformation?.employeeId
          ?.split('')
          .splice(0, 3)
          .join(''),
        phone: res?.data?.employeePersonalInformation?.phone.toString(),
        email: res?.data?.employeePersonalInformation?.email,
        dob: new Date(res?.data?.employeePersonalInformation?.dob),
        cnic: res?.data?.employeePersonalInformation?.cnic,
        gender: res?.data?.employeePersonalInformation?.gender,
      });
    }
  };

  const onSubmit = async (data: Data) => {
    setBtnLoader(true);
    try {
      const { dob, cnic, frontPic, backPic, employeeId } = data;
      const temp = {
        ...data,
        profilePicture: img,
        dob: moment(dob).format('YYYY-MM-DD'),
        cnic: cnic.toString(),
        employeeId: employeeId + userId,
        cnicFront: frontPic && frontPic.length && (await convertBase64Image(frontPic[0])),
        cnicBack: backPic && backPic.length && (await convertBase64Image(backPic[0])),
      };
      const obj = removeKey(temp);
      const userData = {
        personalInformation: { ...obj },
        employeeId: obj.employeeId,
        type: 1,
      };

      if (employeeDocId || id) {
        removeKeys(temp, ['backPic', 'frontPic']);
        const res = await EmployeeService.updateAddedEmployee(temp, id ? id : employeeDocId);
        if (res.status === 200) {
          handleNext('Address');
          setFormData({ ...formData, personalInformation: { ...userData } });
        }
      } else {
        removeKeys(temp, ['backPic', 'frontPic']);
        const res = await EmployeeService.addEmployee({ ...temp });
        if (res.status === 200) {
          setTimeout(() => {
            setEmployeeDocId(res?.data?.updatedEmployeeId);
          }, 100);
          setEmployeeId(res?.data?.updatedEmployeeId);
          handleNext('Address');
          setFormData({ ...formData, personalInformation: { ...userData } });
        }
      }
      setBtnLoader(false);
    } catch (err: any) {
      if (err.response.data.error) {
        setErrors(err.response.data.error, setError);
      } else {
        createNotification('error', 'Error', err.response.data.message);
      }
      setBtnLoader(false);
    }
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    control,
    img,
    clearErrors,
    setImg,
    btnLoader,
    setValue,
    userId,
    setError,
    selectedFileName,
    setSelectedFileName,
    selectedFileNameBack,
    setSelectedFileNameBack,
    genderData,
  };
};
