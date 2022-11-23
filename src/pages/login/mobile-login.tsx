import { useState, Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Input from 'components/textfield'
import Button from 'components/button'
import { schema } from './login-helper'
import { LoginCredentials } from 'interfaces/login-credentials'

import eye from 'assets/eye.svg'
import logo from 'assets/sprintx.svg'
import style from './login.module.scss'

interface Props {
  handleLogin?: () => void
  openNotification?: boolean
  setOpenNotification?: Dispatch<SetStateAction<boolean>>
}

const MobileLogin = ({
  handleLogin,
  openNotification,
  setOpenNotification,
}: Props) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  })

  const [isLoading, setIsLoading] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)

  const onSubmit = async (data: LoginCredentials) => {
    handleLogin(data, setIsLoading)
  }

  return (
    <>
      <div className={style.opacityLogo}>
        <img src={logo} alt="" />
      </div>

      <div className={style.bg}>
        <div style={{ width: '100%' }}>
          <div className={style.logoDiv}>
            <img src={logo} alt="" />
          </div>
          {openNotification ? (
            <div className={style.popUpScreen}>
              <p>
                You are an inactive user. if you want to use erp please contact
                with your system admin.
              </p>
              <Button
                text="Go Back"
                handleClick={() => setOpenNotification(false)}
                btnClass={style.btnClass}
                btnTextClass={style.btnTextClass}
              />
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <h4>Log in Your Account</h4>
              <div className={style.loginDiv}>
                <Input
                  placeholder=" Your Employee Id or Email"
                  label="Your Employee Id or Email"
                  register={register}
                  name="employeeId"
                  error={errors?.employeeId}
                  errorMessage={errors?.employeeId?.message}
                />
                <div className={style.secondDiv}>
                  <Input
                    placeholder=" Your Password"
                    type={passwordVisible ? 'text' : 'password'}
                    label=" Your Password"
                    register={register}
                    icon={eye}
                    name="password"
                    error={errors?.password}
                    errorMessage={errors?.password?.message}
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    iconClass={style.iconClass}
                  />
                  <Link to={'/forgot'} style={{ textDecoration: 'none' }}>
                    <p>Forgot Password?</p>
                  </Link>
                </div>
              </div>
              <div className={style.logo}>
                <Button
                  text="LOG IN"
                  btnClass={style.btn}
                  isLoading={isLoading}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
export default MobileLogin
