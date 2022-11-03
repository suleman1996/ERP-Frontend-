import Input from 'components/input';
import React from 'react';

import style from './time.module.scss';
interface Props {
  label?: string;
  value?: string;
  name?: string;
  placeholder?: string;
  inputRef?: string;
  register?: any;
  errorMessage?: string;
  star?: string;
}

const TimePicker = ({ placeholder, label, name, register, errorMessage, star }: Props) => {
  return (
    <>
      <div className={style.main}>
        <div className={style.inpDiv}>
          <Input
            label={label}
            star={star}
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
