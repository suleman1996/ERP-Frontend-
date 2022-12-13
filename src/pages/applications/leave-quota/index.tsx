import { useEffect, useState } from 'react'
import moment from 'moment'

import Table from 'components/table'
import ApplicationService from 'services/application-service'
import AddQuotaModal from './add-quota'
import DeleteModal from 'components/delete-modal'
import LeaveQuotaHistory from './quota-history'

import style from './leave-quota.module.scss'
import editIcon from 'assets/new-edit.svg'
import revisionHistoryIcon from 'assets/revision-icon.svg'
import reviseIcon from 'assets/revise-icon.svg'
import deleteIcon from 'assets/table-delete.svg'
import SettingsService from 'services/settings-service'

const LeaveQuota = ({ parentRenderState, setParentRenderState }: any) => {
  const [ColumnsData, setColumnsData] = useState<any>([
    {
      key: 'quota',
      name: 'Quota',
      alignText: 'center',
      width: '60px',
    },
    {
      key: 'effectiveDate',
      name: 'Effective Date',
      alignText: 'center',
      width: '150px',
    },
    {
      key: 'start',
      name: 'Start',
      alignText: 'center',
      width: '100px',
    },
    {
      key: 'end',
      name: 'End',
      alignText: 'center',
      width: '100px',
    },
  ])
  const [rowData, setRowsData] = useState<any>([])
  const [editLeaveQuota, setEditLeaveQuota] = useState(false)
  const [delLeaveQuota, setDelLeaveQuota] = useState(false)
  const [renewLeaveQuota, setRenewLeaveQuota] = useState(false)
  const [historyQuota, setHistoryQuota] = useState(false)
  const [selectedLeaveQuota, setSelectedLeaveQuota] = useState({})

  useEffect(() => {
    getAllQuotaLeaves()
  }, [parentRenderState])

  useEffect(() => {
    getLeaveTypes()
  }, [])

  const getLeaveTypes = async () => {
    try {
      const result = await SettingsService.getLeaveTypesApi()

      setColumnsData([
        ...ColumnsData,
        ...result?.data?.leaveTypes?.map((item) => ({
          key: item?.name,
          name: item?.name,
          alignText: 'center',
          width: '60px',
        })),
        {
          key: 'action',
          name: 'Action',
          alignText: 'center',
          width: '200px',
        },
      ])
    } catch (error) {
      console.error(error)
    }
  }

  const getAllQuotaLeaves = async () => {
    try {
      const result = await ApplicationService.getAllQuotaLeavesApi()

      const tempRowsData = []
      for (let i = 0; i < result?.data?.leaveQuotas?.length; i++) {
        tempRowsData?.push({
          quota: result?.data?.leaveQuotas[i]?.name,
          renew: result?.data?.leaveQuotas[i]?.renew,
          effectiveDate: moment(
            result?.data?.leaveQuotas[i]?.effectiveDate
          ).format('MMM YYYY'),
          start: result?.data?.leaveQuotas[i]?.leaveStart,
          end: result?.data?.leaveQuotas[i]?.leaveEnd,
          leavesQuota: result?.data?.leaveQuotas[i]?.leaves,
          _id: result?.data?.leaveQuotas[i]?._id,

          ...result?.data?.leaveQuotas[i]?.leaves.reduce(
            (acc: any, curr: any) => {
              acc[curr?.leaveType?.name] = curr?.count
              return acc
            },
            {}
          ),
        })
      }
      console.log({ tempRowsData })

      setRowsData(tempRowsData)
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
