import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import moment from 'moment-timezone';

import Skills from './level';
import CvSideBar from './cv-side-bar';
import Modal from 'components/modal';
import Experience from './experience/index';

import EmployeeService from 'services/employee-service';

import image3 from 'assets/imgs/3.svg';
import image4 from 'assets/imgs/2.svg';
import style from './cv-view.module.scss';

interface Props {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  openModal: boolean;
  id?: string;
}

type User = {
  [key: string]: any;
};

const CvView = ({ openModal, setOpenModal, id }: Props) => {
  const [user, setUser] = useState<User>();

  const getSingleEmployeeData = async () => {
    const res = await EmployeeService.getEmployee(id);
    if (res.status === 200) {
      setUser(res?.data);
    }
  };

  useEffect(() => {
    if (id) getSingleEmployeeData();
  }, [id]);

  return (
    <Modal
      open={openModal}
      title="CV View"
      handleClose={() => setOpenModal(false)}
      handleClick={() => setOpenModal(false)}
      text="Print"
    >
      <div style={{ display: 'flex' }}>
        <CvSideBar user={user} />
        <div className={style.wraper}>
          <div className={style.mainDiv}>
            <div className={style.topSec}>
              <img src={image3} alt="" />
              <h2>EXPERIENCE</h2>
            </div>
            <div>
              {ExperienceData.map(({ date, company, job, intro }, index) => (
                <Experience date={date} company={company} job={job} intro={intro} />
              ))}
            </div>
            <div className={style.topSec}>
              <img src={image3} alt="" />
              <h2>EDUCATION</h2>
            </div>
            <div>
              {user?.educationDetails.map((data: any) => (
                <Experience
                  date={`${moment(data.startDate).format('YYYY')}-${moment(data.endDate).format(
                    'YYYY',
                  )}`}
                  company={data.institute}
                  job={data?.degree}
                />
              ))}
              <div className={style.topSec}>
                <img src={image3} alt="" />
                <h2>CERTIFICATES</h2>
              </div>
              <ul>
                <li>2019 - Project Management Certification (PMP)</li>
                <li>2020 - Security management certificates(CISM)</li>
                <li>2021 - Information Technology Certification(PMP)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CvView;

const ExperienceData = [
  {
    date: '2015-2018',
    company: 'VISION MULTITUNE.NET',
    job: 'SENIOR UX MANAGER',
    intro:
      '  Eligendi recusandae earum,consequuntur maiores et at.fugit culpa voluptas ea quae! sit amet consectetur adipisicing elit. Quos  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos ',
  },
  {
    date: '2013-2015',
    company: 'SOFT TECH LIMITED',
    job: 'LEAD UI TEAM',
    intro:
      ' Eligendi recusandae earum,consequuntur maiores et at fugit culpa voluptas ea quae! sit amet consectetur adipisicing elit. Quos  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos ',
  },
  {
    date: '2011-2013',
    company: 'CREATIVE MIND',
    job: 'WEB AND GRAPHIC DESIGNER',
    intro:
      '  Eligendi recusandae earum,consequuntur maiores et at.fugit culpa voluptas ea quae! sit amet consectetur adipisicing elit. Quos  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos ',
  },
];

const EducationData = [
  {
    date: '2010-2015',
    company: 'ASIAN UNIVERSITY',
    job: 'BACHELOR OF ARTS',
    intro:
      'Eligendi recusandae earum,consequuntur maiores et at fugit culpa voluptas ea quae! sit amet consectetur adipisicing elit',
  },
  {
    date: '2008-2010',
    company: 'CREATIVE SCHOOL',
    job: 'HIGHER SECONDARY EXAMINATION',
    intro:
      ' Eligendi recusandae earum,consequuntur maiores et at fugit culpa voluptas ea quae! sit amet consectetur adipisicing elit.',
  },
  {
    date: '2006-2008',
    company: 'CREATIVE SCHOOL',
    job: 'HIGHER SECONDARY EXAMINATION',
    intro:
      'Eligendi recusandae earum,consequuntur maiores et at.fugit culpa voluptas ea quae! sit amet consectetur adipisicing elit. ',
  },
  {
    date: '2004-2006',
    company: 'CREATIVE SCHOOL',
    job: 'ASIAN UNIVERSITY',
    intro:
      '  Eligendi recusandae earum,consequuntur maiores et at.fugit culpa voluptas ea quae! sit amet consectetur adipisicing elit. ',
  },
];

const SkillsData = [
  {
    name: 'PHOTOSHOP',
    val: 80,
  },
  {
    name: 'AFTER EFFECTS',
    val: 80,
  },
  {
    name: 'ILLUSTRATOR',
    val: 80,
  },
  {
    name: 'ADOBE XD',
    val: 80,
  },
  {
    name: 'INDESIGN',
    val: 80,
  },
  {
    name: 'FIGMA',
    val: 80,
  },
];
