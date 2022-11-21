import { Dispatch, useState, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

import WebLogin from './web-login';
import MobileLogin from './mobile-login';

import { useAppDispatch } from 'store/hooks';
import AuthService from 'services/auth-service';
import { setCurrentUser, setToken, setUserId } from 'store';
import { createNotification } from 'common/create-notification';

import style from './login.module.scss';

interface Props {
  employeeId?: string;
  password?: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [openNotification, setOpenNotification] = useState(false);

  const handleLogin = async (data: Props, setIsLoading: Dispatch<SetStateAction<boolean>>) => {
    setIsLoading(true);
    try {
      const res = await AuthService.login(data);
      if (res.status === 200) {
        if (res.data.status) {
          setIsLoading(false);
          dispatch(setCurrentUser(res.data));
          dispatch(setToken(res.headers.authorization));
          dispatch(setUserId(res.data.id));
          navigate('/');
        } else {
          setOpenNotification(true);
        }
      } else {
        createNotification('error', 'Error', 'Please Enter Valid Credentials');
        setIsLoading(false);
      }
    } catch (err) {
      createNotification('error', 'Error', 'Please Enter Valid Credentials');
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className={style.downMd}>
        <WebLogin
          handleLogin={handleLogin}
          openNotification={openNotification}
          setOpenNotification={setOpenNotification}
        />
      </div>

      <div className={style.upMd}>
        <MobileLogin
          handleLogin={handleLogin}
          openNotification={openNotification}
          setOpenNotification={setOpenNotification}
        />
      </div>
    </>
  );
};
export default Login;
