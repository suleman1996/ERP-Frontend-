import Pagination from 'components/pagination'
import Table from 'components/table'
import React, { useState } from 'react'
import style from './approval-records.module.scss'
import view from 'assets/viewIconnew.svg'
import deleteIcon from 'assets/table-delete.svg'

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
            fontWeight: '500',
            backgroundColor: '#B0DECD',
            width: '60%',
            height: '32px',
            fontSize: '16px',
            borderRadius: '1.55086px',
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
            fontWeight: '500',
            backgroundColor: '#F7B0B0',
            width: '60%',
            height: '32px',
            fontSize: '16px',
            borderRadius: '1.55086px',
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
            fontWeight: '500',
            backgroundColor: '#BBBBBB',
            width: '60%',
            height: '32px',
            fontSize: '16px',
            borderRadius: '1.55086px',
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
            fontWeight: '500',
            backgroundColor: '#B0DECD',
            width: '60%',
            height: '32px',
            fontSize: '16px',
            borderRadius: '1.55086px',
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
            fontWeight: '500',
            backgroundColor: '#B3EB94',
            width: '60%',
            height: '32px',
            fontSize: '16px',
            borderRadius: '1.55086px',
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
            fontWeight: '500',
            backgroundColor: '#B3EB94',
            width: '60%',
            height: '32px',
            fontSize: '16px',
            borderRadius: '1.55086px',
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
            fontWeight: '500',
            backgroundColor: '#B3EB94',
            width: '60%',
            height: '32px',
            fontSize: '16px',
            borderRadius: '1.55086px',
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
            fontWeight: '500',
            backgroundColor: '#B3EB94',
            width: '60%',
            height: '32px',
            fontSize: '16px',
            borderRadius: '1.55086px',
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
            fontWeight: '500',
            backgroundColor: '#B3EB94',
            width: '60%',
            height: '32px',
            fontSize: '16px',
            borderRadius: '1.55086px',
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

  return (
    <div className={style.approvalRecordsContainer}>
      <div className={style.historyTable}>
        <Table
          tableClass={style.tableHight}
          tableHeaderClass={style.tableHeaderClass}
          headingText={style.headingText}
          columns={ColumnsData}
          rows={RowsData.map((row) => ({
            ...row,
            action: (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ marginRight: '10px' }}>
                  <img src={deleteIcon} width={30} />
                </div>
                <div style={{ marginRight: '10px' }}>
                  <img src={view} width={30} />
                </div>
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
        />
      </div>
    </div>
  )
}

export default ApprovalRecords
