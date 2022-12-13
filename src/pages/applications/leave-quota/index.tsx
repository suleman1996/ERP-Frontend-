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

const LeaveQuota = ({ parentRenderState, setParentRenderState }: any) => {
  const [rowData, setRowsData] = useState<any>([])
  const [editLeaveQuota, setEditLeaveQuota] = useState(false)
  const [delLeaveQuota, setDelLeaveQuota] = useState(false)
  const [renewLeaveQuota, setRenewLeaveQuota] = useState(false)
  const [historyQuota, setHistoryQuota] = useState(false)
  const [selectedLeaveQuota, setSelectedLeaveQuota] = useState({})

  useEffect(() => {
    getAllQuotaLeaves()
  }, [parentRenderState])

  const getAllQuotaLeaves = async () => {
    try {
      const result = await ApplicationService.getAllQuotaLeavesApi()

      setRowsData(
        result?.data?.leaveQuotas?.map((item) => ({
          quota: item?.name,
          renew: item?.renew,
          effectiveDate: moment(item?.name?.effectiveDate).format('MMM YYYY'),
          start: item?.leaveStart,
          end: item?.leaveEnd,
          sick: 'sa',
          casual: 'as',
          annual: 'qw',
          action: 'qw',
          leavesQuota: item?.leaves,
          _id: item?._id,
        }))
      )
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteQouta = async () => {
    try {
      await ApplicationService.deleteQuotaLeavesApi(selectedLeaveQuota?._id)
      setParentRenderState((prev) => !prev)
      setDelLeaveQuota(false)
    } catch (error) {
      console.error(error)
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
                  setSelectedLeaveQuota(row)
                }}
              />
              <img
                className={style.img}
                alt=""
                src={deleteIcon}
                width={30}
                onClick={() => {
                  setDelLeaveQuota(true), setSelectedLeaveQuota(row)
                }}
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
      {editLeaveQuota && (
        <AddQuotaModal
          setRenderState={setParentRenderState}
          openModal={editLeaveQuota}
          setOpenModal={setEditLeaveQuota}
          btnText="Save"
          title="Edit Leave Quota"
          selectedLeaveQuota={selectedLeaveQuota}
        />
      )}
      {delLeaveQuota && (
        <DeleteModal
          handleDelete={handleDeleteQouta}
          open={delLeaveQuota}
          setOpen={setDelLeaveQuota}
          heading="Are you sure you want to delete this Quota?"
          description="If you delete this you can't recover it."
        />
      )}
      {renewLeaveQuota && (
        <AddQuotaModal
          openModal={renewLeaveQuota}
          setOpenModal={setRenewLeaveQuota}
          btnText="Save"
          title="Renew Leave Quota"
        />
      )}
      <LeaveQuotaHistory
        historyLeaveQuota={historyQuota}
        setHistoryLeaveQuota={setHistoryQuota}
      />
    </div>
  )
}

export default LeaveQuota
