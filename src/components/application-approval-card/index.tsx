import style from './application-approval-card.module.scss'
import image from 'assets/imgs/person.png'
import Button from 'components/button'
import moment from 'moment'
import { useEffect, useState } from 'react'
import CreateApplicationModal from 'pages/applications/my-leaves/create-applications'

interface props {
  className?: string
  data?: any
  history?: any
  formData?: any
  getPendingLeaves?: any
}

const ApplicationApprovalCard = ({
  className,
  data,
  history,
  formData,
  getPendingLeaves,
}: props) => {
  const [remaining, setRemaining] = useState<any>({})
  const [renderState, setRenderState] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if (Object.keys(history).length > 0) {
      const responseHistory = history?.filter(
        (el: any) => el.leaveId === data.leaveType._id
      )
      setRemaining(responseHistory[0])
    }
  }, [history, data])

  useEffect(() => {
    getPendingLeaves()
  }, [renderState])

  return (
    <div className={`${className} ${style.applicationCard}`}>
      <div className={style.headBorder}>
        <p className={style.heading}>{data.leaveType.name} Leave Request</p>
        <div>
          <img src={image} alt="" />
          <span>
            #{data?.employee?.employeeId} on{' '}
            {moment(data.applyDate).format('D MMM, YYYY')}
          </span>
        </div>
      </div>
      <div className={style.middle}>
        <p>{data.noOfDays} Days</p>
        <p className={style.dates}>
          {moment(data.dateFrom).format('D MMM, YYYY')} -{' '}
          {moment(data.dateTo).format('D MMM, YYYY')}
        </p>

        <div className={style.progressBar}>
          <div
            style={{
              width: `${(remaining?.remaining / remaining?.total) * 100}%`,
            }}
          ></div>
        </div>
        <p className={style.leaveCount}>
          {remaining?.remaining}{' '}
          {data.leaveType.name[0].toUpperCase() + data.leaveType.name.slice(1)}{' '}
          Leaves Remaining
        </p>
      </div>
      <div className={style.last}>
        <p className={style.reason}>Reason</p>
        <p className={style.reasonDesc}>
          {data.reason} <a href="">view more</a>
        </p>
      </div>
      <div className={style.lineBorder}></div>
      <div className={style.buttonTab}>
        <Button
          text="Approve"
          type="button"
          btnClass={style.approve}
          className={style.approveText}
          handleClick={() => setOpenModal(true)}
        />
        <Button
          text="Reject"
          type="button"
          btnClass={style.reject}
          className={style.rejectText}
        />
        <Button
          text="Update"
          type="button"
          btnClass={style.update}
          className={style.updateText}
        />
      </div>
      {openModal && (
        <CreateApplicationModal
          value={data}
          openModal={openModal}
          setOpenModal={setOpenModal}
          data={formData}
          setRender={setRenderState}
          type={{ name: 'approvalManager' }}
        />
      )}
    </div>
  )
}

export default ApplicationApprovalCard
