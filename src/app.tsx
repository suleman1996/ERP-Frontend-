import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Routes from 'routes'
import { getAllSettings } from 'store/actions'
import AuthService from 'services/auth-service'
import { setCurrentUser, setLogout, setNotificationData } from 'store'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import NotificationService from 'services/notification-service'

import 'bootstrap-daterangepicker/daterangepicker.css'

const App = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { user_id, currentUser, token } = useAppSelector((state) => state?.app)
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    dispatch(getAllSettings())
  }, [])

  useEffect(() => {
    if (token && user_id) {
      const fetchUserData = async (id: string | number) => {
        setLoader(true)
        const res = await AuthService.getUserData?.(id)

        if (!res?.data) {
          dispatch(setLogout(''))
          navigate('/login')
        } else dispatch(setCurrentUser(res?.data))

        setLoader(false)
      }
      if (token && user_id) {
        fetchUserData(user_id)
        fetchNotificationsData()
      }
    }
  }, [dispatch, token, user_id])

  const fetchNotificationsData = async () => {
    const res = await NotificationService.getAllNotifications()
    if (res.status === 200) {
      dispatch(
        setNotificationData({ count: res?.data.count, rows: res?.data.data })
      )
    }
  }
  return (
    <>
      <Routes token={token} role={currentUser?.role} loader={loader} />
    </>
  )
}
export default App
