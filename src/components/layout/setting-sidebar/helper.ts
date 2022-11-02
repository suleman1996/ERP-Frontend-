import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { adminListArr } from './list-script';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setLogout } from 'store';

export interface Props {
  open?: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface ListArr {
  path: string;
  active: string;
  title: string;
  img1: string;
  img2: string;
  role: string[];
}

export const useSidebarHelper = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.app);

  const [sideBarListArr, setSideBarListArr] = useState<ListArr[] | []>([]);
  const [pathName, setPathName] = useState<string>('');

  useEffect(() => {
    if (pathname === '/') {
      setPathName('dashboard');
    } else {
      const tempPath = pathname?.split('/')[1];
      setPathName(tempPath);
    }
  }, [pathname]);

  useEffect(() => {
    if (currentUser?.role) {
      const setList = adminListArr?.filter((ele: ListArr) => ele.role.includes(currentUser?.role));
      setSideBarListArr([...setList]);
    }
  }, [currentUser?.role]);

  const handleLogout = () => {
    dispatch(setLogout(''));
  };

  const handleNavigate = (path: string, active: string) => {
    if (active === 'employee' && currentUser?.role === 'Employee') {
      navigate(`${path}/${currentUser?.id}`);
    } else {
      navigate(path);
    }
  };

  return { sideBarListArr, handleNavigate, pathName, handleLogout };
};
