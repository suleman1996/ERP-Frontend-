/* eslint-disable @typescript-eslint/no-unused-vars */

import checkinLogo from 'assets/icons/checkinLogo.svg'
import style from './self-attendance.module.scss'
import TimeProgress from 'components/time-progress'
import Button from 'components/button'
import VerticleStepBar from 'components/verticle-stepbar'
// import { Steps } from 'rsuite'

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

const SelfAttendance = () => {
  return (
    <>
      <div style={{ padding: '0 10px', paddingBottom: '60px' }}>
        <div className={style.outerDiv}>
          <div className={style.innerLeft}>
            <div className={style.leftHeader}>
              <span>Work Day</span>
              <span>11 Nov,2022</span>
            </div>
            <div className={style.leftCenter}>
              <div className={style.timeProgress}>
                <TimeProgress />
              </div>
              <div className={style.CenterButtons}>
                <Button
                  text="Check In"
                  iconStart={checkinLogo}
                  btnClass={style.innerLeftBtn}
                />
                <Button
                  text="Break In"
                  btnClass={style.innerLeftBtnWhite}
                  btnTextClass={style.innerLeftBtnWhiteText}
                />
              </div>
              <div className={style.leftFooter}>
                <div className={style.dataContainers}>
                  <p>Working Hours</p>
                  <p>-</p>
                </div>
                <div className={style.dataContainers}>
                  <p>Break Hours</p>
                  <p>-</p>
                </div>
                <div className={style.dataContainers}>
                  <p>Over Time</p>
                  <p>-</p>
                </div>
              </div>
            </div>
          </div>
          <div className={style.innerRight}>
            <div className={style.rightHeader}>
              <span>Today Activity</span>
            </div>
            <div className={style.rightLowerDiv}>
              <VerticleStepBar tabs={tabs} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default SelfAttendance
const tabs: any = [
  {
    key: 'Checkin',
    title: 'Checkin',
  },
  {
    key: 'Break Start',
    title: 'Break Start',
  },
  {
    key: 'Break End',
    title: 'Break End',
  },
  {
    key: 'Checkout',
    title: 'Checkout',
  },
]
