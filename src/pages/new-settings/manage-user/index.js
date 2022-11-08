import CardContainer from 'components/card-container';
import Table from 'components/table';
import React, { useState } from 'react';
import Tags from 'components/tags';
import DeletePopup from 'components/delete-modal';

import style from './manage.module.scss';
import { ColumnsData, RowsData } from './helper';
import Switch from 'components/switch';
import AddUser from './add-user/index';

const ManageUser = ({ newUser, setNewUser }) => {
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  return (
    <CardContainer className={style.card}>
      <div style={{ padding: '0 10px', paddingBottom: '60px' }}>
        <Table
          setNewUser={setNewUser}
          columns={ColumnsData}
          editIndex={editIndex}
          setEditIndex={setEditIndex}
          rows={RowsData.map((row) => ({
            ...row,
            image: <div className={style.image}></div>,
            status: (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Switch title={'Active'} />
              </div>
            ),
          }))}
          minWidth="1200px"
          headingText={style.columnText}
          handleDelete={(id) => console.log(id)}
          handleEducation={(index) => setEditIndex(index)}
          handleEdit={(id) => setEditIndex(id)}
          handleModalOpen={() => setDeletePopUp(true)}
        />
        {newUser && <AddUser setNewUser={setNewUser} />}
        <DeletePopup open={deletePopUp} setOpen={setDeletePopUp} handleDelete={undefined} />
      </div>
    </CardContainer>
  );
};

export default ManageUser;