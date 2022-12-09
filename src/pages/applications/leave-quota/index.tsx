import style from './leave-quota.module.scss'
import Table from 'components/table'
import editIcon from 'assets/newEdit.svg'
import revisionHistoryIcon from 'assets/revision-icon.svg'
import reviseIcon from 'assets/revise-icon.svg'
import deleteIcon from 'assets/table-delete.svg'
import { ColumnsData, RowsData } from './helper'
import { useState } from 'react'
import AddQuotaModal from './add-quota'
import DeleteModal from 'components/delete-modal'
import LeaveQuotaHistory from './quota-history'

const LeaveQuota = () => {
  const [editLeaveQuota, setEditLeaveQuota] = useState(false)
  const [delLeaveQuota, setDelLeaveQuota] = useState(false)
  const [renewLeaveQuota, setRenewLeaveQuota] = useState(false)
  const [historyQuota, setHistoryQuota] = useState(false)

  return (
    <div className={style.mainDiv}>
      <Table
        tableClass={style.tableHight}
        tableHeaderClass={style.tableHeaderClass}
        headingText={style.headingText}
        columns={ColumnsData}
        tableHeight={style.tableMaxHight}
        minWidth="840px"
        rows={RowsData?.map((row: any) => ({
          ...row,
          action: (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img
                alt=""
                className={style.img}
                src={reviseIcon}
                width={30}
                onClick={() => {
                  setHistoryQuota(true)
                }}
              />
              <img
                className={style.img}
                alt=""
                src={editIcon}
                width={30}
                onClick={() => {
                  setEditLeaveQuota(true)
                }}
              />
              <img
                className={style.img}
                alt=""
                src={deleteIcon}
                width={30}
                onClick={() => setDelLeaveQuota(true)}
              />
              <img
                className={style.img}
                alt=""
                src={revisionHistoryIcon}
                width={30}
                onClick={() => {
                  setRenewLeaveQuota(true)
                }}
              />
            </div>
          ),
        }))}
      />
      <AddQuotaModal
        openModal={editLeaveQuota}
        setOpenModal={setEditLeaveQuota}
        btnText="Save"
        title="Edit Leave Quota"
      />
      <DeleteModal
        open={delLeaveQuota}
        setOpen={setDelLeaveQuota}
        heading="Are you sure you want to delete this Quota?"
        description="If you delete this you can't recover it."
      />
      <AddQuotaModal
        openModal={renewLeaveQuota}
        setOpenModal={setRenewLeaveQuota}
        btnText="Save"
        title="Renew Leave Quota"
      />
      <LeaveQuotaHistory
        historyLeaveQuota={historyQuota}
        setHistoryLeaveQuota={setHistoryQuota}
      />
    </div>
  )
}

export default LeaveQuota
