import { ChangeEvent } from 'react';

import style from './input.module.scss';

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
  className?: string;
  readOnly?: boolean;
  isDisable?: boolean;
  id?: string;
}

const TextField = ({
  label,
  onChange,
  value,
  name,
  register,
  onClick,
  type,
  id,
  className,
  placeholder,
  errorMessage,
  icon,
  readOnly,
  isDisable,
  ...restOfProps
}: Props) => {
  return (
    <>
      <div className={style.inputContainer}>
        {label && <label style={{ color: errorMessage ? '#ff5050' : '#2d2d32' }}>{label}</label>}
        <div style={{ position: 'relative' }} className={className}>
          <input
            style={{
              border: errorMessage ? '1.2px solid #ff5050' : ' 1.2px solid #e2e2ea',
              backgroundColor: readOnly || isDisable ? '#ddd' : '#fff',
            }}
            id={id}
            name={name}
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
              className={style.icon}
              style={{ cursor: 'pointer' }}
              src={icon}
              alt=""
              onClick={onClick}
            />
          )}
        </div>
        {errorMessage && <span className={style.errorMessage}>{errorMessage}</span>}
      </div>
    </>
  );
};

export default TextField;
