import { ChangeEvent, useEffect, useState } from 'react';

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
  marksType?: string;
  setMarkVal?: any;
  marksVal?: any;
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
  marksType,
  marksVal,
  setMarkVal,
}: Props) => {
  const [customErr, setCustomErr] = useState<string | undefined>();

  useEffect(() => {
    if (marksType === 'percentage') {
      if (marksVal >= 100) {
        setCustomErr('Percentage should be less than 100%');
      } else setCustomErr('');
    } else if (marksType === 'cgpa') {
      if (marksVal > 4) {
        setCustomErr('CGPA should be less than or equal to 4');
      } else setCustomErr('');
    }
  }, [marksType, marksVal]);

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
            star={' *'}
            type="number"
            register={register}
            className={style.inputClass}
            placeholder="Marks"
            onChange={(e) => setMarkVal(parseFloat(e.target.value))}
          />
        )}
      </div>
      {errorMessage && <span className={style.errorMessage}>{errorMessage}</span>}
      {customErr && <span className={style.errorMessage}>{customErr}</span>}
    </div>
  );
};

export default Select;
