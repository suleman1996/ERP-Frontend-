import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import Loading from 'components/loading';
import Button from 'components/button';

import { schema } from './login-helper';
import { LoginCredentials } from 'interfaces/login-credentials';

import LogoImage from 'assets/logo.svg';
import eye from 'assets/employee-page/eye.svg';
import eyeClose from 'assets/employee-page/eyeClose.svg';
import style from './login.module.scss';

const WebLogin = ({ handleLogin, openNotification, setOpenNotification }: any) => {
  const navigate = useNavigate();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmit = async (data: LoginCredentials) => {
    handleLogin(data, setIsLoading);
  };

  return (
    <div className={style.loginMain}>
      <div className={style.loginOverlay}>
        <div className={style.loginCardParent}>
          <div className={style.loginCard}>
            {openNotification ? (
              <div className={style.popUpScreen}>
                <p>
                  You are an inactive user. if you want to use erp please contact with your system
                  admin.
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
                  <form className={style.loginForm} onSubmit={handleSubmit(onSubmit)}>
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
                            borderColor: errors?.employeeId ? '#ff5050' : 'gray',
                          }}
                          className={style.loginInput}
                          name="employeeId"
                          placeholder="Enter Employee Id or Email"
                          ref={register}
                        />
                      </label>
                    </div>
                    {errors?.employeeId && (
                      <span style={{ color: '#ff2020', fontSize: '12px' }}>
                        EmployeeId is required
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
                            borderColor: errors?.employeeId ? '#ff5050' : 'gray',
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
                            onClick={() => setPasswordVisible((prev: any) => !prev)}
                          />
                        ) : (
                          <img
                            src={eye}
                            alt=""
                            className={style.img}
                            onClick={() => setPasswordVisible((prev: any) => !prev)}
                          />
                        )}
                      </label>
                    </div>
                    {errors?.password && (
                      <span style={{ whiteSpace: 'pre-line', color: '#ff2020', fontSize: '12px' }}>
                        Please enter a valid password
                      </span>
                    )}
                    <div className={style.loginFPassContainer}>
                      <span className={style.loginForgetPass} onClick={() => navigate('/forgot')}>
                        Forgot Password
                      </span>
                    </div>
                    <button
                      type="submit"
                      className={style.loginSubmit}
                      disabled={isLoading || false}
                      style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
                    >
                      {isLoading ? <Loading loaderClass={style.btnLoader} /> : 'LOG IN'}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default WebLogin;
