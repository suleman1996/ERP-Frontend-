import Checkbox from 'components/checkbox';
import React, { useState } from 'react';
import style from './filter.module.scss';
import PlusMinusCheckbox from './plus-checkbox';

interface Props {
  list?: any;
  childArr?: any;
}

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
          <PlusMinusCheckbox label={ele.name} onClick={(e: any) => handleClick(e, index)} />
          {ele.child && (
            <div style={{ marginLeft: '10px', marginTop: '10px' }}>
              {index === monthState && <MonthsDateFilter childArr={ele.child} />}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export const MonthsDateFilter = ({ childArr }: Props) => {
  const [dateState, setDateState] = useState(null);
  const handleClick = (e: any, index: any) => {
    e.stopPropagation();
    if (index === dateState) {
      setDateState(null);
    } else {
      setDateState(index);
    }
  };

  return (
    <>
      {childArr?.map((ele: any, index: any) => (
        <div key={index}>
          <Checkbox label={ele.name} onClick={(e: any) => handleClick(e, index)} />
          {ele.child && (
            <div style={{ marginLeft: '10px', marginTop: '10px' }}>
              {index === dateState && <MonthsDateFilter childArr={ele.child} />}
            </div>
          )}
        </div>
      ))}
    </>
  );
};
