import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import CvView from './cv-view'
import ProfileView from './profile-view'
import Button from 'components/button'
import Pagination from 'components/pagination'
import EmployeeDropdown from 'components/employee-card-dropdown'
import EmployeeProfileCard from 'components/employee-profile-card'
import Loading from 'components/loading'
import EmployeeFilter from './employee-filter'
import Container from 'components/container'

import EmployeeService from 'services/employee-service'

import style from './employee-profile.module.scss'
import filter from 'assets/filter-icon.svg'
import plus from 'assets/path-plus.svg'

interface Employee {
  handleClick?: any
  profilePicture: string
  fullName: string
  firstName: string
  lastName: string
  companyInformation: any
  department: string
  phone: string
  id: string
  _id: string
  employeeId: string
}

const EmployeeProfileDetails = () => {
  const navigate = useNavigate()
  const { control } = useForm()

  const [open, setOpen] = useState(null)
  const [employees, setEmployees] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [openFilter, setOpenFilter] = useState(false)

  const [pageSize, setPageSize] = useState(10)
  const [totalCount, setTotalCount] = useState()
  const [page, setPage] = useState(1)

  const [loading, setLoading] = useState(false)
  const [openModalProfile, setOpenModalProfile] = useState(false)

  useEffect(() => {
    getEmployeesData()
  }, [pageSize, page])

  const getEmployeesData = async () => {
    setLoading(true)
    const res = await EmployeeService.getAllEmployees({
      pageSize: pageSize,
      page: page - 1,
    })
    if (res?.status === 200) {
      setEmployees(res?.data?.employees[0]?.data)
      setTotalCount(res.data?.employees[0]?.count)
    }
    setLoading(false)
  }

  return (
    <>
      <Container>
        {loading && (
          <div className={style.loaderDiv}>
            <Loading loaderClass={style.loadingStyle} />
          </div>
        )}
        <div className={style.main}>
          <div className={style.headerFlex}>
            <p className={style.employeeTitle}>
              Employees
              <span>320</span>
            </p>
            <div className={style.innerFlex}>
              <img
                src={filter}
                alt=""
                className={style.img}
                onClick={() => setOpenFilter(!openFilter)}
              />

              <Button
                text="Add Employee"
                type="button"
                handleClick={() => navigate('/employee/add')}
                iconStart={plus}
              />
            </div>
          </div>
          <div>
            <EmployeeFilter
              open={openFilter}
              setOpen={setOpenFilter}
              setEmployees={setEmployees}
              getEmployeesData={getEmployeesData}
            />
          </div>
          {employees?.length > 0 ? (
            <div className={style.cardSection}>
              {employees
                // .slice(0, 2)
                ?.map(
                  ({
                    profilePicture,
                    firstName,
                    lastName,
                    companyInformation,
                    phone,
                    employeeId,
                    _id,
                  }: Employee) => (
                    <>
                      <div key={employeeId} style={{ position: 'relative' }}>
                        <EmployeeProfileCard
                          img={profilePicture}
                          name={`${firstName} ${lastName}`}
                          designation={
                            companyInformation?.designationInformation?.name
                          }
                          department={
                            companyInformation?.departmentInformation?.name
                          }
                          phone={phone}
                          id={employeeId}
                          handleClick={() =>
                            setOpen((prev) =>
                              prev === employeeId ? null : employeeId
                            )
                          }
                        />
                        {open === employeeId && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '85%',
                              padding: '15px',
                              zIndex: 2000,
                            }}
                          >
                            <div
                              onClick={() => setOpen(null)}
                              className={style.absoluteClass}
                            ></div>
                            <div style={{ zIndex: 2600, width: '145px' }}>
                              <EmployeeDropdown
                                setOpenModal={setOpenModal}
                                setOpenModalProfile={setOpenModalProfile}
                                id={_id}
                                getEmployeesData={getEmployeesData}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )
                )}
            </div>
          ) : (
            <h1 style={{ textAlign: 'center', marginTop: '20px' }}>
              No Record Found
            </h1>
          )}
        </div>

        <CvView openModal={openModal} setOpenModal={setOpenModal} id={open} />
        <ProfileView
          openModalProfile={openModalProfile}
          setOpenModalProfile={setOpenModalProfile}
          id={open}
        />
        <div className={style.position}>
          <Pagination
            setCount={setPageSize}
            count={pageSize}
            totalCount={totalCount}
            setPage={setPage}
            page={page}
            control={control}
          />
        </div>
      </Container>
    </>
  )
}

export default EmployeeProfileDetails
