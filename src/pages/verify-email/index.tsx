import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Loading from 'components/loading'

import { setCurrentUser } from 'store'
import { useAppDispatch } from 'store/hooks'
import SettingsService from 'services/settings-service'
import { createNotification } from 'common/create-notification'

import style from './email.module.scss'

const VerifyEmail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const userData = useSelector((state) => state?.app?.currentUser)
  const state = useSelector((state) => state?.app?.token)

  useEffect(() => {
    verifyEmailVerification()
  }, [])

  const verifyEmailVerification = async () => {
    const res = await SettingsService.emailVerify(id)
    if (res?.status === 201) {
      const userNewData = {
        ...userData,
        emailVerified: true,
      }
      dispatch(setCurrentUser(userNewData))
      createNotification('success', 'Success', res?.data?.msg)
      state ? navigate('/settings') : navigate('/login')
    }
  }

  return (
    <div className={style.loaderDiv}>
      <Loading loaderClass={style.loadingStyle} />
    </div>
  )
}

export default VerifyEmail
