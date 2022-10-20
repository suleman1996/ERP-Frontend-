import React, { createContext, useState, useContext } from 'react';

const EmployeeFormsContext: any = createContext(null);
export const useEmployeeForms = () => useContext(EmployeeFormsContext);

export const EmployeeFormProvider = ({ children }: any) => {
  const [activeStep, setActiveStep] = useState(0);
  const [employeeId, setEmployeeId] = useState('');
  const [employeeDocId, setEmployeeDocId] = useState('');
  const [onlyActive, setOnlyActive] = useState<number | boolean>(0);
  const [formData, setFormData] = useState({
    addressInformation: {},
  });
  const [stepBarActive, setStepBarActive] = useState(['Personal']); // To present how many steps have been completed
  const [active, setActive] = useState<number>(0); // To Save current Tab
  const [controlWidth, setControlWidth] = useState(0);

  const handleNext = (val?: string) => {
    if (val) {
      setStepBarActive([...stepBarActive, val]);
      setActive((prev) => prev + 1);
    }
    setControlWidth(controlWidth + 16.79);
  };

  const handleBack = (val?: string) => {
    const temp: any = [...stepBarActive];
    temp.pop();
    setStepBarActive([...temp]);
    val && setActive((prev) => prev - 1);
    setControlWidth(controlWidth - 16.79);
  };

  return (
    <EmployeeFormsContext.Provider
      value={{
        activeStep,
        employeeId,
        onlyActive,
        active,
        formData,
        setActiveStep,
        setFormData,
        setEmployeeId,
        setOnlyActive,
        handleBack,
        handleNext,
        employeeDocId,
        stepBarActive,
        setEmployeeDocId,
      }}
    >
      {children}
    </EmployeeFormsContext.Provider>
  );
};

export const withAddEmployeeContext = (Child: any) => (props: any) =>
  (
    <EmployeeFormProvider>
      <Child {...props} />
    </EmployeeFormProvider>
  );
