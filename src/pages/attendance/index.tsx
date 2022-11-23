import React, { useState } from 'react'

import Button from 'components/button'
import CardContainer from 'components/card-container'
import MenuPopup from 'components/menu-popup'
import Pagination from 'components/pagination'
import AttendanceDetail from './attendance-detail'
import AddAttendance from './add-attendance'

import exportIcon from 'assets/export.svg'

import style from './attendance.module.scss'

export interface AttendanceInt {
  id: string
  date: string
  employeeId: string
  loginTime: string
  logoutTime: string
  name: string
  status: string
  totalHours: string
}
const Attendance = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const [active, setActive] = useState<number>(1)

  const handleTab = (index: number) => {
    setActive(index)
  }

  const ActiveView = () => {
    switch (active) {
      case 1:
        return <p>Summary</p>
      case 2:
        return <AttendanceDetail setActive={setActive} />
      case 3:
        return <AddAttendance />
      default:
        return null
    }
  }

  return (
    <>
      <CardContainer
        containerClass={style.container}
        className={style.containerClass}
      >
        <div className={style.div}>
          <div style={{ display: 'flex' }}>
            <p
              className={style.p}
              onClick={() => handleTab(1)}
              style={{ color: active === 1 ? '#000000' : '#cacaca' }}
            >
              Summary
            </p>
            <p
              className={style.p}
              onClick={() => handleTab(2)}
              style={{ color: active === 2 ? '#000000' : '#cacaca' }}
            >
              Attendence Details
            </p>
            <p
              className={style.p}
              onClick={() => handleTab(3)}
              style={{ color: active === 3 ? '#000000' : '#cacaca' }}
            >
              Add Attendence
            </p>
          </div>
          <div className={style.topDiv}>
            <div style={{ position: 'relative' }}>
              {openMenu && (
                <MenuPopup handleExcel={undefined} handlePdf={undefined} />
              )}
            </div>
            <Button
              text="Export"
              iconStart={exportIcon}
              btnClass={style.btnClass}
              className={style.className}
              handleClick={() => setOpenMenu(!openMenu)}
              hide={active === 1 || active === 3}
            />
          </div>
        </div>

        {ActiveView()}

        {active === 2 && (
          <div className={style.pagination}>
            <Pagination />
          </div>
        )}
      </CardContainer>
    </>
  )
}
export default Attendance
