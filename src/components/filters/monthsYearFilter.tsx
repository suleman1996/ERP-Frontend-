import React, { useState } from 'react';

import Checkbox from 'components/checkbox';
import PlusMinusCheckbox from './plus-checkbox';

import style from './filter.module.scss';

interface Props {
  list?: any;
  childArr?: any;
}

// year
export const MonthsYearFilter = ({ list }: Props) => {
  const [monthState, setMonthState] = useState(null);

  const handleClick = (e: any, index: any) => {
    if (index === monthState) {
      setMonthState(null);
    } else {
      setMonthState(index);
    }
  };

  return (
    <>
      {list?.map((ele: any, index: any) => (
        <div className={style.monthDiv} key={index}>
          <PlusMinusCheckbox
            label={ele.name}
            afterClass={index === monthState && style.afterClass}
            onClick={(e: any) => handleClick(e, index)}
          />
          {ele.child && (
            <div style={{ marginLeft: '16px', marginTop: '7px' }}>
              {index === monthState && <MonthsDateFilter childArr={ele.child} />}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

// months

export const MonthsDateFilter = ({ childArr }: Props) => {
  const [dateState, setDateState] = useState(-1);

  return (
    <>
      {childArr?.map((ele: any, index: any) => (
        <div
          key={index}
          className={`${style.nthDiv}  ${
            index === dateState ? `${style.nthDiv1} ${style.secondAfter}` : ''
          }`}
        >
          <Checkbox
            containerClass={`${style.checkbox}  ${style.afterClassDate}`}
            label={ele.name}
            checked={index === dateState}
            onClick={(e: any) => e.stopPropagation()}
            handleChange={() => setDateState((prev) => (index === prev ? -1 : index))}
          />
          {ele.child && (
            <div
              style={{
                marginLeft: '16px',
                marginTop: '7px',
              }}
            >
              {index === dateState && <DayDateFilter childArr={ele.child} />}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

// dates
export const DayDateFilter = ({ childArr }: Props) => {
  return (
    <>
      {childArr?.map((ele: any, index: any) => (
        <div key={index} className={style.nthDiv2}>
          <Checkbox
            label={ele.name}
            containerClass={`${style.checkbox} ${style.afterClassDate1}`}
          />
        </div>
      ))}
    </>
  );
};
