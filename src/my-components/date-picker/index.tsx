/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Controller } from 'react-hook-form';

import ReactDatePicker from 'react-datepicker';

import doubleArrowRight from 'new-assets/1.svg';
import singleArrowRight from 'new-assets/2.svg';
import singleArrowLeft from 'new-assets/3.svg';
import doubleArrowLeft from 'new-assets/4.svg';
import date from 'new-assets/date-icon.svg';

import 'react-datepicker/dist/react-datepicker.css';
import './index.css';

import style from './date.module.scss';

interface Props {
  label?: string;
  id?: string;
  className?: string;
  name: string;
  control?: any;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  errorMessage?: string;
  setDateVal?: boolean;
  required?: boolean;
  handleChange?: (event: Date | [Date | null, Date | null] | null, name: string) => void;
  defaultVal?: string;
  isDisable?: boolean;
  handleClick?: () => void;
  maxDate?: any;
  minDate?: any;
  readOnly?: boolean;
  star?: string;
}

const DatePicker = ({
  readOnly,
  name,
  control,
  label,
  className,
  id,
  errorMessage,
  defaultVal,
  handleChange,
  isDisable,
  handleClick,
  maxDate,
  minDate,
  placeholder,
  star,
}: Props) => {
  const handleChangeDate = (
    event: Date | [Date | null, Date | null] | null,
    onChange: (...event: any[]) => void,
    name: string,
  ) => {
    handleChange?.(event, name);
    onChange(event);
  };

  return (
    <>
      <div className={`${style.main} ${className}`}>
        {label && (
          <label style={{ color: errorMessage && '#ff5050' }} className={style.label}>
            {label}
            <b style={{ color: 'red' }}>{star}</b>
          </label>
        )}
        <div onClick={handleClick}>
          <Controller
            name={name}
            control={control}
            defaultValue={defaultVal || null}
            render={({ onChange, value, name }) => (
              <ReactDatePicker
                selected={value}
                maxDate={maxDate && maxDate}
                minDate={minDate && minDate}
                readOnly={readOnly}
                onChange={(event) => {
                  handleChangeDate(event, onChange, name);
                }}
                className={errorMessage ? style.borderClass : style.inpDiv}
                placeholderText={placeholder ? placeholder : '22/03/2022'}
                id={id}
                disabled={isDisable}
                renderCustomHeader={({
                  date,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                  prevYearButtonDisabled,
                  nextYearButtonDisabled,
                  increaseYear,
                  decreaseYear,
                }) => (
                  <div className={style.iconsDiv}>
                    <div>
                      <button
                        type="button"
                        onClick={decreaseYear}
                        disabled={prevYearButtonDisabled}
                      >
                        <img src={doubleArrowLeft} alt="" />
                      </button>
                      <button
                        type={'button'}
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                      >
                        <img src={singleArrowLeft} alt="" />
                      </button>
                    </div>
                    <p className={style.month}>
                      {months[date.getMonth()]} {date.getFullYear()}
                    </p>
                    <div>
                      <button
                        type={'button'}
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                      >
                        <img src={singleArrowRight} alt="" />
                      </button>
                      <button
                        type={'button'}
                        onClick={increaseYear}
                        disabled={nextYearButtonDisabled}
                        style={{ marginRight: '8px' }}
                      >
                        <img src={doubleArrowRight} alt="" />
                      </button>
                    </div>
                  </div>
                )}
              />
            )}
          />
        </div>
        <label htmlFor={id}>
          <div className={style.icon}>
            <img src={date} alt="" />
          </div>
        </label>
        {errorMessage ? <span className={style.errorMessage}>Date is required</span> : ''}
      </div>
    </>
  );
};

export default DatePicker;

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
