import { memo, useEffect, useState } from 'react'
import {
  Navigate,
  Route,
  Routes as Switch,
  useNavigate,
} from 'react-router-dom'

import Layout from 'components/layout'
import AppLoader from 'components/app-loader'

import { setLogout } from 'store'
import { useAppDispatch } from 'store/hooks'
import { routes, publicRoute, RouteInterface, allRoute } from './helper'

interface Props {
  token: string
  role: string
  loader: boolean
}

const Routes = ({ token, role, loader }: Props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [routesArr, setRoutesArr] = useState<RouteInterface[] | []>([])

  useEffect(() => {
    if (token && role) {
      let tempRoutes = [...routes]
      tempRoutes = tempRoutes.filter((ele) => ele.role?.includes(role))
      setRoutesArr([...tempRoutes])
    }
  }, [token, role])

  useEffect(() => {
    if (!role) {
      dispatch(setLogout(''))
      navigate('/login')
    }
  }, [token, role])

  return (
    <>
      {!token && !role && (
        <Switch>
          {publicRoute?.map(({ path, component }, index: number) => {
            return <Route key={index} path={path} element={component} />
          })}
          {allRoute?.map(({ path, component }, index: number) => {
            return <Route key={index} path={path} element={component} />
          })}
          <Route path="*" element={<Navigate to="/login" />} />
        </Switch>
      )}
      {!loader ? (
        <>
          {token && role && routesArr?.length > 0 && (
            <Switch>
              {routesArr?.map(({ path, component }, index: number) => {
                return (
                  <Route
                    key={index}
                    path={path}
                    element={<Layout>{component}</Layout>}
                  />
                )
              })}
              {allRoute?.map(({ path, component }, index: number) => {
                return <Route key={index} path={path} element={component} />
              })}
              <Route path="*" element={<Navigate to="/" />} />
            </Switch>
          )}
        </>
      ) : (
        <AppLoader />
      )}
    </>
  )
}

export default memo(Routes)
