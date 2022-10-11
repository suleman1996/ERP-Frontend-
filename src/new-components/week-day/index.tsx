import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Checkbox from 'new-components/checkbox';

import style from './week-day.module.scss';

const WeekDay = () => {
  const { control, register } = useForm();

  const [check, setCheck] = useState<number[]>([]);

  const handleCheckboxChange = (index: number) => {
    setCheck((prevState) =>
      prevState.includes(index) ? prevState.filter((e) => e !== index) : [...prevState, index],
    );
  };

  return (
    <>
      <table>
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
    </>
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
