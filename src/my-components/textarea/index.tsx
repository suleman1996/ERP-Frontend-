import React, { ChangeEvent } from 'react';

import style from './textarea.module.scss';

interface Props {
  label?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  icon?: string;
  onClick?: () => void;
  errorMessage?: string;
  register?: any;
  readOnly?: boolean;
  isDisable?: boolean;
  className?: string;
  star?: string;
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
}: Props) => {
  return (
    <>
      <div className={`${style.note} ${className}`}>
        {label && (
          <label style={{ color: errorMessage ? '#ff5050' : '#2d2d32' }}>
            {label} <b style={{ color: 'red' }}>{star}</b>{' '}
          </label>
        )}
        <textarea
          style={{
            border: errorMessage ? '1.2px solid #ff5050' : ' 1.2px solid #e2e2ea',
          }}
          placeholder={placeholder}
          name={name}
          rows={6}
          ref={register}
          disabled={isDisable || false}
        >
          {errorMessage ? <span className={style.errorMessage}>{errorMessage}</span> : ''}
        </textarea>
      </div>
    </>
  );
};

export default TextArea;