import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import StepBar from 'new-components/stepbar';
import EducationalDetails from './education-details';
import AddressInformation from './address-information';
import CompanyInformation from './company-information';
import PayrollInformation from './payroll-information';
import PersonalInformation from './personal-information';
import ExperienceDetails from './experience-information';
import CardContainer from 'new-components/card-container';
import ExpertiseInformation from './expertise-information';

import { useAddEmployee } from '../add-employee/helper';

import cross from 'new-assets/cross.svg';
import style from './add-employee.module.scss';

interface Data {
  name: string;
  activeName: string;
}

const AddEmployee = () => {
  const navigate = useNavigate();
  const { employeeId, formData, setFormData, setEmployeeId, employeeDocId, setEmployeeDocId } =
    useAddEmployee();

  const [stepBarActive, setStepBarActive] = useState(['Personal']);
  const [active, setActive] = useState('Personal');
  const [controlWidth, setControlWidth] = useState(0);

  const handleNext = (val?: string) => {
    if (val) {
      setStepBarActive([...stepBarActive, val]);
      setActive(val);
    }
    setControlWidth(controlWidth + 16.79);
  };

  const handleBack = (val?: string) => {
    const temp: any = [...stepBarActive];
    temp.pop();
    setStepBarActive(temp);
    val && setActive(val);
    setControlWidth(controlWidth - 16.79);
  };

  return (
    <CardContainer className={style.card}>
      <div className={style.header}>
        <div className={style.innerStepper}>
          <div className={style.border}>
            <p>1 of 7</p>
          </div>
          {activeSteps.map(({ name, activeName }: Data) => (
            <div key={name}>{active === activeName && <h6>{name}</h6>}</div>
          ))}
        </div>
        <img src={cross} alt="" onClick={() => navigate('/employee')} />
      </div>
      <div className={style.stepper}>
        <div className={style.displayMd}>
          <StepBar activeTab={stepBarActive} controlWidth={controlWidth} />
        </div>
        {active === 'Personal' && (
          <PersonalInformation
            handleNext={handleNext}
            formData={formData}
            employeeId={employeeId}
            setEmployeeId={setEmployeeId}
            setEmployeeDocId={setEmployeeDocId}
            setFormData={setFormData}
          />
        )}
        {active === 'Address' && (
          <AddressInformation
            handleNext={handleNext}
            handleBack={handleBack}
            formData={formData}
            employeeId={employeeId}
            setFormData={setFormData}
          />
        )}
        {active === 'Company' && (
          <CompanyInformation
            handleNext={handleNext}
            handleBack={handleBack}
            formData={formData}
            employeeId={employeeId}
            setFormData={setFormData}
          />
        )}
        {active === 'Education' && (
          <EducationalDetails
            handleNext={handleNext}
            handleBack={handleBack}
            formData={formData}
            employeeId={employeeId}
            employeeDocId={employeeDocId}
            setFormData={setFormData}
          />
        )}
        {active === 'Experience' && (
          <ExperienceDetails
            handleNext={handleNext}
            handleBack={handleBack}
            formData={formData}
            employeeId={employeeId}
            setFormData={setFormData}
          />
        )}
        {active === 'Expertise' && (
          <ExpertiseInformation
            handleNext={handleNext}
            handleBack={handleBack}
            formData={formData}
            employeeId={employeeId}
            setFormData={setFormData}
          />
        )}
        {active === 'Payroll' && <PayrollInformation handleBack={handleBack} />}
      </div>
    </CardContainer>
  );
};

export default AddEmployee;

const activeSteps = [
  {
    name: 'Personal Information',
    activeName: 'Personal',
  },
  {
    name: 'Address Information',
    activeName: 'Address',
  },
  {
    name: 'Company Information',
    activeName: 'Company',
  },
  {
    name: 'Education Information',
    activeName: 'Education',
  },
  {
    name: 'Experience Information',
    activeName: 'Experience',
  },
  {
    name: 'Expertise Information',
    activeName: 'Expertise',
  },
  {
    name: 'Payroll Information',
    activeName: 'Payroll',
  },
];
