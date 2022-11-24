import React, { ChangeEvent } from 'react'

import style from './textarea.module.scss'

interface Props {
  label?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  name?: string
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
  icon?: string
  onClick?: () => void
  errorMessage?: string
  register?: any
  readOnly?: boolean
  isDisable?: boolean
  className?: string
  star?: string
  row?: any
}

const TextArea = ({
  label,
  name,
  register,
  placeholder,
  errorMessage,
  isDisable,
  className,
  star,
  row,
}: Props) => {
  return (
    <>
      <div className={`${style.note} ${className}`}>
        {label && (
          <label>
            {label} <b style={{ color: 'red' }}>{star}</b>{' '}
          </label>
        )}
        <textarea
          style={{
            border: errorMessage
              ? '1.2px solid #ff5050'
              : ' 1.2px solid #e2e2ea',
          }}
          placeholder={placeholder}
          name={name}
          rows={row ? `${row}` : 6}
          ref={register}
          disabled={isDisable || false}
        ></textarea>
        <span>
          {errorMessage ? (
            <span className={style.errorMessage}>{errorMessage}</span>
          ) : (
            ''
          )}
        </span>
      </div>
    </>
  )
}

export default TextArea
