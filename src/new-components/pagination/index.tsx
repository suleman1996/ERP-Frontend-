import { SetStateAction, useState, useEffect } from 'react';

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
  setPage: (value: any) => void;
  page: any;
}

const Pagination = ({ setCount, count, totalCount, hide, setPage, page }: Props) => {
  const pages = () => {
    const allPageSizes = Math.ceil(totalCount / count);
    let paginationLines = [];
    for (let i = 1; i <= allPageSizes; i++) {
      paginationLines.push(<p> {i}</p>);
    }
    return paginationLines;
  };

  console.log('all', pages().length);
  console.log('page', page);
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
            <img src={left} alt="" onClick={() => setPage((prev: any) => 1)} />
            <img
              src={leftArrow}
              alt=""
              onClick={() => setPage((prev: any) => (prev === 1 ? 1 : --prev))}
            />

            {pages()}
            <img
              src={rightArrow}
              alt=""
              onClick={() =>
                setPage((prev: any) =>
                  prev === Math.ceil(totalCount / count) ? Math.ceil(totalCount / count) : ++prev,
                )
              }
            />
            <img
              src={right}
              alt=""
              onClick={() => setPage((prev: any) => Math.ceil(totalCount / count))}
            />
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
