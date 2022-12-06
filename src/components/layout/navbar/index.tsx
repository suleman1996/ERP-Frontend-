/* eslint-disable array-callback-return */
import { useEffect, useState, SetStateAction, Dispatch } from 'react'
import { useLocation } from 'react-router'

import Container from 'components/container'
import TextField from 'components/textfield'
import NotificationMenu from '../notification-menu'

import { navbarTitleList } from './navbar-title-script'

import bell from 'assets/bell.svg'
import search from 'assets/small-search.svg'
import hamburger from 'assets/hamburger.svg'
import style from './navbar.module.scss'

interface Props {
  openSidebar?: boolean
  setOpenSidebar?: Dispatch<SetStateAction<boolean>>
}
interface navTitle {
  path: string
  title: string
}

const Navbar = ({ setOpenSidebar, openSidebar }: Props) => {
  const { pathname } = useLocation()

  const [, setNotificationHover] = useState(false)
  const [notificationMenu, setNotificationMenu] = useState(false)
  const [title, setTitle] = useState('')

  useEffect(() => {
    navbarTitleList.map(({ path, title }: navTitle) => {
      if (pathname?.includes(path)) {
        setTitle(title)
      }
    })
  }, [pathname])

  return (
    <Container container={style.container}>
      <nav>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={hamburger}
            alt="icon"
            className={style.hamburger}
            onClick={() => setOpenSidebar && setOpenSidebar(!openSidebar)}
          />
          <h1>{title}</h1>
        </div>
        <div className={style.rightDiv}>
          <img src={search} alt="" className={style.imgDiv} />
          <div className={style.searchDiv}>
            <TextField placeholder="Search" />
          </div>
          <img
            className={style.img}
            src={bell}
            alt="notification"
            onMouseEnter={() => {
              setNotificationHover(true)
            }}
            onMouseLeave={() => {
              setNotificationHover(false)
            }}
          />
          {notificationMenu && (
            <NotificationMenu setNotificationMenu={setNotificationMenu} />
          )}
        </div>
      </nav>
    </Container>
  )
}

export default Navbar
