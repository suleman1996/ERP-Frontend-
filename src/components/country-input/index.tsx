import React from 'react';
import { Controller } from 'react-hook-form';
import ReactPhoneInput from 'react-phone-input-2';

import 'react-phone-input-2/lib/style.css';
import style from './country.module.scss';

interface Props {
  name?: any;
  placeholder?: any;
  control?: any;
  errorMessage?: any;
  label?: string;
  star?: string;
}

const CountryInput = ({ name, placeholder, control, errorMessage, label, star }: Props) => {
  return (
    <>
      {label && (
        <label className={style.label} style={{ color: errorMessage ? '#ff5050' : '' }}>
          {label}
          <b style={{ color: '#ff5050' }}>{star}</b>
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ onChange, value }) => {
          return (
            <div className={style.wraper} style={{ border: errorMessage && '1px solid  #ff5050' }}>
              <ReactPhoneInput
                inputStyle={{
                  height: 'calc(30px + (55 - 30) * (100vw - 280px) / (2560 - 280))',
                  width: '100%',
                  background: '#FFFFFF',
                  border: '1px solid #E2E2EA',
                  borderRadius: '6px',
                  paddingLeft: '55px',
                  color: '#2D2D32',
                  fontSize: 'calc(12px + (18 - 12) * (100vw - 280px) / (2560 - 280))',
                }}
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
