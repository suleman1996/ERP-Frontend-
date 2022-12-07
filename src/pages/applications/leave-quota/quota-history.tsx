import { Dispatch, SetStateAction } from 'react'

import Modal from 'components/modal'

import style from './leave-quota.module.scss'
import { ColumnsData, RowsData } from './helper'
import Table from 'components/table'

interface Props {
  historyLeaveQuota: boolean
  setHistoryLeaveQuota: Dispatch<SetStateAction<boolean>>
}

const LeaveQuotaHistory = ({
  historyLeaveQuota,
  setHistoryLeaveQuota,
}: Props) => {
  return (
    <div>
      <Modal
        open={historyLeaveQuota}
        handleClose={() => setHistoryLeaveQuota(false)}
        className={style.wrapperModal}
        title="Quota 1"
        type="submit"
      >
        <Table
          tableClass={style.tableHight}
          tableHeaderClass={style.tableHeaderClass}
          headingText={style.headingText}
          columns={ColumnsData}
          rows={RowsData}
          tableHeight={style.tableMaxHight}
          minWidth="900px"
        />
      </Modal>
    </div>
  )
}

export default LeaveQuotaHistory
