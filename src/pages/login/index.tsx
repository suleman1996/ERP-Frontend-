import { useState } from 'react'

import WebLogin from './web-login'
import MobileLogin from './mobile-login'

import style from './login.module.scss'

const Login = () => {
  const [openNotification, setOpenNotification] = useState(false)

  return (
    <>
      <div className={style.downMd}>
        <WebLogin
          openNotification={openNotification}
          setOpenNotification={setOpenNotification}
        />
      </div>

      <div className={style.upMd}>
        <MobileLogin
          openNotification={openNotification}
          setOpenNotification={setOpenNotification}
        />
      </div>
    </>
  )
}
export default Login
