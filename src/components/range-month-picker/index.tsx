/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';

import style from './date.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import singleArrowRight from 'assets/2.svg';
import singleArrowLeft from 'assets/3.svg';
import './index.css';
import moment from 'moment';
import { useEffect } from 'react';

interface Props {
  label?: string;
  id?: string;
  className?: string;
  name?: string;
  errorMessage?: string;
  watch?: any;
  control?: any;
  defaultVal?: string;
  star?: string;
}

const MonthYearPicker = ({
  control,
  label,
  className,
  defaultVal,
  star,
  name,
  errorMessage,
  watch,
}: Props) => {
  return (
    <>
      <div className={`${style.main} ${className}`}>
        {label && (
          <label style={{ color: errorMessage && '#ff5050' }} className={style.label}>
            {label}
            <b style={{ color: 'red' }}>{star}</b>
          </label>
        )}

        <Controller
          name={name || ''}
          control={control}
          defaultValue={defaultVal || null}
          render={({ onChange, value }) => {
            return (
              <>
                <ReactDatePicker
                  id={name}
                  name={name}
                  selected={value == 'Invalid Date' ? null : value || null}
                  className={errorMessage ? style.borderClass : style.inpDiv}
                  onChange={onChange}
                  value={value}
                  selectsStart
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  placeholderText="MM/yyyy"
                  minDate={watch}
                  renderCustomHeader={({
                    date,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                  }) => (
                    <div className={style.iconsDiv}>
                      <button
                        type={'button'}
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                      >
                        <img src={singleArrowLeft} alt="" />
                      </button>
                      <p>{date.getFullYear()}</p>
                      <button
                        type={'button'}
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                      >
                        <img src={singleArrowRight} alt="" />
                      </button>
                    </div>
                  )}
                />
              </>
            );
          }}
        />

        {errorMessage ? <span className={style.errorMessage}>{errorMessage}</span> : ''}
      </div>
    </>
  );
};

export default MonthYearPicker;
