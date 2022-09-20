import { ChangeEvent } from 'react';

import style from './select.module.scss';

interface Props {
  label?: string;
  value?: string;
  name?: string;
  children?: JSX.Element[] | JSX.Element;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  register?: any;
  errorMessage?: string;
  placeholder?: string;
  disable?: boolean;
}

const Select = ({
  label,
  value,
  name,
  onChange,
  register,
  errorMessage,
  disable,
  children,
  placeholder,
}: Props) => {
  return (
    <div style={{ position: 'relative' }}>
      {label && <label style={{ color: errorMessage ? '#ff5050' : '#2d2d32' }}>{label}</label>}
      <select
        name={name}
        value={value}
        ref={register}
        className={style.select}
        placeholder={placeholder}
        onChange={onChange}
        style={{
          border: errorMessage ? '1.2px solid #ff5050' : ' 1.2px solid #e2e2ea',
        }}
        disabled={disable || false}
      >
        {children}
      </select>
      {errorMessage && <span className={style.errorMessage}>{errorMessage}</span>}
    </div>
  );
};

export default Select;
