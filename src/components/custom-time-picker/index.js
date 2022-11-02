import { useState, useEffect } from 'react';
import { useController } from 'react-hook-form';

import Select from 'components/select';

import style from './time.module.scss';

const CustomTimePicker = ({
  control,
  name,
  errorMessage,
  setCustomErr,
  customErr,
  setType,
  type,
  star,
}) => {
  const { field } = useController({ control, name, defaultValue: 'HH:MM' });

  useEffect(() => {
    if (type === 'per-day') {
      if (field.value.split(':')[0] > 23 || field.value.split(':')[1] > 59) {
        setCustomErr('Hours should be less or equal to 23:59');
      } else {
        setCustomErr('');
      }
    }
    if (type === 'per-week') {
      if (field.value.split(':')[0] > 167 || field.value.split(':')[1] > 59) {
        setCustomErr('Hours should be less or equal to 167:59');
      } else {
        setCustomErr('');
      }
    }
    if (type === 'per-month') {
      if (field.value.split(':')[0] > 719 || field.value.split(':')[1] > 59) {
        setCustomErr('Hours should be less or equal to 719:59');
      } else {
        setCustomErr('');
      }
    }
  }, [field.value, type, selectHoursDuration]);
  return (
    <div>
      <label>
        Working Hours <b style={{ color: 'red' }}>{star}</b>
      </label>
      <div className={style.wraper} style={{ border: ' 1.2px solid #e2e2ea' }}>
        <Select
          selectContainer={style.selectContainer}
          name={'selectHours'}
          value={type && type}
          onChange={(e) => setType(e.target.value)}
        >
          <>
            {selectHoursDuration &&
              selectHoursDuration.map(({ value, description }) => (
                <option key={value} value={value}>
                  {description}
                </option>
              ))}
          </>
        </Select>
        <input
          type="number"
          placeholder="HH"
          value={field.value.split(':')[0]}
          onChange={(e) => field.onChange(e.target.value + ':' + field.value.split(':')[1])}
        />
        <div className={style.centerDiv}>:</div>
        <input
          type="number"
          placeholder="MM"
          value={field.value.split(':')[1]}
          onChange={(e) => field.onChange(field.value.split(':')[0] + ':' + e.target.value)}
        />
      </div>
      {/* {customErr && <p className={style.error}>{customErr}</p>} */}
      {errorMessage && <p className={style.error}>{errorMessage}</p>}
    </div>
  );
};

export default CustomTimePicker;

export const selectHoursDuration = [
  {
    value: 'per-day',
    description: 'Per Day',
  },
  {
    value: 'per-week',
    description: 'Per Week',
  },
  {
    value: 'per-month',
    description: 'Per Month ',
  },
];
