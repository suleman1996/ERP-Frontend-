import React from 'react';

import style from './select.module.scss';

import icon from 'assets/employee-page/Polygon 1.png';
import { FieldError } from 'react-hook-form';

interface Props {
  label?: string;
  htmlFor?: string;
  star?: string;
  id?: string;
  name?: string;
  options: string[] | [];
  onChange?: (e: any) => void;
  onBlur?: () => void;
  inputRef?: any;
  className?: string;
  placeHolder?: string;
  error?: FieldError | Boolean;
  errorMessage?: string;
  selectClass?: string;
  readonly?: boolean;
  disabled?: boolean;
}

const Select = ({
  label,
  options,
  name,
  onChange,
  onBlur,
  selectClass,
  inputRef,
  className,
  placeHolder,
  star,
  errorMessage,
  error,
  disabled,
}: Props) => {
  return (
    <div className={`${style.generalSettingsInputContainer} ${className}`}>
      {label && (
        <label>
          {label} <span style={{ color: 'red' }}>{star}</span>
        </label>
      )}
      <div
        style={{
          position: 'relative',
          borderRadius: '5px',
        }}
      >
        <select
          name={name}
          className={`${style.select} ${selectClass}`}
          ref={inputRef}
          disabled={disabled}
          onChange={onChange}
          style={{ border: error ? '1px solid #ff5050' : ' 1px solid #d9d9d9' }}
        >
          {placeHolder && <option value="">{placeHolder}</option>}
          {options.map((opt: string, index: number) => (
            <option key={index} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <img src={icon} alt="arrow icon" className={style.img} />
      </div>
      {error && errorMessage && <span className={style.errorMessage}>{errorMessage}</span>}
    </div>
  );
};

export default Select;
