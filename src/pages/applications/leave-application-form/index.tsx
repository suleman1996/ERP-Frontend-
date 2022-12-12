import React from 'react'

import logo from 'assets/sprintx.svg'
import style from './leave.module.scss'
import Button from 'components/button'

const LeaveApplicationForm = () => {
  return (
    <div className={style.main}>
      <div className={style.header}>
        <div>
          <h1 className={style.heading}>Leave Application Form</h1>
          <p className={style.heading} style={{ fontSize: '14px' }}>
            Ref no:
            <span> SPX-HRM-001 RV00</span>
          </p>
        </div>
        <img src={logo} alt="" className={style.img} />
      </div>
      <div className={style.body}>
        <Button text="Applicant Information" btnClass={style.margin} />
        <div className={style.table}>
          <p className={style.p1}>date of submission</p>
          <p className={style.p2}>10 july,2022</p>
          <p className={style.p1}>employee name</p>
          <p className={style.p2}>John Doe</p>
          <p className={style.p1} style={{ textTransform: 'none' }}>
            Employee ID
          </p>
          <p className={style.p2}>#SPX001</p>
          <p className={style.p1}>designation</p>
          <p className={style.p2}>senior developer</p>
          <p className={style.p1}>department</p>
          <p className={style.p2}>development</p>
          <p className={style.p1}></p>
          <p className={style.p2}></p>
        </div>
        <Button text="Leave Details" btnClass={style.margin} />
        <div className={style.table}>
          <p className={style.p1}>start date</p>
          <p className={style.p2}>10 july,2022</p>
          <p className={style.p1}>end date</p>
          <p className={style.p2}>10 july,2022</p>
          <p className={style.p1}>time</p>
          <p className={style.p2}>10:00 AM</p>
          <p className={style.p1}>to</p>
          <p className={style.p2}>12:30 PM</p>
          <p className={style.p1}>duration</p>
          <p className={style.p2}>24 hours</p>
          <p className={style.p1}>Leave type</p>
          <p className={style.p2}>casual</p>
          <p className={style.p1}>reason</p>
          <p className={style.p2} style={{ gridColumn: '2/-1' }}>
            Lorem ipsum is a pseudo-Latin text used in web design, typography,
            layout, and printing in place of English to emphasise design
            elements over content.
          </p>
        </div>
        <Button text="reliever Details" btnClass={style.margin} />
        <div className={style.table}>
          <p className={style.p1}>reliever name</p>
          <p className={style.p2}>john doe</p>
          <p className={style.p1}>approval date</p>
          <p className={style.p2}>10 july,2022</p>
          <p className={style.p1}>remarks(if any)</p>
          <p className={style.p2} style={{ gridColumn: '2/-1' }}>
            Lorem ipsum is a pseudo-Latin text used in web design, typography,
            layout, and printing in place of English to emphasise design
            elements over content.
          </p>
        </div>
        <Button text="HR Details" btnClass={style.margin} />
        <div className={style.table}>
          <p className={style.p1}>HR name</p>
          <p className={style.p2}>john doe</p>
          <p className={style.p1}>approval date</p>
          <p className={style.p2}>10 july,2022</p>
          <p className={style.p1}>remarks(if any)</p>
          <p className={style.p2} style={{ gridColumn: '2/-1' }}>
            Lorem ipsum is a pseudo-Latin text used in web design, typography,
            layout, and printing in place of English to emphasise design
            elements over content.
          </p>
        </div>
        <div className={style.note}>
          <p className={style.pa}>Note:</p>
          <p className={style.para}>
            The Leave Application Form has to be submitted to the Human Resource
            Department at least one week in advance for short leave and one
            month in advance for long leave.Thanks!
          </p>
        </div>
      </div>
    </div>
  )
}

export default LeaveApplicationForm
