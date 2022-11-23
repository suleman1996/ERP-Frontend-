import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import Button from 'components/button'
import Input from 'components/textfield'
import ImageUpload from 'components/image-upload'
import CardContainer from 'components/card-container'
import NotificationPopup from 'components/notification-popup'

import { setErrors } from './../../../helper/index'
import { createNotification } from 'common/create-notification'
import SettingsService from 'services/settings-service'

import eye from 'assets/eye.svg'
import eyeCross from 'assets/eyeCross.svg'
import pencilIcon from 'assets/edit-icon.svg'
import style from './account.module.scss'

const AccountSetting = () => {
  const userData = useSelector((state) => state?.app?.currentUser)
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    errors,
    watch,
  } = useForm()

  const [img, setImg] = useState('')
  const [newpass, setNewPass] = useState(false)
  const [btnLoader, setBtnLoader] = useState(false)
  const [confirmNewpass, setConfirmNewPass] = useState(false)
  const [notificationPopup, setNotificationPopUP] = useState(false)

  useEffect(() => {
    setImg(userData?.img)
    reset({ name: userData?.name, email: userData.email })
  }, [])

  const onSubmit = async (data) => {
    setBtnLoader(true)
    try {
      let newData = {
        name: data?.name,
        email: data?.email,
        ...(watch('newPassword') && { newPassword: data?.newPassword }),
        ...(watch('confirmPassword') && {
          confirmPassword: data?.confirmPassword,
        }),
        ...(img && { img }),
        _id: userData?.id,
      }
      const res = await SettingsService.updateAccount(newData)
      if (res.status === 201) {
        if (res.data.emailSent === true) {
          setNotificationPopUP(true)
        }
      }
    } catch (err) {
      if (err?.response?.data?.error) {
        setErrors(err?.response?.data?.error, setError)
      } else {
        createNotification('error', 'Error', err?.response?.data?.message)
      }
      setBtnLoader(false)
    }
    setBtnLoader(false)
  }

  const resendEmail = async () => {
    const res = await SettingsService.resendEmail()
    if (res.status === 201) {
      createNotification('success', 'Success', res?.data?.msg)
      setNotificationPopUP(false)
    }
  }

  return (
    <>
      <NotificationPopup
        plainText={'Please verify your email. Didn’t receive an email?'}
        hyperlink={' Resend confirmation '}
        open={notificationPopup}
        handleClick={resendEmail}
      />
      <CardContainer className={style.card}>
        <form
          onSubmit={(e) => {
            clearErrors()
            handleSubmit(onSubmit)(e)
          }}
        >
          <ImageUpload
            name={'profilePicture'}
            img={img}
            setImg={setImg}
            accountSetting
            btnText="Remove Photo"
          />
          <div className={style.customInputs}>
            <Input
              label={'Name'}
              name={'name'}
              errorMessage={errors?.name?.message}
              placeholder={'Enter name'}
              register={register}
              icon={pencilIcon}
              iconClass={style.iconClass}
            />
            <Input
              label={'Email'}
              name={'email'}
              errorMessage={errors?.email?.message}
              placeholder={'Enter email'}
              register={register}
              icon={pencilIcon}
              iconClass={style.iconClass}
            />
            <Input
              label={'New Password'}
              name={'newPassword'}
              errorMessage={errors?.newPassword?.message}
              type={newpass ? 'text' : 'password'}
              placeholder={'Enter new password'}
              icon={newpass ? eye : eyeCross}
              iconClass={style.iconClass}
              onClick={() => setNewPass(!newpass)}
              register={register}
            />
            <Input
              label={'Confirm Password'}
              name={'confirmPassword'}
              errorMessage={errors?.confirmPassword?.message}
              type={confirmNewpass ? 'text' : 'password'}
              placeholder={'Enter confirm password'}
              icon={confirmNewpass ? eye : eyeCross}
              iconClass={style.iconClass}
              onClick={() => setConfirmNewPass(!confirmNewpass)}
              register={register}
            />
          </div>

          <div className={style.btnClass}>
            <Button text="Save Changes" type="submit" isLoading={btnLoader} />
          </div>
        </form>
      </CardContainer>
    </>
  )
}

export default AccountSetting
