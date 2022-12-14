/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'

import ApplicationApprovalCard from 'components/application-approval-card'

import ApplicationService from 'services/application-service'

import style from './pending-approval.module.scss'

const PendingApproval = () => {
  const [data, setData] = useState<any>({})
  const [history, setHistory] = useState<any>({})

  useEffect(() => {
    getPendingLeaves()
  }, [])

  const getPendingLeaves = async () => {
    const res = await ApplicationService.getPendingApplications()
    console.log('pending leaves ', res?.data?.msg)
    const responseHistory = await ApplicationService.getLeaveHistory()
    setData(res.data)
    setHistory(responseHistory?.data)
  }

  return (
    <>
      <div className={style.cardsWrapper}>
        {/* {data?.msg?.map((el: any) => ( */}

        {dataa?.map((ele, index) => {
          console.log({ ele })
          return (
            <ApplicationApprovalCard
              // formData={formData}
              key={index}
              data={ele}
              history={history}
              getPendingLeaves={console.log('kk')}
            />
          )
        })}

        {/* ))} */}
      </div>
    </>
  )
}

export default PendingApproval

const dataa = [
  {
    leaveType: {
      name: 'red',
    },
  },
  {
    leaveType: {
      name: 'red',
    },
  },
]
