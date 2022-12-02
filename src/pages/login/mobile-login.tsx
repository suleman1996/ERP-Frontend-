import { Dispatch, SetStateAction, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import Input from 'components/textfield'
import Button from 'components/button'

import { setErrors } from 'helper'
import { useAppDispatch } from 'store/hooks'
import AuthService from 'services/auth-service'
import { setCurrentUser, setToken, setUserId } from 'store'
import { createNotification } from 'common/create-notification'
import { LoginCredentials } from 'interfaces/login-credentials'

import eye from 'assets/eye.svg'
import logo from 'assets/sprintx.svg'
import style from './login.module.scss'

interface Props {
  handleLogin?: () => void
  openNotification?: boolean
  setOpenNotification?: Dispatch<SetStateAction<boolean>>
  register?: any
  handleSubmit?: any
  errors?: string
}

const MobileLogin = ({ openNotification, setOpenNotification }: Props) => {
  const { setError, register, handleSubmit, errors } = useForm()
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onSubmit = async (data: LoginCredentials) => {
    handleLogin(data, setIsLoading)
  }

  const handleLogin = async (
    data: Props,
    setIsLoading: Dispatch<SetStateAction<boolean>>
  ) => {
    setIsLoading(true)
    try {
      const res = await AuthService.login(data)
      if (res.status === 200) {
        if (res.data.status) {
          setIsLoading(false)
          dispatch(setCurrentUser(res.data))
          dispatch(setToken(res.headers.authorization))
          dispatch(setUserId(res.data.id))
          navigate('/')
        }
      } else {
        createNotification('error', 'Error', 'Please Enter Valid Credentials')
        setIsLoading(false)
      }

      if (res.status === 404) {
        setOpenNotification(true)
      }
    } catch (err) {
      if (err?.response?.data?.error) {
        setErrors(err?.response?.data?.error, setError)
      }
      if (err?.response?.status === 404) {
        if (
          err?.response?.data?.msg?.includes('Invalid') ||
          err?.response?.data?.msg?.includes('email')
        ) {
          createNotification('error', 'Error', err?.response?.data?.msg)
        } else {
          setOpenNotification(true)
        }
      }
      setIsLoading(false)
    }
    setIsLoading(false)
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
