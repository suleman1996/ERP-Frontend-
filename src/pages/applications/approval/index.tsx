import React, { useState } from 'react'

import ApprovalRecords from './approval-records'
import PendingApproval from './pending-approvals'

import style from './approvals.module.scss'

const Approvals = ({ data }: any) => {
  const [active, setActive] = useState(1)

  const handleTab = (index: number) => {
    setActive(index)
  }

  const ActiveView = () => {
    switch (active) {
      case 1:
        return <PendingApproval formData={data} />
      case 2:
        return <ApprovalRecords />
      default:
        return <ApprovalRecords />
    }
  }
  return (
    <>
      <div className={style.mainApprovalContainer}>
        <p
          className={active === 1 ? style.active : ''}
          onClick={() => handleTab(1)}
        >
          Pending Approvals {active === 1 && <span>06</span>}
        </p>
        <p
          className={active === 2 ? style.active : ''}
          onClick={() => handleTab(2)}
        >
          Approvals Record {active === 2 && <span>22</span>}
        </p>
      </div>
      {ActiveView()}
    </>
  )
}

export default Approvals
