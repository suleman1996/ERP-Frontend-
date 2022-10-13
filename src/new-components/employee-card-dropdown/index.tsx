import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

import arrow from 'new-assets/arrow-left.svg';
import style from './employee-dropdown.module.scss';

interface Props {
  setOpenModal?: Dispatch<SetStateAction<boolean>>;
  setOpenModalProfile?: Dispatch<SetStateAction<boolean>>;
  handleClick?: () => any;
  id?: string;
}

const EmployeeDropdown = ({ setOpenModal, setOpenModalProfile, id, handleClick }: Props) => {
  const navigate = useNavigate();

  const profile = [
    {
      text: 'Profile View ',
      click: () => setOpenModalProfile && setOpenModalProfile(true),
    },
    { text: 'CV View', click: () => setOpenModal && setOpenModal(true) },
    { text: 'More Details', icon: arrow, click: () => navigate(`/employee/${id}`) },
  ];

  return (
    <div>
      <div className={style.mainDiv} onClick={() => handleClick && handleClick()}>
        {profile.map((ele, index) => (
          <div className={style.innerDiv} key={index} onClick={ele.click}>
            <p>{ele.text}</p>
            {ele.icon && <img src={ele.icon} alt="" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeDropdown;
