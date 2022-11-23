/* eslint-disable @typescript-eslint/no-unused-vars */
import ReactDatePicker from 'react-datepicker'
import { Controller } from 'react-hook-form'

import style from './date.module.scss'
import 'react-datepicker/dist/react-datepicker.css'
import singleArrowRight from 'assets/2.svg'
import singleArrowLeft from 'assets/3.svg'
import './data.css'

interface Props {
  label?: string
  id?: string
  className?: string
  name?: string
  errorMessage?: string
  min?: any
  max?: any
  watch?: any
  control?: any
  defaultVal?: string
  star?: string
}

const MonthYearPicker = ({
  control,
  label,
  className,
  defaultVal,
  star,
  name,
  errorMessage,
  min,
  max,
  watch,
}: Props) => {
  return (
    <>
      <div className={`${style.main} ${className}`}>
        {label && (
          <label
            style={{ color: errorMessage && '#000' }}
            className={style.label}
          >
            {label}
            <b style={{ color: 'red' }}>{star}</b>
          </label>
        )}

        <Controller
          name={name || ''}
          control={control}
          defaultValue={defaultVal || null}
          render={({ onChange, value }) => {
            return (
              <>
                <ReactDatePicker
                  id={name}
                  name={name}
                  selected={value == 'Invalid Date' ? null : value || null}
                  className={errorMessage ? style.borderClass : style.inpDiv}
                  onChange={onChange}
                  value={watch(name) ? defaultVal : value}
                  selectsStart
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  placeholderText="MM/yyyy"
                  minDate={min}
                  maxDate={max}
                  renderCustomHeader={({
                    date,
                    increaseYear,
                    decreaseYear,
                    prevYearButtonDisabled,
                    nextYearButtonDisabled,
                  }) => (
                    <div className={style.iconsDiv}>
                      <button
                        type={'button'}
                        onClick={decreaseYear}
                        disabled={prevYearButtonDisabled}
                      >
                        <img src={singleArrowLeft} alt="" />
                      </button>
                      <p>{date.getFullYear()}</p>
                      <button
                        type={'button'}
                        onClick={increaseYear}
                        disabled={nextYearButtonDisabled}
                      >
                        <img src={singleArrowRight} alt="" />
                      </button>
                    </div>
                  )}
                />
              </>
            )
          }}
        />

        {errorMessage ? (
          <span className={style.errorMessage}>{errorMessage}</span>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default MonthYearPicker
