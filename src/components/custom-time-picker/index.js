import { useState, useEffect } from 'react';
import { useController } from 'react-hook-form';

import Select from 'new-components/select';

import style from './time.module.scss';

const CustomTimePicker = ({ control, name, errorMessage }) => {
  const [type, setType] = useState('per-day');
  const [customErr, setCustomErr] = useState();
  const { field } = useController({ control, name, defaultValue: 'HH:MM' });

  useEffect(() => {
    if (type === 'per-day') {
      if (field.value.split(':')[0] > 23) {
        setCustomErr('Hours should be less or equal to 24');
      } else {
        setCustomErr('');
      }
    } else if (type === 'per-week') {
      if (field.value.split(':')[0] > 168) {
        setCustomErr('Hours should be less or equal to 168');
      } else {
        setCustomErr('');
      }
    } else if (type === 'per-month') {
      if (field.value.split(':')[0] > 999) {
        setCustomErr('Hours should be less or equal to 999');
      } else {
        setCustomErr('');
      }
    }
  }, [field.value, type]);
  return (
    <div>
      <label>Time</label>
      <div className={style.wraper} style={{ border: ' 1.2px solid #e2e2ea' }}>
        <Select
          selectContainer={style.selectContainer}
          name={'selectHours'}
          onChange={(e) => setType(e.target.value)}
        >
          <>
            {selectCountry &&
              selectCountry.map(({ value, description }) => (
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
      {errorMessage && <p>{errorMessage}</p>}
      {customErr && <p>{customErr}</p>}
    </div>
  );
};

export default CustomTimePicker;

export const selectCountry = [
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
