import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import Table from 'components/table'
import Modal from 'components/modal'
import Switch from 'components/switch'
import Button from 'components/button'
import TextField from 'components/textfield'
import DeletePopup from 'components/delete-modal'
import CardContainer from 'components/card-container'
import Loading from 'components/loading'

import { ColumnsData } from './helper'
import { setErrors } from 'helper'
import SettingsService from 'services/settings-service'
import EmployeeService from 'services/employee-service'
import { createNotification } from 'common/create-notification'

import dummy from 'assets/avatar.jfif'
import eye from 'assets/setting-icons/eye.svg'
import eyeClose from 'assets/setting-icons/corss-eye.svg'
import style from './manage.module.scss'

const ManageUser = ({ newUser, setNewUser, setBtnHideShow }) => {
  const { control, register, handleSubmit, errors, clearErrors, setError } =
    useForm()

  const [deletePopUp, setDeletePopUp] = useState(false)
  const [isFilter, setIsFilter] = useState(false)
  const [resetPopUp, setResetPopUp] = useState(false)
  const [newPasswordEye, setNewPasswordEye] = useState(false)
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false)
  const [resetId, setResetId] = useState()
  const [btnLoader, setBtnLoader] = useState(false)
  const [editIndex, setEditIndex] = useState(-1)
  const [customRoles, setCustomRoles] = useState()
  const [allIDs, setAllIDs] = useState()
  const [allUsers, setAllUsers] = useState([])
  const [singleUser, setSingleUser] = useState()
  const [loader, setLoader] = useState(false)

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
    setLoader(true)
    const res = await SettingsService.getUserById(id)
    setSingleUser(res?.data?.user)
    setLoader(false)
  }

  const handleDeleteClick = async () => {
    setBtnLoader(true)

    if (allUsers.find((item) => item._id === editIndex).status) {
      createNotification('error', 'Error', 'Active User Cannot Be Deleted!')
    } else {
      const res = await SettingsService.deleteUser(editIndex)
      if (res.status === 200) {
        setEditIndex(-1)
        setDeletePopUp(false)
        setBtnLoader(false)
        getAllUsers()
        setBtnLoader(false)
      }
    }
    setBtnLoader(false)
  }

  const handleSwitch = async (id, item) => {
    setLoader(true)
    const res = await SettingsService.switchUser(id, item)
    if (res.status === 200) {
      getAllUsers()
    }
    setLoader(false)
  }

  const onSubmit = async (data) => {
    setBtnLoader(true)
    try {
      const res = await SettingsService.resetPasswordAdmin(resetId, data)
      if (res.status === 200) {
        setResetPopUp(false)
        getAllUsers()
        createNotification('success', 'Success', res?.data?.msg)
      }
    } catch (err) {
      if (err.response?.data?.error) {
        setErrors(err.response.data.error, setError)
      }
      setBtnLoader(false)
    }
    setBtnLoader(false)
  }

  const filterSubmit = async (data) => {
    setLoader(true)
    const result = await SettingsService.getUsers({
      sortBy:
        isFilter === 1
          ? 'name'
          : isFilter === 2
          ? 'email'
          : isFilter === 3
          ? 'role'
          : isFilter === 4
          ? 'employeeId'
          : '',
      ...(isFilter === 1 && { name: data?.name && data?.name }),
      ...(isFilter === 2 && { email: data?.name && data?.name }),
      ...(isFilter === 3 && { role: data?.name && data?.name }),
      ...(isFilter === 4 && { employeeId: data?.name && data?.name }),
      ...(data?.asc && { sort: data?.asc }),
    })

    if (result.status === 200) {
      setIsFilter(-1)
      setAllUsers(result?.data?.users)
    }
    setLoader(false)
  }

  return (
    <>
      {loader && (
        <div className={style.loaderDiv}>
          <Loading loaderClass={style.loadingStyle} />
        </div>
      )}
      <CardContainer className={style.card}>
        <div style={{ padding: '0 10px', paddingBottom: '60px' }}>
          <Table
            loader={loader}
            newUser={newUser}
            setBtnHideShow={setBtnHideShow}
            onSubmit={filterSubmit}
            getAllUsers={getAllUsers}
            allUsers={allUsers}
            singleUser={singleUser}
            setNewUser={setNewUser}
            customRoles={customRoles}
            allIDs={allIDs}
            columns={ColumnsData}
            editIndex={editIndex}
            isFilter={isFilter}
            setIsFilter={setIsFilter}
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
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}
                >
                  <Switch
                    title={row?.status ? 'Active' : 'Inactive'}
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
            handleResetIconClick={(id) => {
              setResetPopUp(true)
              setResetId(id)
            }}
          />
          <DeletePopup
            open={deletePopUp}
            setOpen={setDeletePopUp}
            handleDelete={() => handleDeleteClick()}
            isLoading={btnLoader}
          />
          <Modal
            open={resetPopUp}
            handleClose={() => setResetPopUp(false)}
            className={style.modalParent}
          >
            <form
              onSubmit={(e) => {
                clearErrors()
                handleSubmit(onSubmit)(e)
              }}
            >
              <div className={style.modalWraper}>
                <h2>Reset Password</h2>
                <TextField
                  placeholder="Enter new password"
                  label="New Password"
                  name={'password'}
                  errorMessage={errors?.password?.message}
                  register={register}
                  type={newPasswordEye ? 'text' : 'password'}
                  icon={newPasswordEye ? eye : eyeClose}
                  onClick={() => setNewPasswordEye(!newPasswordEye)}
                />
                <TextField
                  placeholder="Enter confirm password"
                  label="Confirm Password"
                  name={'confirmPassword'}
                  errorMessage={errors?.confirmPassword?.message}
                  register={register}
                  type={confirmPasswordEye ? 'text' : 'password'}
                  icon={confirmPasswordEye ? eye : eyeClose}
                  onClick={() => setConfirmPasswordEye(!confirmPasswordEye)}
                />
                <div className={style.modalBtnSection}>
                  <Button
                    type="button"
                    text="Cancel"
                    btnClass={style.cancelBtn}
                    btnTextClass={style.CancelBtnText}
                    handleClick={() => setResetPopUp(false)}
                  />
                  <Button
                    type="submit"
                    text="Save Password"
                    btnClass={style.saveBtn}
                    isLoading={btnLoader}
                  />
                </div>
              </div>
            </form>
          </Modal>
        </div>
      </CardContainer>
    </>
  )
}

export default ManageUser
