import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';

import ContainerLoader from 'components/loading';
import Navbar from './navbar';
import Sidebar from './sidebar';
import SettingsSidebar from './setting-sidebar';

import style from './layout.module.scss';

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const Layout = ({ children }: Props) => {
  const { pathname } = useLocation();
  const { containerLoader } = useAppSelector((state) => state.app);

  const [open, setOpen] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <>
      <div className={style.layoutWrapper}>
        {pathname === '/settings' || pathname === '/profile-setting' ? (
          <header style={{ left: openSidebar ? '0px' : '' }}>
            {openSidebar && (
              <div className={style.backdropDiv} onClick={() => setOpenSidebar(false)}></div>
            )}
            <SettingsSidebar setOpen={setOpen} open={open} />
          </header>
        ) : (
          <header style={{ left: openSidebar ? '0px' : '' }}>
            {openSidebar && (
              <div className={style.backdropDiv} onClick={() => setOpenSidebar(false)}></div>
            )}
            <Sidebar setOpen={setOpen} open={open} />
          </header>
        )}

        <main className={open ? style.mainSection : style.sectionMargin}>
          <div className={style.navbarDiv}>
            <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
          </div>
          <div>{containerLoader ? <ContainerLoader /> : children}</div>
        </main>
      </div>
    </>
  );
};

export default Layout;
