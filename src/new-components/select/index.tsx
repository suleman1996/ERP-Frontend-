import { ChangeEvent } from 'react';

import TextField from 'new-components/textfield';

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
  star?: string;
  selectContainer?: string;
  wraperSelect?: string;
  newSelect?: boolean;
  withInput?: boolean;
  userId?: any;
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
  star,
  selectContainer,
  wraperSelect,
  newSelect,
  userId,
  withInput,
}: Props) => {
  return (
    <div style={{ position: 'relative' }}>
      {label && (
        <label style={{ color: errorMessage ? '#ff5050' : '#2d2d32' }}>
          {label} <b style={{ color: 'red' }}>{star}</b>{' '}
        </label>
      )}
      <div className={wraperSelect}>
        <select
          name={name}
          value={value}
          ref={register}
          className={`${style.select}  ${selectContainer}  `}
          placeholder={placeholder}
          onChange={onChange}
          style={{
            border: errorMessage ? '1.2px solid #ff5050' : ' 1.2px solid #e2e2ea',
          }}
          disabled={disable || false}
        >
          {children}
        </select>
        {newSelect && <p>{userId}</p>}
        {withInput && (
          <TextField
            name="degree"
            // label="Degree"
            star={' *'}
            type="text"
            register={register}
            className={style.inputClass}
            // errorMessage={errors?.degree?.message}
            placeholder="Marks"
          />
        )}
      </div>
      {errorMessage && <span className={style.errorMessage}>{errorMessage}</span>}
    </div>
  );
};

export default Select;
