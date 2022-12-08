import { useEffect, useState } from 'react'
import moment from 'moment'

import { ColumnsData } from './helper'
import Table from 'components/table'
import ApplicationService from 'services/application-service'
import AddQuotaModal from './add-quota'
import DeleteModal from 'components/delete-modal'
import LeaveQuotaHistory from './quota-history'

import style from './leave-quota.module.scss'
import editIcon from 'assets/newEdit.svg'
import revisionHistoryIcon from 'assets/revision-icon.svg'
import reviseIcon from 'assets/revise-icon.svg'
import deleteIcon from 'assets/table-delete.svg'

const LeaveQuota = ({ parentRenderState }: any) => {
  const [rowData, setRowsData] = useState<any>([])
  const [editLeaveQuota, setEditLeaveQuota] = useState(false)
  const [delLeaveQuota, setDelLeaveQuota] = useState(false)
  const [renewLeaveQuota, setRenewLeaveQuota] = useState(false)
  const [historyQuota, setHistoryQuota] = useState(false)

  useEffect(() => {
    getAllQuotaLeaves()
  }, [parentRenderState])

  const getAllQuotaLeaves = async () => {
    try {
      const result = await ApplicationService.getAllQuotaLeavesApi()
      console.log(result.data)
      setRowsData(
        result?.data?.leaveQuotas?.map((item) => ({
          quota: item?.name,
          effectiveDate: moment(item?.name?.effectiveDate).format('MMM YYYY'),
          start: moment(item?.name?.leaveStart).format('DD MMM YYYY'),
          end: moment(item?.name?.leaveEnd).format('DD MMM YYYY'),
          sick: 'sa',
          casual: 'as',
          annual: 'qw',
          action: 'qw',
        }))
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={style.mainDiv}>
      <Table
        tableClass={style.tableHight}
        tableHeaderClass={style.tableHeaderClass}
        headingText={style.headingText}
        columns={ColumnsData}
        tableHeight={style.tableMaxHight}
        minWidth="840px"
        rows={rowData?.map((row: any) => ({
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
      <DeleteModal open={delLeaveQuota} setOpen={setDelLeaveQuota} />
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
