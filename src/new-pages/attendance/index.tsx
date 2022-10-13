/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';

import Button from 'new-components/button';
import CardContainer from 'components/card-container';
import Table from 'new-components/table';
import MenuPopup from 'new-components/menu-popup';
import Tags from 'new-components/tags';
import DeletePopup from 'new-components/delete-modal';
import Modal from 'new-components/modal';

import { ColumnsData } from './columns-data';
import { Colors } from './columns-data';
import { RowsData } from './columns-data';

import plusIcon from 'assets/mobile-view/plusIcon.svg';
import exportIcon from 'assets/export.svg';

import style from './attendance.module.scss';

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
const Attendance = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [attendanceModal, setAttendanceModal] = useState(false);

  const AttendanceForm = () => {
    return (
      <>
        <p>Form</p>
      </>
    );
  };

  return (
    <>
      <div className={style.topDiv}>
        <div style={{ position: 'relative' }}>
          <Button
            text="Export"
            iconStart={exportIcon}
            btnClass={style.btnClass}
            className={style.className}
            handleClick={() => setOpenMenu(!openMenu)}
          />
          {openMenu && <MenuPopup handleExcel={undefined} handlePdf={undefined} />}
        </div>
        <Button
          text="Add Attendence"
          iconStart={plusIcon}
          handleClick={() => setAttendanceModal(true)}
        />
      </div>

      <CardContainer containerClass={style.container}>
        <div className={style.div}>
          <p className={style.p}>Summary</p>
          <p className={style.attendance}>Attendence Details</p>
        </div>
        <div style={{ padding: '0 10px' }}>
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
            handleDelete={() => setDeletePopUp(true)}
          />
        </div>
      </CardContainer>

      <DeletePopup open={deletePopUp} setOpen={setDeletePopUp} handleDelete={undefined} />
      <Modal
        open={attendanceModal}
        text="Done"
        iconEnd={undefined}
        title="Add Attendence"
        handleClose={() => setAttendanceModal(!attendanceModal)}
        handleClick={() => undefined}
        children={<AttendanceForm />}
      />
    </>
  );
};
export default Attendance;
