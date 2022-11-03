/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';

import style from './date.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';
import moment from 'moment';
import { useEffect } from 'react';

interface Props {
  label?: string;
  id?: string;
  className?: string;
  firstName?: string;
  lastName?: string;
  errorMessageStart?: string;
  errorMessageEnd?: string;
  watch?: any;
  control?: any;
  errorMessage?: string;
  defaultVal?: string;
  star?: string;
}

const MonthYearPicker = ({
  control,
  label,
  className,
  errorMessage,
  defaultVal,
  star,
  firstName,
  lastName,
  errorMessageStart,
  errorMessageEnd,
  watch,
}: Props) => {
  return (
    <>
      <div className={`${style.main} ${className}`}>
        {label && (
          <label
            style={{ color: (errorMessageStart || errorMessageEnd) && '#ff5050' }}
            className={style.label}
          >
            {label}
            <b style={{ color: 'red' }}>{star}</b>
          </label>
        )}
        <div className={style.grid}>
          <div>
            <Controller
              name={firstName}
              control={control}
              defaultValue={defaultVal || null}
              render={({ onChange, value }) => {
                return (
                  <>
                    <ReactDatePicker
                      name={lastName}
                      selected={value == 'Invalid Date' ? null : value || null}
                      className={errorMessageStart ? style.borderClass : style.inpDiv}
                      onChange={onChange}
                      value={value}
                      selectsStart
                      // startDate={startDate}
                      // endDate={endDate}
                      dateFormat="MM/yyyy"
                      showMonthYearPicker
                      placeholderText="MM/yyyy"
                    />
                    {errorMessageStart ? (
                      <span className={style.errorMessage}>{errorMessageStart}</span>
                    ) : (
                      ''
                    )}
                  </>
                );
              }}
            />
          </div>
          <div>
            <Controller
              name={lastName}
              control={control}
              defaultValue={defaultVal || null}
              render={({ onChange, value }) => {
                return (
                  <>
                    <ReactDatePicker
                      name={lastName}
                      selected={value == 'Invalid Date' ? null : value || null}
                      // selected={
                      //   value
                      //     ? value
                      //     : watch().financialYearStart &&
                      //       new Date(moment(watch().financialYearStart).add(1, 'y'))
                      // }
                      onChange={onChange}
                      value={value}
                      selectsEnd
                      minDate={watch().financialYearStart}
                      // startDate={startDate}
                      // endDate={endDate}
                      // minDate={startDate}
                      dateFormat="MM/yyyy"
                      showMonthYearPicker
                      className={errorMessageEnd ? style.borderClass : style.inpDiv}
                      placeholderText="MM/yyyy"
                    />
                    {errorMessageEnd ? (
                      <span className={style.errorMessage}>{errorMessageEnd}</span>
                    ) : (
                      ''
                    )}
                  </>
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
