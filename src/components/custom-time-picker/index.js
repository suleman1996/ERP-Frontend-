import Select from 'new-components/select';
import { useController } from 'react-hook-form';

import style from './time.module.scss';

const CustomTimePicker = ({ control, name, errorMessage }) => {
  const { field } = useController({ control, name, defaultValue: '00:00' });
  return (
    <div>
      <label>Time</label>
      <div className={style.wraper} style={{ border: ' 1.2px solid #e2e2ea' }}>
        <Select selectContainer={style.selectContainer}>
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
      {/* // will be use in future */}
      {/* {errorMessage && <p>{errorMessage}</p>} */}
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
    value: 'per-Month',
    description: 'Per Month ',
  },
];
