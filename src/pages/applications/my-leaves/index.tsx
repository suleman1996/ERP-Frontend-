import Table from 'components/table';
import style from './index.module.scss';

import editIcon from 'assets/table-edit.svg';
import view from 'assets/viewIconnew.svg';
import deleteIcon from 'assets/table-delete.svg';
import Button from 'components/button';
import Pagination from 'components/pagination';
import { useState } from 'react';

const RowsData = [
  {
    leaveType: '12/10/2022',
    total: 'SRX001',
    remaining: 'uiqwkjasopkdjb',
  },
  {
    leaveType: '12/10/2022',
    total: 'SRX001',
    remaining: 'uiqwkjasopkdjb',
  },
  {
    leaveType: '12/10/2022',
    total: 'SRX001',
    remaining: 'uiqwkjasopkdjb',
  },
];
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
];
const RowsData1 = [
  {
    leaveType: 'Casual',
    appliedOn: 'SRX001',
    from: '35635',
    to: '234',
    duration: '12332',
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
    leaveType: 'Casual',
    appliedOn: 'SRX001',
    from: '35635',
    to: '234',
    duration: '12332',
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
    leaveType: 'Casual',
    appliedOn: 'SRX001',
    from: '35635',
    to: '234',
    duration: '12332',
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
    leaveType: 'Casual',
    appliedOn: 'SRX001',
    from: '35635',
    to: '234',
    duration: '12332',
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
    leaveType: 'Casual',
    appliedOn: 'SRX001',
    from: '35635',
    to: '234',
    duration: '12332',
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
    leaveType: 'Casual',
    appliedOn: 'SRX001',
    from: '35635',
    to: '234',
    duration: '12332',
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
];
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
    width: '150px',
  },
  {
    key: 'to',
    name: 'To',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'duration',
    name: 'Duration',
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
];

const MyLeaves = () => {
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState();
  const [page, setPage] = useState(1);
  return (
    <div className={style.container}>
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
                <Button text="Apply Now" btnClass={style.btnClass} />{' '}
              </div>
            ),
          }))}
          minWidth="700px"
          handleDelete={(id) => console.log(id)}
        />
      </div>
      <div className={style.historyTable}>
        <Table
          tableClass={style.tableHight}
          tableHeaderClass={style.tableHeaderClass}
          headingText={style.headingText}
          columns={ColumnsData1}
          rows={RowsData1.map((row) => ({
            ...row,
            action: (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ marginRight: '10px' }}>
                  <img src={editIcon} width={30} />
                </div>
                <div style={{ marginRight: '10px' }}>
                  <img src={deleteIcon} width={30} />
                </div>
                <div style={{ marginRight: '10px' }}>
                  <img src={view} width={30} />
                </div>
              </div>
            ),
            // status: (
            //   <div
            //     style={{
            //       display: 'flex',
            //       justifyContent: 'center',
            //       alignItems: 'center',
            //     }}
            //   >
            //     {/* <Switch title={'Active'} /> */}
            //   </div>
            // ),
          }))}
          minWidth="700px"
          handleDelete={(id) => console.log(id)}
          //   handleModalOpen={() => setDeletePopUp(true)}
          //   handleEdit={handleEdit && handleEdit}
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
  );
};

export default MyLeaves;
