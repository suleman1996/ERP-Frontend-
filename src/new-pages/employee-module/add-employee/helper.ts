import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export const useAddEmployee = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [employeeId, setEmployeeId] = useState('');
  const [employeeDocId, setEmployeeDocId] = useState('');
  const [onlyActive, setOnlyActive] = useState<number | boolean>(0);
  const [formData, setFormData] = useState({
    addressInformation: {},
  });

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

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
    employeeDocId,
    setEmployeeDocId,
  };
};
