import TextField from 'components/textfield'
import { ChangeEvent, useEffect, useState } from 'react'
import style from './select.module.scss'
interface Props {
  label?: string
  value?: string
  name?: string
  name1?: string
  children?: JSX.Element[] | JSX.Element
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
  register?: any
  errorMessage?: string
  placeholder?: string
  disable?: boolean
  star?: string
  selectContainer?: string
  wraperSelect?: string
  newSelect?: boolean
  withInput?: boolean
  userId?: any
  marksType?: string
  setMarkVal?: any
  marksVal?: any
}
const Select = ({
  label,
  value,
  name,
  name1,
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
}: Props) => {
  const [customErr, setCustomErr] = useState<string | undefined>()
  useEffect(() => {
    if (marksType === 'percentage') {
      if (marksVal > 100) {
        setCustomErr('Percentage should be less than 100%')
      } else setCustomErr('')
    } else if (marksType === 'cgpa') {
      if (marksVal > 4) {
        setCustomErr('CGPA should be less than or equal to 4')
      } else setCustomErr('')
    }
  }, [marksType, marksVal])
  return (
    <div style={{ position: 'relative' }}>
      {label && (
        <label className={style.label}>
          {label} <b style={{ color: 'red' }}>{star}</b>{' '}
        </label>
      )}
      <div className={`${wraperSelect}  ${style.containerWraper} `}>
        <select
          value={value}
          name={name}
          className={`${style.select}  ${selectContainer}  `}
          placeholder={placeholder}
          style={{
            border: errorMessage ? '1px solid #ff5050' : '1px solid #E2E2EA',
          }}
          disabled={disable || false}
          ref={register}
          onChange={onChange}
        >
          {children}
        </select>
        {newSelect && <p>{userId}</p>}
        {withInput && (
          <div style={{ flex: '1' }}>
            <TextField
              star={' *'}
              type="text"
              name={name1}
              register={register}
              className={style.inputClass}
              placeholder="Marks"
            />
          </div>
        )}
      </div>
      {customErr && <span className={style.errorMessage}>{customErr}</span>}
      {!customErr
        ? errorMessage && (
            <span className={style.errorMessage}>{errorMessage}</span>
          )
        : ''}
    </div>
  )
}
export default Select
