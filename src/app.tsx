import { useEffect, useState } from 'react'

import Routes from 'routes'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  setCurrentUser,
  setNotificationCount,
  setNotificationData,
} from 'store'
import AuthService from 'services/auth-service'
import NotificationService from 'services/notification-service'

import 'bootstrap-daterangepicker/daterangepicker.css'
import { getAllSettings } from 'store/actions'
//only fo
const App = () => {
  const dispatch = useAppDispatch()
  const { user_id, currentUser, token } = useAppSelector((state) => state?.app)

  const [loader, setLoader] = useState(false)

  useEffect(() => {
    dispatch(getAllSettings())
  }, [])

  useEffect(() => {
    const fetchUserData = async (id: string | number) => {
      setLoader(true)
      const res = await AuthService.getUserData?.(id)
      dispatch(setCurrentUser(res?.data))
      setLoader(false)
    }

    if (token && user_id) {
      fetchUserData(user_id)
      fetchNotificationsData()
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
