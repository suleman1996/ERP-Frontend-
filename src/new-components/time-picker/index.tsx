import React from 'react';

import Input from 'new-components/textfield';

import style from './time.module.scss';
interface Props {
  label?: string;
  value?: string;
  name?: string;
  placeholder?: string;
  inputRef?: string;
  register?: any;
  errorMessage?: string;
}

const TimePicker = ({ placeholder, label, name, register, errorMessage }: Props) => {
  return (
    <>
      <div className={style.main}>
        <div className={style.inpDiv}>
          <Input
            label={label}
            type="time"
            id="time"
            register={register}
            placeholder={placeholder}
            errorMessage={errorMessage}
            name={name}
          />
        </div>
      </div>
    </>
  );
};

export default TimePicker;
