import { useNavigate } from 'react-router-dom';

import MobileLogin from './mobile-login';
import WebLogin from './web-login';

import { useAppDispatch } from 'store/hooks';
import AuthService from 'services/auth-service';
import { setCurrentUser, setToken, setUserId } from 'store';
import { createNotification } from 'common/create-notification';

import style from './login.module.scss';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (data: any, setIsLoading: any) => {
    setIsLoading(true);

    try {
      const res = await AuthService.login(data);
      if (res.status === 200) {
        setIsLoading(false);
        dispatch(setCurrentUser(res.data));
        dispatch(setToken(res.headers.authorization));
        dispatch(setUserId(res.data.id));
        navigate('/');
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
        <WebLogin handleLogin={handleLogin} />
      </div>

      <div className={style.upMd}>
        <MobileLogin handleLogin={handleLogin} />
      </div>
    </>
  );
};
export default Login;
