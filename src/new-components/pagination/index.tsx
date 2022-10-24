import { SetStateAction, useState } from 'react';

import Select from 'new-components/select';

import left from 'new-assets/double-arrow-left.svg';
import right from 'new-assets/double-arrow-right.svg';
import leftArrow from 'new-assets/single-arrow-left.svg';
import rightArrow from 'new-assets/single-arrow-right.svg';

import style from './pagination.module.scss';

interface Props {
  count: any;
  setCount: React.Dispatch<SetStateAction<number>>;
  totalCount: any;
  hide: any;
}

const Pagination = ({ setCount, count, totalCount, hide }: Props) => {
  return (
    <>
      {!hide && (
        <div className={style.pagination}>
          <div className={style.leftFlex}>
            <p>View</p>
            <div style={{ maxWidth: '80px' }}>
              <Select onChange={(e) => setCount(Number(e.target.value))}>
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
            <p className={style.p}>{` Showing 1 to ${count} of ${totalCount}`} </p>
            <img src={left} alt="" onClick={() => setCount((prev) => prev - 2)} />
            <img
              src={leftArrow}
              alt=""
              onClick={() => setCount((prev) => (count === 1 ? prev : --prev))}
            />
            <p onClick={() => setCount(count)}> {count}</p>
            <p onClick={() => setCount(count + 1)}> {count + 1}</p>
            <p onClick={() => setCount(count + 2)}> {count + 2}</p>
            <img src={rightArrow} alt="" onClick={() => setCount((prev) => ++prev)} />
            <img src={right} alt="" onClick={() => setCount((prev) => prev + 2)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Pagination;

export const selectOptions = [
  {
    value: '10',
    label: '10',
  },
  {
    value: '20',
    label: '20',
  },
  {
    value: '30',
    label: '30',
  },
];
