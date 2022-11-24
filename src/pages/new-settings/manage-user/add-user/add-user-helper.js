import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { setErrors } from '../../../../helper/index'
import { createNotification } from 'common/create-notification'
import SettingsService from 'services/settings-service'

export const AddUserHelper = ({
  setNewUser,
  singleUser,
  setEditIndex,
  getAllUsers,
}) => {
  const {
    register,
    handleSubmit,
    errors,
    control,
    watch,
    setError,
    clearErrors,
    reset,
  } = useForm()

  const [imgBlob, setImgBlob] = useState()
  const [base64, setBase64] = useState()
  const [btnLoader, setBtnLoader] = useState(false)

  useEffect(() => {
    setImgBlob(singleUser?.img?.file)
    reset({
      ...singleUser,
      roleId: singleUser?.role._id,
      employeeId: singleUser?.employeeId,
    })
  }, [singleUser])

  const onSubmit = async (data) => {
    setBtnLoader(true)
    try {
      const userData = {
        ...data,
        ...(watch()?.status === undefined && { status: false }),
        ...(watch()?.status === true && { status: true }),
        ...(base64 && { img: base64 }),
      }
      data?.employeeId === '' && delete userData?.employeeId

      if (singleUser) {
        const res = await SettingsService.updateUser(userData, singleUser?._id)
        if (res.status === 200) {
          setEditIndex(-1)
          getAllUsers()
        }
      } else {
        const res = await SettingsService.addUser(userData)
        if (res?.status === 200) {
          setNewUser(false)
          getAllUsers()
        }
      }
    } catch (err) {
      if (err?.response?.data?.error) {
        setErrors(err?.response?.data?.error, setError)
      } else {
        createNotification(
          'error',
          'Error',
          err?.response?.data?.msg || err?.response?.data?.message
        )
      }
      setBtnLoader(false)
    }
    setBtnLoader(false)
  }

  return {
    register,
    handleSubmit,
    clearErrors,
    control,
    onSubmit,
    imgBlob,
    setImgBlob,
    btnLoader,
    errors,
    setBase64,
  }
}
