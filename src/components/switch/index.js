import React from 'react'
import { Controller } from 'react-hook-form'

import style from './switch.module.scss'

const Switch = ({
  label,
  title,
  control,
  name,
  className,
  handleClick,
  switchContainer,
  errorMessage,
  handleSwitchChange,
  ...restOfProps
}) => {
  return (
    <div>
      {label && <p className={style.titleClass}>{label}</p>}
      <div
        className={`${style.mainClass} ${className}`}
        onClick={handleClick && handleClick}
      >
        <label className={`${style.switch}  ${switchContainer} `}>
          <Controller
            name={name}
            control={control}
            render={({ onChange, value }) => {
              return (
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => {
                    onChange?.(e.target.checked)
                    handleSwitchChange?.(e.target.checked)
                  }}
                  {...restOfProps}
                />
              )
            }}
          />

          <span className={`${style.slider} ${style.round}`}></span>
        </label>
        <h6>{title}</h6>
      </div>
      {errorMessage ? (
        <span className={style.errorMessage}>{errorMessage}</span>
      ) : (
        ''
      )}
    </div>
  )
}

export default Switch
