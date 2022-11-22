import { useState } from 'react'
import { useForm } from 'react-hook-form'

import Table from 'components/table'
import Switch from 'components/switch'
import AddUser from './add-user/index'
import DeletePopup from 'components/delete-modal'
import CardContainer from 'components/card-container'

import { ColumnsData, RowsData } from './helper'

import style from './manage.module.scss'
import dummy from 'assets/dummyPic.svg'

const ManageUser = ({ newUser, setNewUser }) => {
  const [deletePopUp, setDeletePopUp] = useState(false)
  const [editIndex, setEditIndex] = useState(-1)
  const { control } = useForm()

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
          handleEducation={(index) => setEditIndex(index)}
          handleEdit={(id) => setEditIndex(id)}
          handleModalOpen={() => setDeletePopUp(true)}
        />
        {newUser && <AddUser setNewUser={setNewUser} />}
        <DeletePopup
          open={deletePopUp}
          setOpen={setDeletePopUp}
          handleDelete={undefined}
        />
      </div>
    </CardContainer>
  )
}

export default ManageUser
