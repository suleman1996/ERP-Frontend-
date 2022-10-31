/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';

import style from './date.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';

interface Props {
  label?: string;
  id?: string;
  className?: string;

  control?: any;
  errorMessage?: string;
  defaultVal?: string;
  star?: string;
}

const MonthYearPicker = ({ control, label, className, errorMessage, defaultVal, star }: Props) => {
  const [startDate, setStartDate] = useState(new Date('2021/02/09'));
  const [endDate, setEndDate] = useState(new Date('2022/04/12'));

  return (
    <>
      <div className={`${style.main} ${className}`}>
        {label && (
          <label style={{ color: errorMessage && '#ff5050' }} className={style.label}>
            {label}
            <b style={{ color: 'red' }}>{star}</b>
          </label>
        )}
        <div className={style.grid}>
          <div>
            <Controller
              name="startDate"
              control={control}
              defaultValue={defaultVal || null}
              render={() => {
                return (
                  <ReactDatePicker
                    id="startDate"
                    selected={startDate}
                    className={errorMessage ? style.borderClass : style.inpDiv}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                    placeholderText="MM/yyyy"
                  />
                );
              }}
            />
          </div>
          <div>
            <Controller
              name="endDate"
              control={control}
              defaultValue={defaultVal || null}
              render={() => {
                return (
                  <ReactDatePicker
                    id="startDate"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                    className={errorMessage ? style.borderClass : style.inpDiv}
                    placeholderText="MM/yyyy"
                  />
                );
              }}
            />
          </div>
        </div>

        {errorMessage ? <span className={style.errorMessage}>Date is required</span> : ''}
      </div>
    </>
  );
};

export default MonthYearPicker;
