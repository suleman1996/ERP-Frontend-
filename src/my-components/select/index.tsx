import { ChangeEvent, useState } from 'react';

import Select from 'react-select';

import { SelectionStyle } from './custom-styles';
import style from './select.module.scss';

interface Props {
  label?: string;
  name?: string;
  name1?: string;
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
  options?: any;
  value?: any;
  closeMenuOnSelect?: boolean;
  isMulti?: boolean;
}

const Selection = ({
  label,
  options,
  errorMessage,
  star,
  wraperSelect,
  value,
  onChange,
  placeholder,
  closeMenuOnSelect,
  isMulti,
}: Props) => {
  const [customErr, setCustomErr] = useState<string | undefined>();

  const CustomStyle = SelectionStyle;

  return (
    <div style={{ position: 'relative' }}>
      {label && (
        <label style={{ color: errorMessage ? '#ff5050' : '#2d2d32' }}>
          {label}
          <b style={{ color: 'red' }}>{star}</b>
        </label>
      )}
      <div className={wraperSelect}>
        <Select
          closeMenuOnSelect={closeMenuOnSelect}
          isMulti={isMulti}
          value={value}
          onChange={onChange}
          options={options}
          styles={CustomStyle}
          placeholder={placeholder}
        />
      </div>
      {errorMessage && <span className={style.errorMessage}>{errorMessage}</span>}
      {customErr && <span className={style.errorMessage}>{customErr}</span>}
    </div>
  );
};

export default Selection;
