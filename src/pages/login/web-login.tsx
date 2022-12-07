import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import Loading from 'components/loading'
import Button from 'components/button'

import { LoginCredentials } from 'interfaces/login-credentials'
import { createNotification } from 'common/create-notification'
import { useAppDispatch } from 'store/hooks'
import AuthService from 'services/auth-service'
import { setCurrentUser, setToken, setUserId } from 'store'
import { setErrors } from 'helper'

import LogoImage from 'assets/logo.svg'
import eye from 'assets/employee-page/eye.svg'
import eyeClose from 'assets/employee-page/eyeClose.svg'
import style from './login.module.scss'

interface Props {
  employeeId?: string
  password?: string
}

const WebLogin = ({ openNotification, setOpenNotification }: any) => {
  const navigate = useNavigate()
  const { setError, register, handleSubmit, errors } = useForm()
  const dispatch = useAppDispatch()

  const [isLoading, setIsLoading] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)

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
          err?.response?.data?.msg?.includes('email') ||
          err?.response?.data?.msg?.includes('exists')
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
    <div className={style.loginMain}>
      <div className={style.loginOverlay}>
        <div className={style.loginCardParent}>
          <div className={style.loginCard}>
            {openNotification ? (
              <div className={style.popUpScreen}>
                <p>
                  You are an inactive user. if you want to use erp please
                  contact with your system admin.
                </p>
                <Button
                  text="Go Back"
                  handleClick={() => setOpenNotification(false)}
                  btnClass={style.btnClass}
                  btnTextClass={style.btnTextClass}
                />
              </div>
            ) : (
              <div className={style.loginContent}>
                <div>
                  <img src={LogoImage} width="110px" alt="logo" />
                  <span className={style.loginTitle}>Log in Your Account</span>
                  <form
                    className={style.loginForm}
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div>
                      <label
                        className={style.loginLabel}
                        style={{
                          color: '#dcdcdc',
                        }}
                      >
                        Your Employee Id or Email
                        <input
                          type="text"
                          style={{
                            color: errors?.employeeId ? '#ff5050' : 'white',
                            borderColor: errors?.employeeId
                              ? '#ff5050'
                              : 'gray',
                          }}
                          className={style.loginInput}
                          name="employeeId"
                          placeholder="Enter Employee Id or Email"
                          ref={register}
                          {...register('employeeId')}
                        />
                      </label>
                    </div>
                    {errors?.employeeId?.message && (
                      <span style={{ color: '#ff2020', fontSize: '12px' }}>
                        {errors?.employeeId?.message}
                      </span>
                    )}

                    <div style={{ marginTop: '.5rem', position: 'relative' }}>
                      <label
                        className={style.loginLabel}
                        style={{
                          color: '#dcdcdc',
                        }}
                      >
                        Your Password
                        <input
                          type={passwordVisible ? 'text' : 'password'}
                          style={{
                            borderColor: errors?.employeeId
                              ? '#ff5050'
                              : 'gray',
                          }}
                          className={style.loginInput}
                          name="password"
                          placeholder={'Enter password'}
                          ref={register}
                        />
                        {passwordVisible ? (
                          <img
                            src={eyeClose}
                            alt=""
                            className={style.img}
                            onClick={() =>
                              setPasswordVisible((prev: any) => !prev)
                            }
                          />
                        ) : (
                          <img
                            src={eye}
                            alt=""
                            className={style.img}
                            onClick={() =>
                              setPasswordVisible((prev: any) => !prev)
                            }
                          />
                        )}
                      </label>
                    </div>
                    {errors?.password && (
                      <span
                        style={{
                          whiteSpace: 'pre-line',
                          color: '#ff2020',
                          fontSize: '12px',
                        }}
                      >
                        {errors?.password?.message}
                      </span>
                    )}
                    <div className={style.loginFPassContainer}>
                      <span
                        className={style.loginForgetPass}
                        onClick={() => navigate('/forgot')}
                      >
                        Forgot Password
                      </span>
                    </div>
                    <button
                      type="submit"
                      className={style.loginSubmit}
                      disabled={isLoading || false}
                      style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
                    >
                      {isLoading ? (
                        <Loading loaderClass={style.btnLoader} />
                      ) : (
                        'LOG IN'
                      )}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default WebLogin
