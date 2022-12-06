import { useEffect } from 'react'
import { useController } from 'react-hook-form'
import Selection from 'components/selection'

import style from './time.module.scss'

interface Props {
  control?: any
  name?: any
  errorMessage?: any
  setCustomErr?: any
  customErr?: any
  setType?: any
  type?: any
  star?: any
  selectHoursDuration?: any
  label?: string
}

const CustomTimePicker = ({
  control,
  name,
  label,
  errorMessage,
  setCustomErr,
  setType,
  type,
  star,
  selectHoursDuration,
}: Props) => {
  const { field } = useController({ control, name, defaultValue: 'HH:MM' })

  // console.log('inner type', type)

  useEffect(() => {
    if (type === 'per-day') {
      if (field.value.split(':')[0] > 23 || field.value.split(':')[1] > 59) {
        setCustomErr('Hours should be less or equal to 23:59')
      } else {
        setCustomErr('')
      }
    }
    if (type === 'per-week') {
      if (field.value.split(':')[0] > 167 || field.value.split(':')[1] > 59) {
        setCustomErr('Hours should be less or equal to 167:59')
      } else {
        setCustomErr('')
      }
    }
    if (type === 'per-month') {
      if (field.value.split(':')[0] > 719 || field.value.split(':')[1] > 59) {
        setCustomErr('Hours should be less or equal to 719:59')
      } else {
        setCustomErr('')
      }
    }
  }, [field.value, type, selectHoursDuration])
  return (
    <div>
      <label>
        {label}
        <b style={{ color: '#ff5050' }}>{star}</b>
      </label>
      <div className={style.wraper} style={{ border: ' 1.2px solid #e2e2ea' }}>
        <Selection
          name={'selectHours'}
          control={control}
          value={type && type}
          setType={setType}
          options={selectHoursDuration}
        />

        <input
          type="number"
          placeholder="HH"
          value={field?.value?.split(':')[0]}
          onChange={(e) =>
            field.onChange(e.target.value + ':' + field.value.split(':')[1])
          }
        />
        <div className={style.centerDiv}>:</div>
        <input
          type="number"
          placeholder="MM"
          value={field.value?.split(':')[1]}
          onChange={(e) =>
            field.onChange(field.value.split(':')[0] + ':' + e.target.value)
          }
        />
      </div>
      {/* {customErr && <p className={style.error}>{customErr}</p>} */}
      {errorMessage && <p className={style.error}>{errorMessage}</p>}
    </div>
  )
}

export default CustomTimePicker
