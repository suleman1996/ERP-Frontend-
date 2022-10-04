import React from 'react';
import { Controller } from 'react-hook-form';
import ReactPhoneInput from 'react-phone-input-2';

import 'react-phone-input-2/lib/style.css';
import style from './country.module.scss';

const CountryInput = ({ name, placeholder, control, errorMessage }) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ onChange, value }) => {
          return (
            <div
              className={style.wraper}
              style={{ border: errorMessage && ' 0.5px solid  #ff5050' }}
            >
              <ReactPhoneInput
                inputStyle={{ height: '48px', width: '100%' }}
                buttonClass={style.buttonStyle}
                country={'pk'}
                value={value}
                name={name}
                onChange={(e) => onChange(e)}
                placeholder={placeholder}
              />
            </div>
          );
        }}
      />
      {errorMessage && <span className={style.errorMessage}>{errorMessage}</span>}
    </>
  );
};

export default CountryInput;
