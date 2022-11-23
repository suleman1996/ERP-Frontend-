import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Table from 'components/table';
import Switch from 'components/switch';
import AddUser from './add-user/index';
import DeletePopup from 'components/delete-modal';
import CardContainer from 'components/card-container';

import { ColumnsData, RowsData } from './helper';
import SettingsService from 'services/settings-service';

import dummy from 'assets/dummyPic.svg';
import style from './manage.module.scss';

const ManageUser = ({ newUser, setNewUser }) => {
  const { control } = useForm();

  const [deletePopUp, setDeletePopUp] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [customRoles, setCustomRoles] = useState();

  useEffect(() => {
    getCustomRoles();
  }, []);

  const getCustomRoles = async () => {
    const res = await SettingsService.getAllCustomRoles();
    setCustomRoles(res?.data?.customRoles);
  };

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
            image: (
              <div className={style.image}>
                <img src={dummy} />
              </div>
            ),
            status: (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Switch title={'Active'} name={'active'} control={control} />
              </div>
            ),
          }))}
          minWidth="1300px"
          headingText={style.columnText}
          handleDelete={(id) => {}}
          handleEducation={(index) => setEditIndex(index)}
          handleEdit={(id) => setEditIndex(id)}
          handleModalOpen={() => setDeletePopUp(true)}
        />
        {newUser && <AddUser setNewUser={setNewUser} customRoles={customRoles} />}
        <DeletePopup open={deletePopUp} setOpen={setDeletePopUp} handleDelete={undefined} />
      </div>
    </CardContainer>
  );
};

export default ManageUser;
