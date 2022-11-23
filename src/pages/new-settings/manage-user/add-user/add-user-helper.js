import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { setErrors } from '../../../../helper/index'
import { createNotification } from 'common/create-notification'
import SettingsService from 'services/settings-service'

export const AddUserHelper = ({ setNewUser }) => {
  const {
    register,
    handleSubmit,
    errors,
    control,
    watch,
    setError,
    clearErrors,
  } = useForm()

  const [imgBlob, setImgBlob] = useState()
  const [base64, setBase64] = useState()
  const [btnLoader, setBtnLoader] = useState(false)

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
      const res = await SettingsService.addUser(userData)
      if (res?.status === 200) {
        setNewUser(false)
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
