import React, { Dispatch, SetStateAction, useState } from 'react'
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
  getAllCustomRoles?: () => void | undefined
  roleId?: string | number
}

const AddRole = ({
  setNewUser,
  setEditIndex,
  getAllCustomRoles,
  roleId,
}: Props) => {
  console.log('role id  : ', roleId)
  const { register, handleSubmit, errors, setError, clearErrors } = useForm()

  const [btnLoader, setBtnLoader] = useState(false)

  const onSubmit = async (data: { name: string }) => {
    try {
      setBtnLoader(true)
      console.log(data)
      const newData = {
        ...data,
        accessLevelId: ['636521f2313a951a49f7d594'],
      }
      const res = await SettingsService.addCustomRole(newData)
      if (res?.status === 200) {
        getAllCustomRoles()
      }
      setNewUser && setNewUser(false)
      setBtnLoader(false)
    } catch (err: any) {
      setBtnLoader(false)
      if (err?.response?.data?.error) {
        setErrors(err?.response?.data?.error, setError)
      } else {
        createNotification('error', 'Error', err?.response?.msg)
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
            text="Add Role"
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
