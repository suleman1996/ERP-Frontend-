import { Controller } from 'react-hook-form';

import { MultiSelect } from 'react-multi-select-component';

import './styles.css';
import style from './multi.module.scss';

export default function MultiPicker({
  label,
  star,
  errorMessage,
  options,
  name,
  control,
  customValidation,
}: any) {
  return (
    <div>
      {label && (
        <label
          style={{
            color: errorMessage ? '#000' : '#2d2d32',
          }}
        >
          {label}
          <b style={{ color: 'red' }}>{star}</b>
        </label>
      )}
      <div
        style={{
          marginTop: 'calc(5px + 7 * (100vw - 280px) / 2280)',
          border: errorMessage ? '1.2px solid #ff5050' : undefined,
        }}
        className={style.container}
      >
        <Controller
          name={name}
          control={control}
          render={({ onChange, value }) => {
            return (
              <MultiSelect
                options={options}
                value={value || []}
                onChange={onChange}
                labelledBy="Select"
                className="wrapper"
              />
            );
          }}
        />
        {(errorMessage || customValidation) && (
          <span className={style.errorMessage}>{errorMessage || customValidation}</span>
        )}
      </div>
    </div>
  );
}
