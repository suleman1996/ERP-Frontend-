import style from './accordian.module.scss';

import arrow from 'assets/arrowup.svg';
import { useState } from 'react';

const AccordianSwitch = () => {
  const [openAccordian, setOpenAccordian] = useState(false);
  return (
    <>
      <div className={style.container} onClick={() => setOpenAccordian(!openAccordian)}>
        <div>Profile</div>
        <img
          src={arrow}
          style={{ transform: openAccordian && 'rotate(180deg)', transition: 'all 1s ease-out' }}
        />
      </div>

      <div className={style.body}>Accordian Body</div>
    </>
  );
};

export default AccordianSwitch;
