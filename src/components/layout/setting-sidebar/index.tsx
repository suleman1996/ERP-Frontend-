import { Link } from 'react-router-dom';

import { useSidebarHelper, Props } from './helper';

import leftArrow from 'assets/sidebar-icon.svg';
import right from 'assets/right.svg';
import logoImg2 from 'assets/sidebar-logo.svg';
import smallImg from 'assets/onlyX.svg';
import logoutImg from 'assets/logout-sidebar.svg';
import settingsImg from 'assets/white/settings.svg';
import home from 'assets/white/home.svg';

import style from './sidebar-settings.module.scss';

const SettingsSidebar = ({ open, setOpen }: Props) => {
  const { sideBarListArr, handleNavigate, pathName, handleLogout } = useSidebarHelper();

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
          </div>
          {/* / RoutesList/ */}
          <div className={open ? style.listWrapperClose : style.listWrapperDiv}>
            <ul className={open ? style.ul : style.ul1}>
              <Link to="/" className={style.linkClass}>
                <li className={open ? style.heightDiv : ''}>
                  <img src={home} className={open ? style.iconsClass : style.img} alt="" />
                  <p
                    style={{
                      display: !open ? 'block' : 'none',
                      marginBottom: '0px',
                    }}
                  >
                    Back to Home
                  </p>
                </li>
              </Link>
              <Link to="/settings" className={style.linkClass}>
                <li className={open ? style.heightDiv : ''}>
                  <img src={settingsImg} className={open ? style.iconsClass : style.img} alt="" />
                  <p
                    style={{
                      display: !open ? 'block' : 'none',
                      marginBottom: '0px',
                    }}
                  >
                    Main Settings
                  </p>
                </li>
              </Link>
              <li className={open ? style.heightDiv : ''}>
                <p
                  style={{
                    display: !open ? 'block' : 'none',
                    marginBottom: '0px',
                    marginLeft: '0px',
                  }}
                >
                  Module Settings
                </p>
              </li>
              {sideBarListArr?.map(({ path, active, img1, img2, title }, index: number) => (
                <li
                  key={index}
                  onClick={() => handleNavigate(path, active)}
                  style={{
                    borderLeft: active.includes(pathName)
                      ? '4px solid #57b993'
                      : '4px solid transparent',
                  }}
                  className={open ? style.heightDiv : ''}
                >
                  <img
                    src={active.includes(pathName) ? img2 : img1}
                    alt="!error"
                    className={open ? style.iconsClass : style.img}
                  />
                  <p
                    style={{
                      display: !open ? 'block' : 'none',
                      marginBottom: '0px',
                    }}
                  >
                    {title}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Logout  */}
        <div className={style.logoutDiv}>
          <div onClick={handleLogout} className={style.smallLogoutDiv}>
            <img src={logoutImg} alt="!error" className={open ? style.iconsClass1 : style.img} />
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
  );
};

export default SettingsSidebar;
