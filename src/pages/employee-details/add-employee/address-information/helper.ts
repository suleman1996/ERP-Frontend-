import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';

import { backendResponse } from '../helper';
import EmployeeService from 'services/employee-service';
import AddressService from 'services/address-service';

export const useAddressInfo = ({ handleNext, setFormData, formData, employeeId }: any) => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [currentCountryData, setCurrentCountryData] = useState([]);
  const [currentCitiesData, setCurrentCitiesData] = useState([]);
  const [permanentCountryData, setPermanentCountryData] = useState([]);
  const [permanentCitiesData, setPermanentCitiesData] = useState([]);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  let stateData: any = [];

  const { register, handleSubmit, errors, reset, watch } = useForm({
    resolver: yupResolver(schema),
  });

  const handleCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxChecked(e.target.checked);
    const data = watch();
    if (e.target.checked) {
      const { currentAddress, currentCity, currentCode, currentCountry, currentState } = data;
      await getData(
        'permanentCountryData',
        {
          country: currentCountry,
        },
        currentState,
      );
      reset({
        ...data,
        currentAddress: currentAddress,
        currentCity: currentCity,
        currentCode: currentCode,
        currentCountry: currentCountry,
        currentState: currentState,
      });
    } else {
      reset({
        ...data,
        currentAddress: '',
        currentCity: '',
        currentCode: '',
        currentCountry: '',
        currentState: '',
      });
    }
  };

  const onSubmit = async (data: any) => {
    setFormData({ ...formData, addressInformation: { ...data } });
    const tempObj = backendResponse({ ...data });
    if (!params?.id) {
      setIsLoading(true);
      const res = await EmployeeService.addEmployee({
        type: 2,
        addressInformation: { ...tempObj },
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
          type: 2,
          employeeId,
          addressInformation: { ...tempObj },
        },
        params?.id,
      );
      if (res.status === 200) {
        handleNext && handleNext();
      }
      setIsLoading(false);
    }
  };

  const getData = async (type: string, data: { country?: string }, currentState?: string) => {
    if (data?.country) {
      if (type === 'currentCountryData') {
        setCurrentCountryData([]);
        setCurrentCitiesData([]);
      } else if (type === 'permanentCountryData') {
        setPermanentCountryData([]);
        setPermanentCitiesData([]);
      }
      const res = await AddressService.getCountryStateCityData(data);
      if (res.status === 200) {
        stateData = [...res.data.address[0].states];
        type === 'currentCountryData' && setCurrentCountryData(res.data.address[0].states || []);
        type === 'permanentCountryData' &&
          setPermanentCountryData(res.data.address[0].states || []);
      }
      currentState &&
        getCities('permanentCitiesData', res.data.address[0].states || [], currentState);
    } else {
      type === 'currentCountryData' && setCurrentCountryData([]);
      type === 'permanentCountryData' && setPermanentCountryData([]);
    }
  };

  const getCities = (type: string, data: any, state: string) => {
    type === 'currentCitiesData' &&
      setCurrentCitiesData(data.find((x: any) => x.name === state)?.cities || []);
    type === 'permanentCitiesData' &&
      setPermanentCitiesData(data.find((x: any) => x.name === state)?.cities || []);
  };

  useEffect(() => {
    const getFillData = async () => {
      if (Object.keys(formData?.addressInformation)?.length) {
        const temp = { ...formData?.addressInformation };
        await getData('currentCountryData', {
          country: temp.currentCountry,
        });
        getCities('currentCitiesData', stateData, temp.currentState);
        await getData('permanentCountryData', {
          country: temp.permanentCountry,
        });
        getCities('permanentCitiesData', stateData, temp.permanentState);
        reset({ ...temp });
      }
    };
    getFillData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    currentCountryData,
    currentCitiesData,
    permanentCitiesData,
    permanentCountryData,
    checkboxChecked,
    errors,
    register,
    handleSubmit,
    onSubmit,
    handleCheck,
    getCities,
    getData,
    watch,
  };
};

const schema = yup
  .object()
  .shape({
    currentCity: yup
      .string()
      .required()
      .matches(/^[A-Za-z ]*$/, 'Only alphabets are allowed'),
    currentCode: yup
      .string()
      .required()
      .min(4, 'minimum 4 digits are required')
      .max(10, 'maximum 10 digits are required'),
    currentState: yup
      .string()
      .required()
      .matches(/^[A-Za-z ]*$/, 'Only alphabets are allowed'),
    currentCountry: yup
      .string()
      .required()
      .matches(/^[A-Za-z ]*$/, 'Only alphabets are allowed'),
    currentAddress: yup.string().required(),
    permanentCity: yup
      .string()
      .required()
      .matches(/^[A-Za-z ]*$/, 'Only alphabets are allowed'),
    permanentCode: yup.string().required(),
    permanentState: yup
      .string()
      .required()
      .matches(/^[A-Za-z ]*$/, 'Only alphabets are allowed'),
    permanentCountry: yup
      .string()
      .required()
      .matches(/^[A-Za-z ]*$/, 'Only alphabets are allowed'),
    permanentAddress: yup.string().required(),
  })
  .required();
