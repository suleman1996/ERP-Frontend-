import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import TextField from 'components/textfield'
import Button from 'components/button'

import AuthService from 'services/auth-service'
import { setErrors } from 'helper'
import { createNotification } from 'common/create-notification'

import eye from 'assets/eye.svg'
import logo from 'assets/sprintx.svg'
import style from './reset-password.module.scss'

const MobileResetPassword = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

  const navigate = useNavigate()
  const search = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, errors, setError } = useForm()

  const onSubmit = async ({
    password,
    confirmPassword,
  }: {
    password: string
    confirmPassword: string
  }) => {
    setIsLoading(true)
    try {
      const data = { password, confirmPassword, otp: search[0].get('otp') }
      const res = await AuthService.resetPassword(data)
      if (res?.status === 200) {
        navigate('/login')
        setIsLoading(false)
      }
    } catch (err: any) {
      if (err?.response?.data?.msg?.includes('Expired')) {
        createNotification('error', 'Error', err?.response?.data?.msg)
      }
      if (err?.response?.data?.error) {
        setErrors(err?.response?.data?.error, setError)
      }
    }
    setIsLoading(false)
  }

  return (
    <>
      <div className={style.bg}>
        <div className={style.logo}>
          <img src={logo} alt="" />
        </div>
        <h4>Reset Password</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.loginDiv}>
            <TextField
              placeholder="New Password"
              label="New Password"
              type={passwordVisible ? 'text' : 'password'}
              name="password"
              register={register}
              errorMessage={errors?.password?.message}
              icon={eye}
              onClick={() => setPasswordVisible((prev) => !prev)}
            />
            <div className={style.secondDiv}>
              <TextField
                placeholder="Confirm Password"
                type={confirmPasswordVisible ? 'text' : 'password'}
                label="Confirm Password"
                name="confirmPassword"
                register={register}
                errorMessage={errors?.confirmPassword?.message}
                icon={eye}
                onClick={() => setConfirmPasswordVisible((prev) => !prev)}
              />
            </div>
          </div>
          <div className={style.logo}>
            <Button text="DONE" btnClass={style.btn} isLoading={isLoading} />
          </div>
        </form>
      </div>
    </>
  )
}
export default MobileResetPassword
