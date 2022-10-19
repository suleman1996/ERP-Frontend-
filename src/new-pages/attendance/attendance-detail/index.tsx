/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';

import Table from 'new-components/table';
import Tags from 'new-components/tags';
import DeletePopup from 'new-components/delete-modal';

import { ColumnsData } from '../columns-data';
import { Colors } from '../columns-data';
import { RowsData } from '../columns-data';

import style from './attendance-detail.module.scss';

export interface AttendanceInt {
  id: string;
  date: string;
  employeeId: string;
  loginTime: string;
  logoutTime: string;
  name: string;
  status: string;
  totalHours: string;
}

interface Props {
  setActive: any;
}

const AttendanceDetail = ({ setActive }: Props) => {
  const [deletePopUp, setDeletePopUp] = useState(false);

  return (
    <>
      <div style={{ padding: '0 10px', paddingBottom: '60px' }}>
        <Table
          columns={ColumnsData}
          rows={RowsData.map((row) => ({
            ...row,
            status: (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    borderRadius: 10,
                    background: Colors[row.status],
                    borderWidth: 1,
                    height: 10,
                    width: 10,
                    marginRight: 10,
                  }}
                />
                <span style={{ color: Colors[row.status] }} className={style.statusText}>
                  {row.status}
                </span>
              </div>
            ),
            checkin: (
              <span style={{ color: row.checkin === '12:00 AM' ? 'red' : 'black' }}>
                {row.checkin}
              </span>
            ),
            tags: <Tags tagsTextArr={[row.tags]} />,
          }))}
          minWidth="2050px"
          headingText={style.columnText}
          handleDelete={(id) => console.log(id)}
          handleEducation={() => setActive(3)}
          handleEdit={(id) => console.log(id)}
          handleModalOpen={() => setDeletePopUp(true)}
        />
        <DeletePopup open={deletePopUp} setOpen={setDeletePopUp} handleDelete={undefined} />
      </div>
    </>
  );
};
export default AttendanceDetail;
