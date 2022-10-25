import { Component, useState } from 'react';
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

import cross from 'new-assets/cross.svg';
import style from './add-employee.module.scss';
import { withAddEmployeeContext, useEmployeeForms } from './context';

const AddEmployee = () => {
  const navigate = useNavigate();

  const { active, setStepBarActive, setActive, stepBarActive, controlWidth }: any =
    useEmployeeForms();

  return (
    <>
      <CardContainer className={style.card}>
        <div className={style.header}>
          <div className={style.innerStepper}>
            <div>
              <h6>{tabs[active].title}</h6>
            </div>
          </div>
          <img src={cross} alt="" onClick={() => navigate('/employee')} />
        </div>
        <div className={style.displayMd}>
          <StepBar
            setStepBarActive={setStepBarActive}
            setActive={setActive}
            activeTab={stepBarActive}
            controlWidth={controlWidth}
            tabs={tabs}
          />
        </div>
        <div>{tabs[active].Component}</div>
      </CardContainer>
    </>
  );
};

export default withAddEmployeeContext(AddEmployee);

const tabs: any = [
  { key: 'Personal', title: 'Personal Information', Component: <PersonalInformation /> },
  { key: 'Address', title: 'Personal Information', Component: <AddressInformation /> },
  { key: 'Company', title: 'Personal Information', Component: <CompanyInformation /> },
  { key: 'Education', title: 'Personal Information', Component: <EducationalDetails /> },
  { key: 'Experience', title: 'Personal Information', Component: <ExperienceDetails /> },
  { key: 'Expertise', title: 'Personal Information', Component: <ExpertiseInformation /> },
  { key: 'Payroll', title: 'Personal Information', Component: <PayrollInformation /> },
];
