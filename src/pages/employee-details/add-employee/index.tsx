import CardContainer from 'components/card-container';
import NavLinks from 'components/nav-links';
import PersonalInformation from './personal-information';
import AddressInformation from './address-information';
import CompanyInformation from './company-information';
import EducationalDetails from './educational-details';
import PayrollInformation from './payroll-information';

import { useAddEmployee } from './helper';

import style from './add-employee.module.scss';
import cross from 'assets/employee-page/Path 306.svg';

const AddEmployee = () => {
  const {
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
  } = useAddEmployee();

  return (
    <>
      <CardContainer>
        <div className={style.navLinksMd}>
          <NavLinks
            active={activeStep}
            setActive={setActiveStep}
            links={steps}
            onlyActive={onlyActive}
          />
        </div>
        <div className={style.navLinksSm}>
          {activeStep === 0 && <h6>Personal Information</h6>}
          {activeStep === 1 && <h6>Address Information</h6>}
          {activeStep === 2 && <h6>Company Information</h6>}
          {activeStep === 3 && <h6>Educational Details</h6>}
          {(activeStep === 4 || activeStep === 5) && <h6>Payroll </h6>}
        </div>
        <Link to="/employee">
          <img src={cross} alt="" style={{ cursor: 'pointer' }} className={style.img} />
        </Link>
        <div className={style.paddingLinks}>
          {activeStep === 0 && (
            <PersonalInformation
              formData={formData}
              setFormData={setFormData}
              setOnlyActive={setOnlyActive}
              handleBack={handleBack}
              handleNext={handleNext}
              setEmployeeId={setEmployeeId}
              employeeId={employeeId}
            />
          )}

          {activeStep === 1 && (
            <AddressInformation
              formData={formData}
              employeeId={employeeId}
              setFormData={setFormData}
              handleBack={handleBack}
              handleNext={handleNext}
            />
          )}

          {activeStep === 2 && (
            <CompanyInformation
              formData={formData}
              handleBack={handleBack}
              handleNext={handleNext}
              setFormData={setFormData}
              employeeId={employeeId}
            />
          )}
          {activeStep === 3 && (
            <EducationalDetails
              formData={formData}
              handleBack={handleBack}
              handleNext={handleNext}
              setFormData={setFormData}
              employeeId={employeeId}
            />
          )}

          {(activeStep === 4 || activeStep === 5) && (
            <PayrollInformation
              formData={formData}
              handleBack={handleBack}
              setFormData={setFormData}
              employeeId={employeeId}
            />
          )}
        </div>
      </CardContainer>
    </>
  );
};

export default AddEmployee;

const steps = [
  { title: 'Personal Information', left: '25px' },
  { title: 'Address Details', left: '43px' },
  { title: 'Company Details', left: '40px' },
  { title: 'Educational Details', left: '33px' },
  { title: 'Payroll', left: '55px' },
];
