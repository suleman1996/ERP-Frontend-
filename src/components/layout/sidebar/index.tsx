import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { adminListArr } from './list-script'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { setLogout } from 'store'

import leftArrow from 'assets/sidebar-icon.svg'
import right from 'assets/right.svg'
import logoImg2 from 'assets/sidebar-logo.svg'
import smallImg from 'assets/onlyX.svg'
import logoutImg from 'assets/logout-sidebar.svg'
import profile from 'assets/avatar.jfif'
import style from './sidebar.module.scss'

interface Props {
  open?: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

interface ListArr {
  path: string
  active: string
  title: string
  img1: string
  img2: string
}

const Sidebar = ({ open, setOpen }: Props) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector((state) => state.app)

  const [sideBarListArr, setSideBarListArr] = useState<ListArr[] | []>([])
  const [pathName, setPathName] = useState<string>('')

  useEffect(() => {
    if (pathname === '/') {
      setPathName('dashboard')
    } else {
      const tempPath = pathname && pathname?.split('/')[1]
      setPathName(tempPath)
    }
  }, [pathname])

  useEffect(() => {
    if (currentUser?.role) {
      const setList = adminListArr?.filter((ele: any) =>
        ele.role.includes(currentUser?.role)
      )
      setSideBarListArr([...setList])
    }
  }, [currentUser?.role])

  const handleLogout = () => {
    dispatch(setLogout(''))
  }

  const handleNavigate = (path: string, active: string) => {
    if (active === 'employee' && currentUser?.role === 'Employee') {
      navigate(`${path}/${currentUser?.id}`)
    } else {
      navigate(path)
    }
  }

  return (
    <>
      <div className={!open ? style.sidebarWrapper : style.wrapperSmall}>
        <div>
          <div className={!open ? style.sidebarHeader : style.sidebarSmall}>
            <div className={!open ? style.arrowDiv : style.arrowCloseDiv}>
              <img
                src={!open ? leftArrow : right}
                alt="!error"
                onClick={() => setOpen(!open)}
                style={{ cursor: 'pointer' }}
                data-testid={'openClose'}
              />
            </div>
            <div className={style.logoImgDiv}>
              {!open ? (
                <img src={logoImg2} alt="!error" className={style.smallImg} />
              ) : (
                <img src={smallImg} alt="!error" className={style.webImage} />
              )}
            </div>
            <div className={style.profileImgDiv}>
              {!open ? (
                <img
                  src={currentUser?.img ? currentUser?.img : profile}
                  alt="!error"
                  className={style.imgLarge}
                />
              ) : (
                <img
                  src={currentUser?.img ? currentUser?.img : profile}
                  alt="!error"
                  className={style.imgSmall}
                />
              )}
              <div
                className={style.profileContentDiv}
                style={{ display: !open ? 'block' : 'none' }}
              >
                <h1>{`${currentUser?.name}`}</h1>
                <p>{currentUser?.designation}</p>
              </div>
            </div>
          </div>
          {/* / RoutesList/ */}
          <div className={open ? style.listWrapperClose : style.listWrapperDiv}>
            <ul className={open ? style.ul : style.ul1}>
              {sideBarListArr?.map((ele, index: number) => (
                <li
                  key={index}
                  onClick={() => handleNavigate(ele.path, ele.active)}
                  style={{
                    borderLeft: ele.active.includes(pathName)
                      ? '4px solid #57b993'
                      : '4px solid transparent',
                  }}
                  className={open ? style.heightDiv : ''}
                >
                  <img
                    src={ele.active.includes(pathName) ? ele.img2 : ele.img1}
                    alt="!error"
                    className={open ? style.iconsClass : style.img}
                  />
                  <p
                    style={{
                      display: !open ? 'block' : 'none',
                      marginBottom: '0px',
                    }}
                  >
                    {ele.title}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Logout  */}
        <div className={style.logoutDiv}>
          <div onClick={handleLogout} className={style.smallLogoutDiv}>
            <img
              src={logoutImg}
              alt="!error"
              className={open ? style.iconsClass1 : style.img}
            />
            <p
              style={{
                display: open ? 'none' : 'block',
                marginBottom: '0px',
              }}
            >
              Logout
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
