import React from 'react';

import style from './switch.module.scss';

const Switch = ({
  label,
  title,
  register,
  name,
  className,
  checked,
  handleClick,
  switchContainer,
  onChange,
  errorMessage,
  ...restOfProps
}) => {
  return (
    <div>
      {label && <p className={style.titleClass}>{label}</p>}
      <div className={`${style.mainClass} ${className}`} onClick={handleClick && handleClick}>
        <label className={`${style.switch}  ${switchContainer} `}>
          <input
            type="checkbox"
            checked={checked}
            onChange={onChange && onChange}
            {...restOfProps}
            {...(register && register(name))}
          />
          <span className={`${style.slider} ${style.round}`}></span>
        </label>
        <h6>{title}</h6>
      </div>
      {errorMessage ? <span className={style.errorMessage}>{errorMessage}</span> : ''}
    </div>
  );
};

export default Switch;
