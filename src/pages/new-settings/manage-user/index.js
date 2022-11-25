import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import Table from 'components/table'
import Switch from 'components/switch'
import AddUser from './add-user/index'
import DeletePopup from 'components/delete-modal'
import CardContainer from 'components/card-container'

import { ColumnsData } from './helper'
import SettingsService from 'services/settings-service'
import EmployeeService from 'services/employee-service'

import dummy from 'assets/dummyPic.svg'
import style from './manage.module.scss'

const ManageUser = ({ newUser, setNewUser }) => {
  const { control } = useForm()

  const [deletePopUp, setDeletePopUp] = useState(false)
  const [btnLoader, setBtnLoader] = useState(false)
  const [editIndex, setEditIndex] = useState(-1)
  const [customRoles, setCustomRoles] = useState()
  const [allIDs, setAllIDs] = useState()
  const [allUsers, setAllUsers] = useState([])
  const [singleUser, setSingleUser] = useState()

  useEffect(() => {
    getCustomRoles()
    getAllIds()
    getAllUsers()
  }, [])

  const getAllUsers = async () => {
    const result = await SettingsService.getUsers()
    setAllUsers(result?.data?.users)
  }

  const getAllIds = async () => {
    const result = await EmployeeService.getOnlyEmployees()
    setAllIDs(result?.data)
  }

  const getCustomRoles = async () => {
    const res = await SettingsService.getAllCustomRoles()
    setCustomRoles(res?.data?.customRoles)
  }

  const editHandler = async (id) => {
    const res = await SettingsService.getUserById(id)
    setSingleUser(res?.data?.user)
  }

  const handleDeleteClick = async () => {
    setBtnLoader(true)
    const res = await SettingsService.deleteUser(editIndex)
    if (res.status === 200) {
      setEditIndex(-1)
      setDeletePopUp(false)
      setBtnLoader(false)
      getAllUsers()
    }
  }

  const handleSwitch = async (id, item) => {
    const res = await SettingsService.switchUser(id, item)
    if (res.status === 200) {
      getAllUsers()
    }
  }

  return (
    <CardContainer className={style.card}>
      <div style={{ padding: '0 10px', paddingBottom: '60px' }}>
        <Table
          getAllUsers={getAllUsers}
          singleUser={singleUser}
          setNewUser={setNewUser}
          customRoles={customRoles}
          allIDs={allIDs}
          columns={ColumnsData}
          editIndex={editIndex}
          setEditIndex={setEditIndex}
          rows={allUsers?.map((row) => ({
            ...row,
            rolee: row.role[0].name,
            id: row?.employeeId ? row?.employeeId : '---',
            image: (
              <div className={style.image}>
                <img
                  src={row?.img[0]?.file ? row?.img[0]?.file : dummy}
                  style={{ borderRadius: '50%' }}
                />
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
                <Switch
                  title={'Active'}
                  name={'active'}
                  control={control}
                  checked={row?.status}
                  handleClick={() => handleSwitch(row?._id, row)}
                />
              </div>
            ),
          }))}
          minWidth="1300px"
          headingText={style.columnText}
          handleEducation={(index) => setEditIndex(index)}
          handleDelete={(id) => setEditIndex(id)}
          handleEdit={(id) => {
            setEditIndex(id)
            editHandler(id)
          }}
          handleModalOpen={() => setDeletePopUp(true)}
        />
        {newUser && (
          <AddUser
            setNewUser={setNewUser}
            customRoles={customRoles}
            allIDs={allIDs}
            getAllUsers={getAllUsers}
          />
        )}
        <DeletePopup
          open={deletePopUp}
          setOpen={setDeletePopUp}
          handleDelete={() => handleDeleteClick()}
          btnLoader={btnLoader}
        />
      </div>
    </CardContainer>
  )
}

export default ManageUser
