import { useState, useEffect } from 'react';

import Checkbox from 'new-components/checkbox';

import style from './week-day.module.scss';

interface Props {
  check?: any;
  setCheck: (data?: any) => void;
}

const WeekDay = ({ check, setCheck }: Props) => {
  const handleCheckboxChange = (index: number) => {
    setCheck((prevState: any) =>
      prevState.includes(index) ? prevState.filter((e: any) => e !== index) : [...prevState, index],
    );
  };

  return (
    <div className={style.wraper}>
      <label>Working Days</label>
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
                  checked={check.includes(index)}
                  handleChange={() => handleCheckboxChange(index)}
                  containerClass={style.checkBoxContainer}
                />
              </td>
            );
          })}
        </tr>
      </table>
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
