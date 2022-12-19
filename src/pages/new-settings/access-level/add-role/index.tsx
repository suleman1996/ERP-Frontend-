import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import Input from 'components/textfield'
import Button from 'components/button'

import { setErrors } from 'helper'
import SettingsService from 'services/settings-service'
import { createNotification } from 'common/create-notification'

import style from './role.module.scss'
interface Props {
  setNewUser?: Dispatch<SetStateAction<boolean>>
  setEditIndex?: Dispatch<SetStateAction<number>>
  setRoleId?: Dispatch<SetStateAction<number | undefined>>
  getAllCustomRoles?: () => void | undefined
  allCustomRoles?: () => void | undefined
  roleId?: string | number
}

const AddRole = ({
  setNewUser,
  setEditIndex,
  getAllCustomRoles,
  roleId,
  setRoleId,
  allCustomRoles,
}: Props) => {
  const { register, handleSubmit, errors, setError, clearErrors, reset } =
    useForm()

  const [btnLoader, setBtnLoader] = useState(false)

  useEffect(() => {
    const result = allCustomRoles?.find((item) => item?._id === roleId)
    reset({ name: result?.name })
  }, [roleId])

  const onSubmit = async (data: { name: string }) => {
    try {
      setBtnLoader(true)
      const newData = {
        ...data,
        accessLevelId: ['636521f2313a951a49f7d594'],
      }
      if (roleId) {
        const res = await SettingsService.updateRole(roleId, newData)
        if (res?.status === 200) {
          getAllCustomRoles && getAllCustomRoles()
          setRoleId && setRoleId(-1)
          setEditIndex && setEditIndex(-1)
        }
      } else {
        const res = await SettingsService.addCustomRole(newData)
        if (res?.status === 200) {
          getAllCustomRoles && getAllCustomRoles()
          setEditIndex && setEditIndex(-1)
        }
      }

      setNewUser && setNewUser(false)
      setBtnLoader(false)
    } catch (err: any) {
      setBtnLoader(false)
      if (err?.response?.data?.error) {
        setErrors(err?.response?.data?.error, setError)
      } else {
        createNotification('error', 'Error', err?.response?.data?.msg)
      }
    }
    setBtnLoader(false)
  }

  return (
    <form
      onSubmit={(e) => {
        clearErrors()
        handleSubmit(onSubmit)(e)
      }}
    >
      <div className={style.newUserParent}>
        <Input
          name={'name'}
          placeholder={'Enter new role'}
          iconClass={style.iconClass}
          container={style.containerClassInput}
          register={register}
          errorMessage={errors?.name?.message}
        />
        <div className={style.btnSection}>
          <Button
            text="Cancel"
            type="button"
            btnClass={style.btnClassCancel}
            btnTextClass={style.btnTextClassCancel}
            handleClick={() => {
              setNewUser && setNewUser(false)
              setEditIndex && setEditIndex(-1)
            }}
          />
          <Button
            text={roleId ? 'Save' : 'Add Role'}
            type="submit"
            btnClass={style.btnClass}
            isLoading={btnLoader}
          />
        </div>
      </div>
    </form>
  )
}

export default AddRole
