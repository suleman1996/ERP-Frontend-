import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

import Button from 'components/button';
import SkillExpertise from './skill-expertise';
import Certificate from './certificate';
import LanguageExpertise from './language-expertise';

import EmployeeService from 'services/employee-service';
import { removeKeys } from 'helper';

import SvgImg from './svg-img';
import arrowLeft from 'assets/backBtn.svg';
import tickArrow from 'assets/expertise-tick.svg';
import numImg from 'assets/1.png';
import numImg1 from 'assets/2.png';
import numImg2 from 'assets/3.png';
import arrowRight from 'assets/arrowBtnRight.svg';
import style from './expertise.module.scss';
import { useEmployeeForms } from '../context';

interface Props {
  handleBack: (data?: string) => void;
  handleNext: (data?: string) => void;
  formData: any;
  setFormData: any;
  employeeId: string;
  employeeDocId: string;
}

export interface Skill {
  skills: string;
  experince: number;
  year?: number;
  letter?: string;
  file: string;
  skillLevel: string;
}

export interface Language {
  language?: string;
  rate?: string;
  year?: number;
  letter?: string;
  file: string;
}

interface Certificate {
  certificateName?: string;
  skillLevel?: string;
  skills?: string;
  name?: string;
  platform?: string;
  year?: number;
  letter?: string;
  file: string;
}

const ExpertiseInformation = () => {
  const {
    handleNext,
    setFormData,
    employeeDocId,
    formData,
    setEmployeeId,
    setEmployeeDocId,
    handleBack,
    employeeId,
  }: any = useEmployeeForms();

  const { id } = useParams();
  const [btnLoader, setBtnLoader] = useState(false);
  const [active, setActive] = useState(0);
  const [skillData, setSkillData] = useState<Skill[] | []>([]);
  const [language, setLanguage] = useState<Language[] | []>([]);
  const [certificate, setCertificate] = useState<Certificate[] | []>([]);

  const onSubmit = async () => {
    setBtnLoader(true);
    try {
      const userData = {
        expertiseDetails: {
          skills: skillData.length > 0 ? skillData : [],
          languages: language.length > 0 ? language : [],
          certificates: certificate.length > 0 ? certificate : [],
        },
      };
      if (id) {
        const res = await EmployeeService.addPostExperties(userData, id);
        if (res.status === 200) {
          handleNext('Payroll');
        }
      } else {
        if (skillData.length > 0) {
          setActive(1);
        }
        if (language.length > 0) {
          setActive(2);
        }

        const res = await EmployeeService.addPostExperties({ ...userData }, employeeDocId);
        if (res.status === 200) {
          handleNext('Payroll');
        }
      }
    } catch (err) {
      console.error(err);
    }
    setBtnLoader(false);
  };

  const getUser = async () => {
    const res = await EmployeeService.getExpertiesEmployee(employeeDocId);
  };

  return (
    <div className={style.mainForm}>
      <div className={style.header}>
        <div
          onClick={() => setActive(0)}
          className={style.innerDiv}
          style={{ border: active === 0 ? '1.5px solid #57B894' : '' }}
        >
          <img src={active === 0 ? tickArrow : numImg} alt="" />
          <p style={{ color: active === 0 ? '#57B894' : '#CACACA' }}>
            <SvgImg active={active === 0} />
            Add Skill
          </p>
        </div>
        <div className={style.borderInner}></div>
        <div
          className={style.innerDiv}
          onClick={() => setActive(1)}
          style={{ border: active === 1 ? '1.5px solid #57B894' : '' }}
        >
          <img src={active === 1 ? tickArrow : numImg1} alt="" />
          <p style={{ color: active === 1 ? '#57B894' : '#CACACA' }}>
            <SvgImg active={active === 1} />
            Add Language
          </p>
        </div>
        <div className={style.borderInner}></div>
        <div
          className={style.innerDiv}
          style={{ border: active === 2 ? '1.5px solid #57B894' : '' }}
          onClick={() => setActive(2)}
        >
          <img src={active === 2 ? tickArrow : numImg2} alt="" />
          <p style={{ color: active === 2 ? '#57B894' : '#CACACA' }}>
            {' '}
            <SvgImg active={active === 2} />
            Add Certificate
          </p>
        </div>
      </div>
      {active === 0 && (
        <SkillExpertise
          formData={formData}
          employeeId={employeeId}
          setFormData={setFormData}
          setSkillData={setSkillData}
          skillData={skillData}
        />
      )}
      {active === 1 && (
        <LanguageExpertise
          formData={formData}
          employeeId={employeeId}
          setFormData={setFormData}
          setLanguage={setLanguage}
        />
      )}
      {active === 2 && (
        <Certificate
          formData={formData}
          employeeId={employeeId}
          setFormData={setFormData}
          setCertificate={setCertificate}
        />
      )}
      <div className={style.btnContainer}>
        <Button
          text="Back"
          type="button"
          btnClass={style.btn}
          iconStart={arrowLeft}
          handleClick={() => handleBack('Experience')}
        />
        <Button isLoading={btnLoader} text="Next" iconEnd={arrowRight} handleClick={onSubmit} />
      </div>
    </div>
  );
};

export default ExpertiseInformation;
