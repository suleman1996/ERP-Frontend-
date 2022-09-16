import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import EmployeeService from 'services/employee-service';

export const useAddEmployee = () => {
  const { id } = useParams();

  const [activeStep, setActiveStep] = useState(0);
  const [employeeId, setEmployeeId] = useState('');
  const [onlyActive, setOnlyActive] = useState<number | boolean>(0);
  const [formData, setFormData] = useState<any>({
    personalInformation: {},
    addressInformation: {},
    companyInformation: {},
    educationDetails: [],
    payrollDetail: {},
  });

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  useEffect(() => {
    const getEmployeeData = async () => {
      const res = id && (await EmployeeService.getEmployee(id));
      if (res.status === 200) {
        const tempAddress = convertFrontendResponse({
          ...res?.data?.addressInformation,
        });
        setFormData({ ...res?.data, addressInformation: { ...tempAddress } });
        setOnlyActive(false);
        setEmployeeId(res.data?.personalInformation?.employeeId);
      }
    };
    if (id) {
      getEmployeeData();
    }
  }, [id]);

  return {
    Link,
    activeStep,
    employeeId,
    onlyActive,
    formData,
    setActiveStep,
    setFormData,
    setEmployeeId,
    setOnlyActive,
    handleBack,
    handleNext,
  };
};

export const backendResponse = (obj: any) => {
  const tempObj = { ...obj };

  const newObj = {
    currentAddress: {
      city: tempObj.currentCity,
      postalCode: tempObj.currentCode,
      state: tempObj.currentState,
      country: tempObj.currentCountry,
      address: tempObj.currentAddress,
    },
    permanentAddress: {
      city: tempObj.permanentCity,
      postalCode: tempObj.permanentCode,
      state: tempObj.permanentState,
      country: tempObj.permanentCountry,
      address: tempObj.permanentAddress,
    },
  };
  return newObj;
};

export const convertFrontendResponse = (obj: any) => {
  const tempObj = { ...obj };
  const temp = {
    currentAddress: tempObj.currentAddress.address,
    currentCity: tempObj.currentAddress.city,
    currentCode: tempObj.currentAddress.postalCode,
    currentCountry: tempObj.currentAddress.country,
    currentState: tempObj.currentAddress.state,
    permanentAddress: tempObj.permanentAddress.address,
    permanentCity: tempObj.permanentAddress.city,
    permanentCode: tempObj.permanentAddress.postalCode,
    permanentCountry: tempObj.permanentAddress.country,
    permanentState: tempObj.permanentAddress.state,
  };
  return temp;
};
