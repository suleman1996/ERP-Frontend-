import { Dispatch, SetStateAction, useState, useEffect } from 'react'
import moment from 'moment-timezone'

import EmployeeService from 'services/employee-service'

import Button from 'components/button'
import Container from 'components/container'
import Modal from 'components/modal'

import style from './employee-profile.module.scss'

interface Props {
  setOpenModalProfile: Dispatch<SetStateAction<boolean>>
  openModalProfile: boolean
  id?: string
}

type User = {
  [key: string]: any
}

const ProfileView = ({ openModalProfile, setOpenModalProfile, id }: Props) => {
  const [user, setUser] = useState<User>()

  const getSingleEmployeeData = async () => {
    const res = await EmployeeService.getEmployee(id)
    if (res.status === 200) {
      setUser(res?.data)
    }
  }

  useEffect(() => {
    if (id) getSingleEmployeeData()
  }, [id])
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
              <p className={style.datePrint}>
                Date Printed : MOnday, 08 Augest 2022 2:44 PM
              </p>
            </Container>
          </div>
          <div>
            <Container container={style.container}>
              <div className={style.userInfo}>
                <div className={style.imgSection}>
                  <img src={user?.personalInformation?.img} />
                </div>
                <div className={style.userData}>
                  <p>{user?.personalInformation?.employeeId}</p>
                  <h3>
                    {user?.personalInformation?.firstName}{' '}
                    {user?.personalInformation?.lastName}
                  </h3>
                  <span className={style.emailText}>
                    {user?.personalInformation?.email}
                  </span>
                  <div className={style.leadDiv}>
                    <span>{user?.companyInformation?.department}</span>
                  </div>
                </div>
              </div>
              <Button text={'PERSONAL INFORMATION'} btnClass={style.btnClass} />
              <div className={style.tb1}>
                <div className={style.gridElement}>
                  <span>
                    Title: {user?.personalInformation?.firstName}{' '}
                    {user?.personalInformation?.lastName}
                  </span>
                </div>
                <div className={style.gridElement}>
                  Country : {user?.addressInformation?.currentAddress.country}
                </div>
                <div className={style.gridElement}>
                  Designation : {user?.companyInformation.designation}
                </div>
                <div className={style.gridElement}>
                  Department : {user?.companyInformation.department}
                </div>
                <div className={`${style.gridElement} ${style.fullRow} `}>
                  Address : {user?.addressInformation?.currentAddress?.address}
                </div>
                <div className={style.gridElement}>
                  Joining Date :{' '}
                  {moment(user?.companyInformation?.joiningDate).format(
                    'DD-MM-YYYY'
                  )}
                </div>
                <div className={style.gridElement}>
                  Phone Number: {user?.personalInformation?.phoneNumber}
                </div>
                <div className={style.gridElement}>
                  Date of Birth:{' '}
                  {moment(user?.companyInformation?.dob).format('DD-MM-YYYY')}
                </div>
                <div className={style.gridElement}>Job Type: Permanent</div>
                <div className={style.gridElement}>
                  Contract Type: Attendance
                </div>
                <div className={style.gridElement}>Pay Type: Monthly</div>
              </div>
              <Button
                text={'EDUCATIONAL INFORMATION'}
                btnClass={style.btnClass}
              />
              <div className={style.tb2}>
                {user?.educationDetails?.map(
                  ({
                    degree,
                    institute,
                    startDate,
                    endDate,
                    percentageCgpa,
                  }: any) => {
                    return (
                      <>
                        <div className={style.gridElement2}>{degree}</div>
                        <div className={style.gridElement2}>{institute}</div>
                        <div className={style.gridElement2}>
                          {moment(startDate).format('DD-MM-YYYY')}
                        </div>
                        <div className={style.gridElement2}>
                          {moment(endDate).format('DD-MM-YYYY')}
                        </div>
                        <div className={style.gridElement2}>
                          {percentageCgpa}
                        </div>
                      </>
                    )
                  }
                )}
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
                  ({
                    effecticeData,
                    increament,
                    incr,
                    designation,
                    type,
                    grossSalary,
                  }) => {
                    return (
                      <>
                        <div className={style.gridElement3}>
                          {effecticeData}
                        </div>
                        <div className={style.gridElement3}>{increament}</div>
                        <div className={style.gridElement3}>{incr}</div>
                        <div className={style.gridElement3}>{designation}</div>
                        <div className={style.gridElement3}>{type}</div>
                        <div className={style.gridElement3}>{grossSalary}</div>
                      </>
                    )
                  }
                )}
              </div>
            </Container>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ProfileView

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
]
