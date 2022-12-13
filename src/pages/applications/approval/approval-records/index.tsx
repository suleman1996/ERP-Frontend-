import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import Pagination from 'components/pagination'
import Table from 'components/table'

import view from 'assets/viewIconnew.svg'
import deleteIcon from 'assets/table-delete.svg'

import style from './approval-records.module.scss'

const RowsData = [
  {
    name: 'Casual',
    id: 'SRX001',
    from: '35635',
    to: '234',
    approvalDate: '12332',
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
            color: '#57B894',
            backgroundColor: '#B0DECD',
            width: 'max-content',
            padding: '3px 12px',
            borderRadius: '3px',
          }}
        >
          Approved
        </div>
      </div>
    ),
  },
  {
    name: 'Casual',
    id: 'SRX001',
    from: '35635',
    to: '234',
    approvalDate: '12332',
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
            color: '#E92424',
            backgroundColor: '#F7B0B0',
            width: 'max-content',
            padding: '3px 12px',
            borderRadius: '3px',
          }}
        >
          Rejected
        </div>
      </div>
    ),
  },
  {
    name: 'Casual',
    id: 'SRX001',
    from: '35635',
    to: '234',
    approvalDate: '12332',
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
            color: '#6E6E6E',
            backgroundColor: '#BBBBBB',
            width: 'max-content',
            padding: '3px 12px',
            borderRadius: '3px',
          }}
        >
          Canceled
        </div>
      </div>
    ),
  },
  {
    name: 'Casual',
    id: 'SRX001',
    from: '35635',
    to: '234',
    approvalDate: '12332',
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
            color: '#57B894',
            backgroundColor: '#B0DECD',
            width: 'max-content',
            padding: '3px 12px',
            borderRadius: '3px',
          }}
        >
          Approved
        </div>
      </div>
    ),
  },
  {
    name: 'Casual',
    id: 'SRX001',
    from: '35635',
    to: '234',
    approvalDate: '12332',
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
            color: '#5DC124',
            backgroundColor: '#B3EB94',
            width: 'max-content',
            padding: '3px 12px',
            borderRadius: '3px',
          }}
        >
          Updated
        </div>
      </div>
    ),
  },
  {
    name: 'Casual',
    id: 'SRX001',
    from: '35635',
    to: '234',
    approvalDate: '12332',
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
            color: '#5DC124',
            backgroundColor: '#B3EB94',
            width: 'max-content',
            padding: '3px 12px',
            borderRadius: '3px',
          }}
        >
          Updated
        </div>
      </div>
    ),
  },
  {
    name: 'Casual',
    id: 'SRX001',
    from: '35635',
    to: '234',
    approvalDate: '12332',
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
            color: '#5DC124',
            backgroundColor: '#B3EB94',
            width: 'max-content',
            padding: '3px 12px',
            borderRadius: '3px',
          }}
        >
          Updated
        </div>
      </div>
    ),
  },
  {
    name: 'Casual',
    id: 'SRX001',
    from: '35635',
    to: '234',
    approvalDate: '12332',
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
            color: '#5DC124',
            backgroundColor: '#B3EB94',
            width: 'max-content',
            padding: '3px 12px',
            borderRadius: '3px',
          }}
        >
          Updated
        </div>
      </div>
    ),
  },
  {
    name: 'Casual',
    id: 'SRX001',
    from: '35635',
    to: '234',
    approvalDate: '12332',
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
            color: '#5DC124',
            backgroundColor: '#B3EB94',
            width: 'max-content',
            padding: '3px 12px',
            borderRadius: '3px',
          }}
        >
          Updated
        </div>
      </div>
    ),
  },
]
const ColumnsData = [
  {
    key: 'name',
    name: 'Name',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'id',
    name: 'Id',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'from',
    name: 'From',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'to',
    name: 'To',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'approvalDate',
    name: 'Approval Date',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'status1',
    name: 'Status',
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

const ApprovalRecords = () => {
  const [pageSize, setPageSize] = useState(10)
  const [totalCount] = useState()
  const [page, setPage] = useState(1)
  const { control } = useForm()

  return (
    <>
      <div className={style.historyTable}>
        <Table
          columns={ColumnsData}
          rows={RowsData.map((row) => ({
            ...row,
            action: (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className={style.imgDiv}>
                  <img src={deleteIcon} />
                </div>
                <div className={style.imgDiv}>
                  <img src={view} />
                </div>
              </div>
            ),
          }))}
        />
      </div>
      <div className={style.position}>
        <Pagination
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

export default ApprovalRecords
