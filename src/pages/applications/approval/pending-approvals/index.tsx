import ApplicationApprovalCard from 'components/application-approval-card'
import { useEffect, useState } from 'react'
import ApplicationService from 'services/application-service'
import style from './pending-approval.module.scss'

const PendingApproval = ({ formData }: any) => {
  const [data, setData] = useState<any>({})
  const [history, setHistory] = useState<any>({})

  const getPendingLeaves = async () => {
    const res = await ApplicationService.getPendingApplications()
    const responseHistory = await ApplicationService.getLeaveHistory()
    setData(res.data)
    setHistory(responseHistory.data)
  }

  useEffect(() => {
    getPendingLeaves()
  }, [])

  return (
    <div className={style.container}>
      <div className={style.cardsWrapper}>
        {data?.msg?.map((el: any) => (
          <ApplicationApprovalCard
            formData={formData}
            key={el._id}
            data={el}
            history={history}
          />
        ))}
      </div>
    </div>
  )
}

export default PendingApproval
