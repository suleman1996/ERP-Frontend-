import { useState } from 'react'
import { useForm } from 'react-hook-form'

export const AddUserHelper = () => {
  const [imgBlob, setImgBlob] = useState()
  const { register, handleSubmit, control, clearErrors } = useForm()

  const onSubmit = () => {
    return
  }

  return {
    register,
    handleSubmit,
    clearErrors,
    control,
    onSubmit,
    imgBlob,
    setImgBlob,
  }
}
