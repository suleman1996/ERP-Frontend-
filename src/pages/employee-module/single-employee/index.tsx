import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

import Overview from './overview'
import Documents from './documents'
import Attendance from './attendance'
import Button from 'components/button'
import AddDocument from './documents/add-document'
import SalaryInformation from './salary-information'
import CardContainer from 'components/card-container'

import EmployeeService from 'services/employee-service'

import cross from 'assets/cross.svg'
import add from 'assets/add.svg'
import edit from 'assets/edit-employee.svg'
import profile from 'assets/avatar.jfif'
import style from './single-employee.module.scss'

const SingleEmployee = () => {
  const navigate = useNavigate()
  const [user] = useState<any>()
  const { id } = useParams()
  const [document, setDocument] = useState<any>()
  const [docId, setDocId] = useState<any>()
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)
  const [userData, setUserData] = useState<any>()

  const getSingleEmployee = async () => {
    const res = await EmployeeService.getOverView(id)
    setUserData(res?.data)
  }

  const getAllDocuments = async () => {
    const res = await EmployeeService.getAllDocuments(id)
    setDocument(res?.data)
  }

  useEffect(() => {
    getSingleEmployee()
    getAllDocuments()
  }, [])

  const positions = [
    {
      title: 'Department',
      subtitle: userData?.department,
      class: style.b1,
    },
    {
      title: 'Age',
      subtitle: userData?.ageInYear,
      class: style.b2,
    },
    {
      title: 'Experience',
      subtitle: +userData?.totalExperince,
      class: style.b3,
    },
  ]

  return (
    <CardContainer className={style.card}>
      <div className={style.header}>
        <h6>Employee Details</h6>
        <img src={cross} alt="" onClick={() => navigate('/employee')} />
      </div>
      <div className={style.stepper}>
        <div className={style.employeeDetails}>
          <div className={style.leftDiv}>
            <div className={style.imgDiv}>
              <img
                src={
                  userData?.profilePicture ? userData?.profilePicture : profile
                }
                alt="asda"
                className={style.proDiv}
              />
              <Link to={`/employee/edit/${id}`}>
                <img src={edit} alt="" className={style.edit} />
              </Link>{' '}
            </div>
            <div className={style.content}>
              <div>
                <h6>{`${userData?.fullName}`}</h6>
              </div>
              <p>{userData?.designation}</p>
            </div>
          </div>
          <div className={style.rightDiv}>
            {positions.map((ele, index) => (
              <div key={index} className={`${style.borderDiv} ${ele.class}`}>
                <p>{ele.title}</p>
                <h6>{ele.subtitle}</h6>
              </div>
            ))}
          </div>
        </div>
        <div className={style.flexBetween}>
          <div className={style.tabs}>
            <p
              onClick={() => setActive(0)}
              style={{ color: active === 0 ? '#2D2D32' : '' }}
            >
              Overview
            </p>
            <p
              onClick={() => setActive(1)}
              style={{ color: active === 1 ? '#2D2D32' : '' }}
            >
              Attendance
            </p>
            <p
              onClick={() => setActive(2)}
              style={{ color: active === 2 ? '#2D2D32' : '' }}
            >
              Salary Information
            </p>
            <p
              onClick={() => setActive(3)}
              style={{ color: active === 3 ? '#2D2D32' : '' }}
            >
              Documents
            </p>
          </div>
          {active === 3 && (
            <div>
              <Button
                text="Add Document"
                iconStart={add}
                handleClick={() => setOpen(true)}
              />
            </div>
          )}
        </div>
      </div>
      <div style={{ padding: '10px 20px' }}>
        {active === 0 && <Overview user={userData} />}
        {active === 1 && <Attendance user={user} />}
        {active === 2 && <SalaryInformation />}
        {active === 3 && (
          <Documents
            setOpen={setOpen}
            setDocId={setDocId}
            setDocument={setDocument}
            document={document}
            getAllDocuments={getAllDocuments}
          />
        )}
      </div>
      {open ? (
        <AddDocument
          open={open}
          setOpen={() => {
            setOpen(false)
            setDocId(false)
          }}
          docId={docId}
          getAllDocuments={getAllDocuments}
        />
      ) : (
        <></>
      )}
    </CardContainer>
  )
}

export default SingleEmployee
