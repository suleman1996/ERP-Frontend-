import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';

import EmployeeService from 'services/employee-service';
import AddressService from 'services/address-service';

interface Data {
  currentCountry: string;
  currentState: string;
  currentCity: string;
  currentCode: string;
  currentAddress: string;
  permanentCountry: string;
  permanentState: string;
  permanentCity: string;
  permanentCode: string;
  permanentAddress: string;
}

interface Props {
  formData: any;
  setFormData: any;
  employeeId: string;
  handleBack: (data?: string) => void;
  handleNext: (data?: string) => void;
}

export const useAddressInfo = ({ handleNext, setFormData, formData, employeeId }: Props) => {
  const { id } = useParams();
  const [btnLoader, setBtnLoader] = useState(false);
  const [currentCountryData, setCurrentCountryData] = useState([]);
  const [currentCitiesData, setCurrentCitiesData] = useState([]);
  const [permanentCountryData, setPermanentCountryData] = useState([]);
  const [permanentCitiesData, setPermanentCitiesData] = useState([]);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  let stateData: any = [];

  const { register, control, handleSubmit, errors, reset, watch } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  useEffect(() => {
    id && getSingleEmployeeData();
  }, []);

  const getSingleEmployeeData = async () => {
    const res = await EmployeeService.getEmployee(id);
    reset({
      currentCountry: res?.data?.addressInformation?.currentAddress?.country,
      currentState: res?.data?.addressInformation?.currentAddress?.state,
      currentCity: res?.data?.addressInformation?.currentAddress?.city,
      currentCode: res?.data?.addressInformation?.currentAddress?.postalCode,
      currentAddress: res?.data?.addressInformation?.currentAddress?.address,
      permanentCountry: res?.data?.addressInformation?.permanentAddress?.country,
      permanentState: res?.data?.addressInformation?.permanentAddress?.state,
      permanentCity: res?.data?.addressInformation?.permanentAddress?.city,
      permanentCode: res?.data?.addressInformation?.permanentAddress?.postalCode,
      permanentAddress: res?.data?.addressInformation?.permanentAddress?.address,
    });
  };

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
        permanentCountry: currentCountry,
        permanentState: currentState,
        permanentCity: currentCity,
        permanentCode: currentCode,
        permanentAddress: currentAddress,
      });
    } else {
      reset({
        ...data,
        permanentCountry: '',
        permanentState: '',
        permanentCity: '',
        permanentCode: '',
        permanentAddress: '',
      });
    }
  };

  const onSubmit = async (data: Data) => {
    setBtnLoader(true);
    const {
      currentCountry,
      currentState,
      currentCity,
      currentCode,
      currentAddress,
      permanentCountry,
      permanentState,
      permanentCity,
      permanentCode,
      permanentAddress,
    } = data;
    const userData = {
      type: 2,
      employeeId: employeeId.toUpperCase(),
      addressInformation: {
        currentAddress: {
          country: currentCountry,
          state: currentState,
          city: currentCity,
          postalCode: currentCode,
          address: currentAddress,
        },
        permanentAddress: {
          country: permanentCountry,
          state: permanentState,
          city: permanentCity,
          postalCode: permanentCode,
          address: permanentAddress,
        },
      },
    };
    if (id) {
      const res = await EmployeeService.updateAddedEmployee(userData, id);
      if (res.status === 200) {
        handleNext('Education');
      }
    } else {
      setFormData({ ...formData, addressInformation: { ...userData } });
      const res = await EmployeeService.addEmployee({ ...userData });
      if (res.status === 201) {
        handleNext('Company');
      }
    }

    setBtnLoader(false);
  };

  const fetchData = async () => {
    if (
      formData?.addressInformation !== undefined &&
      Object.keys(formData?.addressInformation)?.length
    ) {
      const temp = { ...formData?.addressInformation };
      await getData('currentCountryData', {
        country: temp?.addressInformation?.currentAddress?.country,
      });
      getCities('currentCitiesData', stateData, temp.addressInformation?.currentAddress?.state);
      await getData('permanentCountryData', {
        country: temp?.addressInformation?.permanentAddress?.country,
      });
      getCities('permanentCitiesData', stateData, temp.addressInformation?.permanentAddress?.state);
      setTimeout(() => {
        reset({
          currentCountry: temp?.addressInformation?.currentAddress?.country,
          currentState: temp?.addressInformation?.currentAddress?.state,
          currentCity: temp?.addressInformation?.currentAddress?.city,
          currentCode: temp?.addressInformation?.currentAddress?.postalCode,
          currentAddress: temp?.addressInformation?.currentAddress?.address,
          permanentCountry: temp?.addressInformation?.permanentAddress?.country,
          permanentState: temp?.addressInformation?.permanentAddress?.state,
          permanentCity: temp?.addressInformation?.permanentAddress?.city,
          permanentCode: temp?.addressInformation?.permanentAddress?.postalCode,
          permanentAddress: temp?.addressInformation?.permanentAddress?.address,
        });
      }, 40);
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
        if (res.data.address[0]) {
          const { states } = res.data.address[0];
          stateData = [...states];
          type === 'currentCountryData' && setCurrentCountryData(states || []);
          type === 'permanentCountryData' && setPermanentCountryData(states || []);
        }
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

  return {
    btnLoader,
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
    control,
  };
};

const schema = yup
  .object()
  .shape({
    currentCity: yup.string().required(),
    currentCode: yup
      .string()
      .required()
      .min(4, 'minimum 4 digits are required')
      .max(10, 'maximum 10 digits are required'),
    currentState: yup.string().required(),
    currentCountry: yup.string().required(),
    currentAddress: yup.string().required(),
    permanentCity: yup.string().required(),
    permanentCode: yup
      .string()
      .required()
      .min(4, 'minimum 4 digits are required')
      .max(10, 'maximum 10 digits are required'),
    permanentState: yup.string().required(),
    permanentCountry: yup.string().required(),
    permanentAddress: yup.string().required(),
  })
  .required();
