/* eslint-disable @typescript-eslint/no-unused-vars */

import Table from 'components/table'
import Button from 'components/button'
import Pagination from 'components/pagination'
import Loading from 'components/loading'
import DeleteModal from 'components/delete-modal'
import CreateApplicationModal from './create-applications'

import ApplicationService from 'services/application-service'
import { createNotification } from 'common/create-notification'

import cancel from 'assets/cancel.svg'
import editIcon from 'assets/new-edit.svg'
import view from 'assets/table-view.svg'

import style from './index.module.scss'
import moment from 'moment'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'

const ColumnsData = [
  {
    key: 'leaveType',
    name: 'Leave Type',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'total',
    name: 'Total',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'remaining',
    name: 'Remaining',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'action',
    name: 'Action',
    alignText: 'center',
    width: '150px',
  },
]
const ColumnsData1 = [
  {
    key: 'leaveType',
    name: 'Leave Type',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'appliedOn',
    name: 'Applied On',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'from',
    name: 'From',
    alignText: 'center',
    width: '130px',
  },
  {
    key: 'to',
    name: 'To',
    alignText: 'center',
    width: '120px',
  },
  {
    key: 'duration',
    name: 'Duration',
    alignText: 'center',
    width: '200px',
  },
  {
    key: 'status1',
    name: 'Status',
    alignText: 'center',
    width: '200px',
  },
  {
    key: 'action',
    name: 'Action',
    alignText: 'center',
    width: '200px',
  },
]

const MyLeaves = ({
  data,
  parentRenderState,
}: {
  data: any
  parentRenderState: any
}) => {
  const [loading, setLoading] = useState(false)
  const [pageSize, setPageSize] = useState(10)
  const [openModal, setOpenModal] = useState(false)
  const [selectedId, setSelectedId] = useState('')
  const [editData, setEditData] = useState('')
  const [cancelModal, setCancelModal] = useState(false)
  const [cancelModalLoading, setCancelModalLoading] = useState(false)
  const [totalCount, setTotalCount] = useState<number>()
  const [RowsData, setRowsData] = useState([])
  const [leaveRowsData, setLeaveRowsData] = useState([])
  const [defaultLeaveType, setDefaultLeaveType] = useState({})
  const [page, setPage] = useState(1)
  const [render, setRender] = useState<boolean>(false)
  const { control } = useForm()

  const getHistory = async () => {
    setLoading(true)
    const res = await ApplicationService.getLeaveHistory()
    const data = res?.data?.map((el: any) => {
      return {
        leaveId: el.leaveId,
        leaveType: el.leaveType,
        remaining: el.remaining + ' Remains',
        total: el.total + ' Allows',
      }
    })
    setRowsData(data)
    setLoading(false)
  }
  const getAllLeaveApplications = async () => {
    setLoading(true)
    const { data } = await ApplicationService.getAllLeaveApplications({
      pageSize: pageSize,
      page: page - 1,
    })
    const { total } = data
    let { msg } = data
    setTotalCount(total)
    msg = msg?.map((el: any) => {
      return {
        rawData: el,
        id: el._id,
        leaveType: el.leaveType.name,
        appliedOn: moment(el.applyDate).format('D MMM, YYYY'),
        from: moment(el.dateFrom).format('D MMM, YYYY (hh:mm A)'),
        to: moment(el.dateTo).format('D MMM, YYYY (hh:mm A)'),
        duration: el.noOfDays + ' Days',
        status: el.status,
        status1: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 'fitContent',
                color:
                  el.status === 'Pending'
                    ? '#E0AD00'
                    : el.status === 'Approved'
                    ? '#57B894'
                    : el.status === 'Rejected'
                    ? '#E92424'
                    : el.status === 'Cancelled'
                    ? '#6E6E6E'
                    : el.status === 'Updated'
                    ? '#5DC124'
                    : el.status === 'Accepted'
                    ? '#5DC224'
                    : '',
                backgroundColor:
                  el.status === 'Pending'
                    ? '#FFE48A'
                    : el.status === 'Approved'
                    ? '#B0DECD'
                    : el.status === 'Rejected'
                    ? '#F7B0B0'
                    : el.status === 'Cancelled'
                    ? '#BBBBBB'
                    : el.status === 'Updated'
                    ? '#B3EB94'
                    : el.status === 'Accepted'
                    ? '#B3EB94'
                    : '',
                padding: '3px 12px',
                borderRadius: '3px',
              }}
            >
              {el.status}
            </div>
          </div>
        ),
      }
    })
    setLeaveRowsData(msg)
    setLoading(false)
  }

  useEffect(() => {
    getHistory()
    getAllLeaveApplications()
  }, [pageSize, page, render, parentRenderState])

  const handleCancel = async () => {
    setCancelModalLoading(true)
    const res = await ApplicationService.deleteApplication(selectedId)
    if (res?.response?.status === 400) {
      setCancelModalLoading(false)
      createNotification('error', 'Error', res?.response?.data?.message)
      setCancelModal(false)
    }
    if (res?.data) {
      setCancelModalLoading(false)
      createNotification('success', 'success', 'Canceled')
      setCancelModal(false)
      setRender((prev) => !prev)
    }
  }

  return (
    <>
      {loading && (
        <div className={style.loaderDiv}>
          <Loading loaderClass={style.loadingStyle} />
        </div>
      )}
      {cancelModal && (
        <DeleteModal
          open={cancelModal}
          setOpen={setCancelModal}
          heading={'Are you sure you want to cancel this?'}
          description={`If you cancel this you can’t reverse it.`}
          handleDelete={handleCancel}
          cancelModal
          isLoading={cancelModalLoading}
        />
      )}
      {openModal && (
        <CreateApplicationModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          data={data}
          defaultLeaveType={defaultLeaveType}
          setRender={setRender}
          editData={editData}
        />
      )}
      <Table
        columns={ColumnsData}
        rows={RowsData?.map((row: any) => ({
          ...row,
          action: (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                text="Apply Now"
                handleClick={() => {
                  setDefaultLeaveType({
                    value: row.leaveId,
                    label: row.leaveType,
                  })
                  setOpenModal(true)
                }}
              />
            </div>
          ),
        }))}
      />
      <div style={{ marginTop: '20px' }}>
        <Table
          columns={ColumnsData1}
          minWidth="1150px"
          rows={leaveRowsData?.map((row: any) => ({
            ...row,
            action: (
              <div
                className={style.imgDiv}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <img alt="" src={view} />
                <img
                  alt=""
                  src={editIcon}
                  onClick={() => {
                    setEditData(row)
                    setOpenModal(true)
                  }}
                />
                <img
                  alt=""
                  src={cancel}
                  onClick={() => {
                    setCancelModal(true)
                    setSelectedId(row?.id)
                  }}
                />
              </div>
            ),
          }))}
        />
      </div>

      <div className={style.position}>
        <Pagination
          hide={false}
          setCount={setPageSize}
          count={pageSize}
          totalCount={totalCount}
          setPage={setPage}
          page={page}
          control={control}
        />
      </div>
    </>
  )
}

export default MyLeaves
