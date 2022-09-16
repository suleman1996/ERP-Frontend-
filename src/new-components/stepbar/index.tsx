import React, { Fragment } from 'react';

import { employeeStepBar } from './helper';

import style from './stepbar.module.scss';

interface Props {
  activeTab: any;
  controlWidth: number;
}

const StepBar = ({ activeTab, controlWidth }: Props) => {
  return (
    <div className={style.wrapper}>
      <ul className={style.ul}>
        {employeeStepBar?.map((ele, index) => (
          <Fragment key={index}>
            <div style={{ width: `${controlWidth}%` }} className={style.afterDiv}></div>
            <li className={style.li}>
              <div
                className={style.round}
                style={{
                  background: activeTab.includes(ele) ? '#57B894' : '#EBEBEB',
                }}
              >
                <span
                  style={{
                    color: activeTab.includes(ele) ? '#ffffff' : '#CACACA',
                  }}
                >
                  {index + 1}
                </span>
              </div>
              <p
                style={{
                  color: activeTab.includes(ele) ? '#57B894' : '#CACACA',
                  fontWeight: activeTab.includes(ele) ? 600 : 500,
                }}
              >
                {ele}
              </p>
            </li>
          </Fragment>
        ))}
      </ul>
    </div>
  );
};

export default StepBar;
