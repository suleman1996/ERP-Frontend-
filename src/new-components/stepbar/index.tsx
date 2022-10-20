import { Dispatch, Fragment, SetStateAction } from 'react';

import style from './stepbar.module.scss';

interface Props {
  activeTab: any;
  setStepBarActive: Dispatch<SetStateAction<string[]>>;
  setActive: any;
  controlWidth: number;
  tabs: any;
}

const StepBar = ({ activeTab, controlWidth, setStepBarActive, setActive, tabs = {} }: Props) => {
  return (
    <div className={style.wrapper}>
      <ul className={style.ul}>
        {tabs?.map(({ key }: any, index: number) => {
          const isActive = activeTab?.includes(key);
          return (
            <Fragment key={key}>
              <div style={{ width: `${controlWidth}%` }} className={style.afterDiv}></div>
              <li className={style.li}>
                <div
                  className={style.round}
                  style={{
                    background: isActive ? '#57B894' : '#EBEBEB',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    if (isActive) {
                      // setStepBarActive([ele]);
                      setActive(index);
                    }
                  }}
                >
                  <span
                    style={{
                      color: isActive ? '#ffffff' : '#CACACA',
                    }}
                  >
                    {index + 1}
                  </span>
                </div>
                <p
                  style={{
                    color: isActive ? '#57B894' : '#CACACA',
                    fontWeight: isActive ? 600 : 500,
                  }}
                >
                  {key}
                </p>
              </li>
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default StepBar;
