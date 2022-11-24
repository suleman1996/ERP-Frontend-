import CardContainer from '../../components/card-container'
import style from './applications.module.scss'
import { useEffect, useState } from 'react'
import MyLeaves from './my-leaves'
import LeaveBalance from './leave-balance'
import Approvals from './approval'
import Button from 'components/button'
import CreateApplicationModal from './my-leaves/create-applications'
import EmployeeService from 'services/employee-service'
import LeaveQuota from './leave-quota'
import AddQuotaModal from './leave-quota/add-quota'

const Applications = () => {
  const [active, setActive] = useState(1)
  const [data, setData] = useState({})
  const [renderState, setRenderState] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [openModalQuota, setOpenModalQuota] = useState(false)

  const handleTab = (index: number) => {
    setActive(index)
  }

  //only for commit

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
        return <Approvals />
      case 3:
        return <LeaveQuota />
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
          setRender={setRenderState}
        />
      )}
      <CardContainer className={style.cardContainer}>
        <div
          className={style.headContainer}
          style={{ justifyContent: 'space-between' }}
        >
          <div style={{ display: 'flex' }}>
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
          {active === 1 && (
            <Button
              text="Apply Leave"
              btnClass={style.btnClass}
              handleClick={() => setOpenModal(true)}
            />
          )}
          {active === 3 && (
            <Button
              text="Add Quota"
              btnClass={style.btnClass}
              handleClick={() => setOpenModalQuota(true)}
            />
          )}
        </div>

        {ActiveView()}
      </CardContainer>
    </>
  )
}

export default Applications
