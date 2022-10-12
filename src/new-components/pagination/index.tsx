import { useState } from 'react';

import Select from 'new-components/select';

import left from 'new-assets/double-arrow-left.svg';
import right from 'new-assets/double-arrow-right.svg';
import leftArrow from 'new-assets/single-arrow-left.svg';
import rightArrow from 'new-assets/single-arrow-right.svg';
import style from './pagination.module.scss';

// interface Props{
//   count?:any;
//   setCount?:()=>void

// }

const Pagination = () => {
  const [count, setCount] = useState(1);

  return (
    <>
      <div className={style.pagination}>
        <div className={style.leftFlex}>
          <p>View</p>
          <div style={{ maxWidth: '80px' }}>
            <Select>
              {selectOptions?.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </div>
          <p>user per page</p>
        </div>
        <div className={style.rightFlex}>
          <p className={style.p}> Showing 1 to 20 of 3,129 entries</p>
          <img src={left} alt="" />
          <img
            src={leftArrow}
            alt=""
            onClick={() => setCount((prev) => (count === 1 ? prev : --prev))}
          />
          <p onClick={() => setCount(count)}> {count}</p>
          <p onClick={() => setCount(count + 1)}> {count + 1}</p>
          <p onClick={() => setCount(count + 2)}> {count + 2}</p>
          <img src={rightArrow} alt="" onClick={() => setCount((prev) => ++prev)} />
          <img src={right} alt="" />
        </div>
      </div>
    </>
  );
};

export default Pagination;

export const selectOptions = [
  {
    value: '20',
    label: '20',
  },
  {
    value: '30',
    label: '30',
  },
  {
    value: '40',
    label: '40',
  },
];
