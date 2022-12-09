import { useEffect, useState } from 'react'

import CardContainer from 'components/card-container'
import Button from 'components/button'
import MyLeaves from './my-leaves'
import LeaveBalance from './leave-balance'
import Approvals from './approval'
import CreateApplicationModal from './my-leaves/create-applications'
import LeaveQuota from './leave-quota'
import AddQuotaModal from './leave-quota/add-quota'
import AddLeaveType from './add-leave-type'

import EmployeeService from 'services/employee-service'

import style from './applications.module.scss'

const Applications = () => {
  const [active, setActive] = useState(1)
  const [data, setData] = useState({})
  const [renderState, setRenderState] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [openAddTypeModal, setOpenAddTypeModal] = useState(false)

  const [openModalQuota, setOpenModalQuota] = useState(false)

  const handleTab = (index: number) => {
    setActive(index)
  }

  const getAllData = async () => {
    let employeeWithDepartment: any =
      await EmployeeService.getEmployeesWithDepApi()
    const employeeOnlyName: any =
      await EmployeeService.getOnlyEmployeesWithoutSelf()
    const leaves: any = await EmployeeService.getLeaves()
    employeeWithDepartment =
      employeeWithDepartment?.data?.employeesWithDepartment?.filter(
        (el: any) => {
          return el._id.name === 'hr'
        }
      )

    setData({
      employeeOnlyName: employeeOnlyName.data,
      hr: employeeWithDepartment[0]?.employees,
      leaves: leaves.data.Leave,
    })
  }

  useEffect(() => {
    getAllData()
  }, [])

  const ActiveView = () => {
    switch (active) {
      case 1:
        return <MyLeaves data={data} parentRenderState={renderState} />
      case 2:
        return <Approvals data={data} />
      case 3:
        return <LeaveQuota parentRenderState={renderState} />
      case 4:
        return <LeaveBalance />
      default:
        return <MyLeaves data={data} parentRenderState={renderState} />
    }
  }

  return (
    <>
      {openModal && (
        <CreateApplicationModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          data={data}
          setRender={setRenderState}
        />
      )}
      {openModalQuota && (
        <AddQuotaModal
          openModal={openModalQuota}
          setOpenModal={setOpenModalQuota}
          data={data}
          setRenderState={setRenderState}
        />
      )}
      <CardContainer className={style.cardContainer}>
        <div className={style.headContainer}>
          <div className={style.mainTopper}>
            <div className={style.topper}>
              <p
                className={active === 1 ? style.active : ''}
                onClick={() => handleTab(1)}
              >
                My Leaves
              </p>
              <p
                className={active === 2 ? style.active : ''}
                onClick={() => handleTab(2)}
              >
                Approvals
              </p>
              <p
                className={active === 3 ? style.active : ''}
                onClick={() => handleTab(3)}
              >
                Leave Quota
              </p>
              <p
                className={active === 4 ? style.active : ''}
                onClick={() => handleTab(4)}
              >
                Leave Types
              </p>
            </div>
          </div>
          <div className={style.buttonClass}>
            {active === 1 && (
              <Button
                text="Apply Leave"
                btnClass={style.btnClass}
                handleClick={() => setOpenModal(true)}
              />
            )}
            {active === 3 && (
              <Button
                text="Add Leave Quota"
                btnClass={style.btnClass}
                handleClick={() => setOpenModalQuota(true)}
              />
            )}
            {active === 4 && (
              <Button
                text="Add Leave Type"
                btnClass={style.btnClass}
                handleClick={() => setOpenAddTypeModal(true)}
              />
            )}
          </div>
        </div>
        <div className={style.footerDiv}>{ActiveView()}</div>
        <AddLeaveType
          setOpenAddTypeModal={setOpenAddTypeModal}
          openAddTypeModal={openAddTypeModal}
          title="Add Leave Type"
          text="Add"
        />
      </CardContainer>
    </>
  )
}

export default Applications
