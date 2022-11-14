import { ChangeEvent, useState } from 'react';
import { Controller } from 'react-hook-form';

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
  classNameLabel?: string;
  setMarkVal?: any;
  marksVal?: any;
  options?: any;
  value?: any;
  closeMenuOnSelect?: boolean;
  isMulti?: boolean;
  control: any;
  isDisabled?: any;
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
  name,
  control,
  isDisabled,
  classNameLabel,
}: Props) => {
  const [customErr, setCustomErr] = useState<string | undefined>();

  const CustomStyle = SelectionStyle;

  return (
    <div style={{ position: 'relative' }}>
      {label && (
        <div style={{ marginBottom: 7.31 }}>
          <label style={{ color: errorMessage ? '#000' : '#2d2d32' }}>
            {label}
            <b style={{ color: 'red' }}>{star}</b>
          </label>
        </div>
      )}
      <div
        style={{
          border: !errorMessage ? '1px solid #E2E2EA' : '1px solid red',
          borderRadius: '5PX',
          // marginTop: '7px',
        }}
        className={!isDisabled ? wraperSelect : style.disabledSelection}
      >
        <Controller
          name={name}
          control={control}
          render={({ onChange, value }) => {
            return (
              <>
                <Select
                  components={{
                    GroupHeading: (e) => (
                      <div onClick={() => onChange([...e.data.options])}>
                        <p className={style.groupHeading}>
                          {e?.children?.charAt(0)?.toUpperCase() + e?.children?.slice(1)}
                        </p>
                      </div>
                    ),
                  }}
                  closeMenuOnSelect={closeMenuOnSelect}
                  isMulti={isMulti}
                  value={value}
                  onChange={onChange}
                  options={options}
                  styles={CustomStyle}
                  placeholder={placeholder}
                  isDisabled={isDisabled || false}
                />
              </>
            );
          }}
        />
      </div>
      {errorMessage && <span className={style.errorMessage}>{errorMessage}</span>}
      {customErr && <span className={style.errorMessage}>{customErr}</span>}
    </div>
  );
};

export default Selection;
