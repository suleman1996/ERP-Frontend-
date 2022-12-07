import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import SettingsService from 'services/settings-service'
import { setErrors } from 'helper/index'
import { createNotification } from 'common/create-notification'
import { convertBase64Image } from 'main-helper'

export const AddUserHelper = ({
  setNewUser,
  singleUser,
  setEditIndex,
  getAllUsers,
  setBtnHideShow,
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
  const [btnToggle, setBtnToggle] = useState(false)
  const [singleStatus, setSingleStatus] = useState()

  useEffect(() => {
    setImgBlob(singleUser?.img?.file)
    setSingleStatus(singleUser?.status)
    reset({
      ...singleUser,
      roleId: { value: singleUser?.role?._id, label: singleUser?.role?.name },
      employeeId: {
        value: singleUser?.employeeId,
        label: singleUser?.employeeId,
      },
    })
  }, [singleUser])

  const handleChange = async (e) => {
    const url = URL.createObjectURL(e.target.files[0])
    const base64 = await convertBase64Image(e.target.files[0])
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i
    if (!allowedExtensions.exec(e.target.value)) {
      setBase64('')
      setImgBlob('')
      createNotification('error', 'Error', 'Invalid type')
      return false
    }
    if (e.target.files[0].size / 1024 / 1024 > 3) {
      setBase64('')
      setImgBlob('')
      createNotification(
        'error',
        'Error',
        'File size shoulde be equal or less than 3mb'
      )
    } else {
      setBase64(base64)
      setImgBlob(url)
    }
  }

  const onSubmit = async (data) => {
    setBtnLoader(true)
    const userData = {
      ...data,
      roleId: data?.roleId?.value,
      employeeId: data?.employeeId?.label,
      ...(watch()?.status === undefined && { status: false }),
      ...(watch()?.status === true && { status: true }),
      ...(base64 && { img: base64 }),
    }
    data?.employeeId === '' && delete userData?.employeeId
    try {
      if (singleUser) {
        const res = await SettingsService.updateUser(userData, singleUser?._id)
        if (res.status === 200) {
          setEditIndex(-1)
          getAllUsers()
          createNotification('success', 'Success', res?.data?.msg)
        }
      } else {
        const res = await SettingsService.addUser(userData)
        if (res?.status === 200) {
          setNewUser(false)
          getAllUsers()
          setBtnHideShow(false)
        }
      }
    } catch (err) {
      if (err?.response?.status === 400) {
        setBtnHideShow && setBtnHideShow(false)
        setImgBlob('')
        setBase64('')
      }
      if (err?.response?.data?.error) {
        setErrors(err?.response?.data?.error, setError)
        setBtnHideShow && setBtnHideShow(false)
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
    btnToggle,
    setBtnToggle,
    handleChange,
    singleStatus,
  }
}
