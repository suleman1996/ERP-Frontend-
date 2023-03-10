import { ChangeEvent } from 'react'

import style from './input.module.scss'

interface Props {
  label?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  value?: string
  name?: string
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
  icon?: string
  onClick?: () => void
  parentClick?: () => void
  errorMessage?: string
  register?: any
  className?: string
  readOnly?: boolean
  isDisable?: boolean
  id?: string
  star?: string
  min?: any
  max?: any
  customValidation?: string
  iconClass?: any
  step?: string
  container?: string
  onKeyDown?: any
}

const TextField = ({
  label,
  onChange,
  value,
  name,
  register,
  onClick,
  parentClick,
  type,
  id,
  className,
  placeholder,
  errorMessage,
  icon,
  readOnly,
  isDisable,
  star,
  min,
  max,
  customValidation,
  iconClass,
  step,
  container,
  ...restOfProps
}: Props) => {
  return (
    <>
      <div className={`${style.inputContainer} ${container} `}>
        {label && (
          <label>
            {label}
            <b style={{ color: '#ff5050' }}>{star}</b>
          </label>
        )}
        <div
          style={{ position: 'relative' }}
          className={className}
          onClick={parentClick}
        >
          <input
            style={{
              border: errorMessage ? '1px solid #ff5050' : '1px solid #E2E2EA',
              backgroundColor: readOnly || isDisable ? '#ddd' : '',
            }}
            id={id}
            min={min && min}
            max={max && max}
            name={name}
            step={step && step}
            value={value}
            onChange={onChange}
            type={type}
            placeholder={placeholder}
            ref={register}
            readOnly={readOnly || false}
            disabled={isDisable || false}
            {...restOfProps}
          />
          {icon && (
            <img
              className={`${style.icon} ${iconClass}`}
              style={{ cursor: 'pointer' }}
              src={icon}
              alt=""
              onClick={onClick}
            />
          )}
        </div>
        {(errorMessage || customValidation) && (
          <span className={style.errorMessage}>
            {errorMessage || customValidation}
          </span>
        )}
      </div>
    </>
  )
}

export default TextField
