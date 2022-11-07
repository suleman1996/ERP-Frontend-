import style from './accordian.module.scss';

import arrow from 'assets/arrowup.svg';
import { useEffect, useState } from 'react';
import Switch from 'components/switch';

const AccordianSwitch = ({ title, bodyData, id, openAccordian, setOpenAccordian }: any) => {
  const [checkAll, setCheckAll] = useState(false);

  return (
    <>
      <div
        className={style.container}
        onClick={() => setOpenAccordian((prev) => (prev === id ? -1 : id))}
      >
        <div className={style.switchHeader}>
          {title}
          <Switch switchContainer={style.switchContainer} onChange={() => setCheckAll(!checkAll)} />
        </div>
        <img
          src={arrow}
          style={{ transform: openAccordian && 'rotate(180deg)', transition: 'all 0.5s ease-out' }}
        />
      </div>

      {console.log('aaaa====', openAccordian, id)}

      {openAccordian === id &&
        bodyData?.map((data: any) => {
          return <Comp name={data?.name} checkAll={checkAll} />;
        })}
    </>
  );
};

const Comp = ({ name, checkAll }: any) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(checkAll);
  }, [checkAll]);

  return (
    <div className={style.body}>
      <div className={style.bodySwitch}>
        <span>{name}</span>
        <Switch checked={checked} onChange={(e) => setChecked(e.target.checked)} />
      </div>
    </div>
  );
};

export default AccordianSwitch;
