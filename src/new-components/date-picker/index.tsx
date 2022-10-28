/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';
import moment from 'moment';
import TimePicker from 'react-time-picker';

import doubleArrowRight from 'new-assets/1.svg';
import singleArrowRight from 'new-assets/2.svg';
import singleArrowLeft from 'new-assets/3.svg';
import doubleArrowLeft from 'new-assets/4.svg';
import date from 'new-assets/date-icon.svg';
import style from './date.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';

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
  showTimeInput?: any;
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
  showTimeInput,
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

  const CustomTimeInput = ({ value, onChange }: any) => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <input
        className={style.inputField}
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {/* <TimePicker onChange={onChange} value={value} /> */}
    </div>
  );

  return (
    <>
      <div className={`${style.main} ${className}`}>
        {label && (
          <label style={{ color: errorMessage && '#ff5050' }} className={style.label}>
            {label}
            <b style={{ color: 'red' }}>{star}</b>
          </label>
        )}
        <div onClick={handleClick} style={{ position: 'relative' }}>
          <Controller
            name={name}
            control={control}
            defaultValue={defaultVal || null}
            render={({ onChange, value, name }) => {
              return (
                <ReactDatePicker
                  selected={value == 'Invalid Date' ? null : value || null}
                  maxDate={maxDate && maxDate}
                  minDate={minDate && minDate}
                  readOnly={readOnly}
                  dateFormat={showTimeInput ? 'MM/dd/yyyy h:mm aa' : 'MM/dd/yyyy'}
                  timeFormat="HH:mm"
                  timeCaption="Time"
                  showTimeInput={showTimeInput}
                  customTimeInput={<CustomTimeInput />}
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
                      <p>
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
              );
            }}
          />
          <label htmlFor={id}>
            <div className={style.icon}>
              <img src={date} alt="" />
            </div>
          </label>
        </div>
        {errorMessage ? <span className={style.errorMessage}>{errorMessage}</span> : ''}
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
