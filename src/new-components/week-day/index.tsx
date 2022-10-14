import { useState, useEffect } from 'react';

import Checkbox from 'new-components/checkbox';

import style from './week-day.module.scss';

interface Props {
  check?: any;
  setCheck: (data?: any) => void;
  star?: string;
  errorMessage?: string;
}

const WeekDay = ({ check, setCheck, star, errorMessage }: Props) => {
  const handleCheckboxChange = (index: number) => {
    setCheck((prevState: any) =>
      prevState?.includes(index)
        ? prevState?.filter((e: any) => e !== index)
        : prevState
        ? [...prevState, index]
        : [index],
    );
  };

  return (
    <div className={style.wraper}>
      <label>
        Working Days
        <b style={{ color: 'red' }}>{star}</b>
      </label>
      <table style={{ marginTop: '10px' }}>
        <tr>
          {days.map((ele, index) => {
            return <th>{ele.name}</th>;
          })}
        </tr>

        <tr>
          {days.map((ele, index) => {
            return (
              <td className={style.checkBox}>
                <Checkbox
                  checked={check?.includes(index)}
                  handleChange={() => handleCheckboxChange(index)}
                  containerClass={style.checkBoxContainer}
                />
              </td>
            );
          })}
        </tr>
      </table>
      {errorMessage && <span className={style.errorMessage}>{errorMessage}</span>}
    </div>
  );
};

export default WeekDay;

const days = [
  { name: 'Monday' },
  { name: 'Tuesday' },
  { name: 'Wednesday' },
  { name: 'Thursday' },
  { name: 'Friday' },
  { name: 'Saturday' },
  { name: 'Sunday' },
];
