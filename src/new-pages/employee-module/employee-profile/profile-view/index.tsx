import { Dispatch, SetStateAction } from 'react';

import Button from 'new-components/button';
import Container from 'new-components/container';
import Modal from 'new-components/modal';

import style from './employee-profile.module.scss';

interface Props {
  setOpenModalProfile: Dispatch<SetStateAction<boolean>>;
  openModalProfile: boolean;
}

const ProfileView = ({ openModalProfile, setOpenModalProfile }: Props) => {
  return (
    <>
      <Modal
        open={openModalProfile}
        title="Profile View"
        handleClose={() => setOpenModalProfile(false)}
        handleClick={() => setOpenModalProfile(false)}
        text="Print"
      >
        <div className={style.wraper}>
          <div className={style.header}>
            <Container container={style.container}>
              <h1>Employee Profile</h1>
              <p className={style.datePrint}>Date Printed : MOnday, 08 Augest 2022 2:44 PM</p>
            </Container>
          </div>
          <div>
            <Container container={style.container}>
              <div className={style.userInfo}>
                <div className={style.imgSection}>img</div>
                <div className={style.userData}>
                  <p>#SPX001</p>
                  <h3>jonithen jorge</h3>
                  <span className={style.emailText}>jonithenjorge@gmail.com</span>
                  <div className={style.leadDiv}>
                    <span>UI / UX Designer | Design Lead</span>
                  </div>
                </div>
              </div>
              <Button text={'PERSONAL INFORMATION'} btnClass={style.btnClass} />
              <div className={style.tb1}>
                <div className={style.gridElement}>
                  <span>Title: jonithen jorge</span>
                </div>
                <div className={style.gridElement}>Country : Pakistan</div>
                <div className={style.gridElement}>Designation : Team Lead</div>
                <div className={style.gridElement}>Department : UI UX Designer</div>
                <div className={`${style.gridElement} ${style.fullRow} `}>
                  Address : Wapda Town, Street no 9, House no 98, Lahore Punjab
                </div>
                <div className={style.gridElement}>Joining Date : 10 jan 2022</div>
                <div className={style.gridElement}>Phone Number: +923328494808</div>
                <div className={style.gridElement}>Date of Birth: 02 Dec,2000</div>
                <div className={style.gridElement}>Job Type: Permanent</div>
                <div className={style.gridElement}>Contract Type: Attendance</div>
                <div className={style.gridElement}>Pay Type: Monthly</div>
              </div>
              <Button text={'EDUCATIONAL INFORMATION'} btnClass={style.btnClass} />
              <div className={style.tb2}>
                <div className={style.gridElement2}>
                  <span>Degree</span>
                </div>
                <div className={style.gridElement2}>Institute</div>
                <div className={style.gridElement2}>Start Date</div>
                <div className={style.gridElement2}>End Date</div>
                <div className={style.gridElement2}>% | GPA</div>
                {tableTwoData.map(({ degree, institute, startDate, endDate, gpa }) => {
                  return (
                    <>
                      <div className={style.gridElement2}>{degree}</div>
                      <div className={style.gridElement2}>{institute}</div>
                      <div className={style.gridElement2}>{startDate}</div>
                      <div className={style.gridElement2}>{endDate}</div>
                      <div className={style.gridElement2}>{gpa}</div>
                    </>
                  );
                })}
              </div>
              <Button text={'SALARY INFORMATION'} btnClass={style.btnClass} />
              <div className={style.tb3}>
                <div className={style.gridElement3}>Effective Date</div>
                <div className={style.gridElement3}>Increament</div>
                <div className={style.gridElement3}>Incr. %</div>
                <div className={style.gridElement3}>Designation</div>
                <div className={style.gridElement3}>Type</div>
                <div className={style.gridElement3}>Gross Salary</div>
                {tableThreeData.map(
                  ({ effecticeData, increament, incr, designation, type, grossSalary }) => {
                    return (
                      <>
                        <div className={style.gridElement3}>{effecticeData}</div>
                        <div className={style.gridElement3}>{increament}</div>
                        <div className={style.gridElement3}>{incr}</div>
                        <div className={style.gridElement3}>{designation}</div>
                        <div className={style.gridElement3}>{type}</div>
                        <div className={style.gridElement3}>{grossSalary}</div>
                      </>
                    );
                  },
                )}
              </div>
            </Container>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProfileView;

const tableTwoData = [
  {
    degree: 'Masters in Computer Science',
    institute: 'Fast',
    startDate: '10 jan,2020',
    endDate: '10 jan,2021',
    gpa: 3.95,
  },
  {
    degree: 'Masters in Computer Science',
    institute: 'Fast',
    startDate: '10 jan,2020',
    endDate: '10 jan,2021',
    gpa: 3.95,
  },
  {
    degree: 'Masters in Computer Science',
    institute: 'Fast',
    startDate: '10 jan,2020',
    endDate: '10 jan,2021',
    gpa: 3.95,
  },
];

const tableThreeData = [
  {
    effecticeData: '26 jan, 2020',
    increament: 50000,
    incr: '30%',
    designation: 'Sr.Developer',
    type: 'incr & Pr',
    grossSalary: 150000,
  },
  {
    effecticeData: '26 jan, 2020',
    increament: 50000,
    incr: '30%',
    designation: 'Sr.Developer',
    type: 'incr & Pr',
    grossSalary: 150000,
  },
  {
    effecticeData: '26 jan, 2020',
    increament: 50000,
    incr: '30%',
    designation: 'Sr.Developer',
    type: 'incr & Pr',
    grossSalary: 150000,
  },
];
