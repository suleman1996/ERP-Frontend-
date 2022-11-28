import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'

import Loading from 'components/loading'
import MobileForgotPassword from './mobile-reset'

import AuthService from 'services/auth-service'
import { setErrors } from 'helper'

import LogoImage from 'assets/sprintx.svg'
import style from './reset-password.module.scss'

const ResetPassword = () => {
  const navigate = useNavigate()
  const search = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, errors, setError, clearErrors } = useForm()

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
      if (err?.response?.data?.error) {
        setErrors(err?.response?.data?.error, setError)
      }
    }
    setIsLoading(false)
  }

  return (
    <>
      <div className={style.loginMain}>
        <div className={style.loginOverlay}>
          <div className={style.loginCardParent}>
            <div className={style.loginCard}>
              <div className={style.loginContent}>
                <img src={LogoImage} width="110px" alt="logo" />
                <span className={style.loginTitle}>Reset Password</span>
                <form
                  className={style.loginForm}
                  onSubmit={(e) => {
                    clearErrors()
                    handleSubmit(onSubmit)(e)
                  }}
                >
                  <div>
                    <label
                      className={style.loginLabel}
                      style={{
                        color: errors?.password ? '#ff5050' : '#dcdcdc',
                      }}
                    >
                      New Password
                      <input
                        type="password"
                        style={{
                          color: errors?.password ? '#ff5050' : 'white',
                          borderColor: errors?.password ? '#ff5050' : 'gray',
                        }}
                        className={style.loginInput}
                        name="password"
                        placeholder="Your Password"
                        ref={register}
                      />
                    </label>
                  </div>
                  {errors?.password && (
                    <span style={{ color: '#ff2020' }}>
                      {errors?.password?.message}
                    </span>
                  )}
                  <div>
                    <label
                      className={style.loginLabel}
                      style={{
                        color: errors?.confirmPassword ? '#ff5050' : '#dcdcdc',
                      }}
                    >
                      Confirm New Password
                      <input
                        type="password"
                        style={{
                          color: errors?.confirmPassword ? '#ff5050' : 'white',
                          borderColor: errors?.confirmPassword
                            ? '#ff5050'
                            : 'gray',
                        }}
                        className={style.loginInput}
                        name="confirmPassword"
                        placeholder="Re Enter Password"
                        ref={register}
                      />
                    </label>
                  </div>
                  {errors?.confirmPassword && (
                    <span style={{ whiteSpace: 'pre-line', color: '#ff2020' }}>
                      {errors?.confirmPassword?.message}
                    </span>
                  )}

                  <button
                    type="submit"
                    className={style.loginSubmit}
                    disabled={isLoading || false}
                    style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
                  >
                    {isLoading ? (
                      <Loading loaderClass={style.btnLoader} />
                    ) : (
                      'Submit'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MobileForgotPassword />
    </>
  )
}
export default ResetPassword
