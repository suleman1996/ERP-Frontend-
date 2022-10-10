import React from 'react';

interface Props {
  label?: string;
  id?: string;
  name?: string;
  handleClick?: () => void;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  radioRef?: any;
  radioValue?: number | string;
  radioValue2?: number | string;
  error?: boolean;
  errorMessage?: string;
  className?: string;
  defaultChecked?: boolean;
  Firstname?: string;
  Secondname?: string;
}

const Radio = ({ name, handleChange, radioValue, Firstname, Secondname, radioValue2 }: Props) => {
  return (
    <div>
      <label>
        <input type="radio" name={name} value={radioValue} onChange={handleChange} />
        <span>{Firstname}</span>
        <input type="radio" name={name} value={radioValue2} onChange={handleChange} />
        <span>{Secondname}</span>
      </label>

      {/*
        <span className={style.checkMark} style={{ borderColor: error ? 'red' : '' }}></span>
      </label> */}
    </div>
  );
};

export default Radio;
