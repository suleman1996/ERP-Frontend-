/* eslint-disable @typescript-eslint/no-unused-vars */
import { MouseEventHandler, useEffect, useRef, useState } from 'react'
import { useController } from 'react-hook-form'

import TextField from 'components/textfield'

import arrow from 'assets/arrow-left.svg'
import style from './search-select.module.scss'
import NoData from 'components/no-data-found-card'

interface Props {
  label?: string
  className?: string
  icons?: string
  placeholder?: string
  handleEdit?: MouseEventHandler<HTMLImageElement>
  handleDelete?: MouseEventHandler<HTMLImageElement>
  options?: string[]
  name?: string
  errorMessage?: string
  control?: any
  register?: any
  value?: string
  star?: string
  onChange?: (value: any) => void
}

const SearchSelect = ({
  label,
  placeholder,
  className,
  handleDelete,
  handleEdit,
  icons,
  options,
  value,
  name,
  errorMessage,
  control,
  register,
  star,
  onChange: changeHandler,
}: Props) => {
  const {
    field: { onChange },
  } = useController({ control, name: name || '' })

  const [open, setOpen] = useState(false)
  const [list, setList] = useState(options)
  const [selectValue, setSelectValue] = useState('')
  const timerRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (value == selectValue) return
    if (value) {
      setSelectValue(value)
    } else {
      setSelectValue('')
    }
  }, [value])

  useEffect(() => {
    changeHandler && changeHandler(selectValue)
    onChange(selectValue)
  }, [selectValue])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectValue(e.target.value)
    timerRef.current && clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      if (e.target.value === '') {
        setOpen(false)
      } else {
        setOpen(true)
        setList(
          options?.filter((ele: string) =>
            ele.toLowerCase().includes(e.target.value.toLowerCase())
          )
        )
      }
    }, 100)
  }

  return (
    <div className={`${style.searchSelect} ${className}`}>
      <TextField
        label={label}
        star={star}
        name={name}
        errorMessage={errorMessage}
        placeholder={placeholder}
        value={selectValue}
        type="text"
        icon={arrow}
        onChange={(e) => handleSearch(e)}
        onClick={() => setOpen(!open)}
        className={style.field}
      />
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            inset: 0,
            backgroundColor: 'transparent',
            position: 'fixed',
          }}
        ></div>
      )}
      {open && (
        <div className={style.searchDropdown}>
          {list?.length > 0 ? (
            list?.map((ele: string, index: number) => (
              <div className={style.innerDiv} key={index}>
                <p
                  onClick={(e: any) => {
                    setOpen(false)
                    setSelectValue(ele)
                  }}
                >
                  {ele}
                </p>
              </div>
            ))
          ) : (
            <div className={style.noDatas}>
              <p>No data found</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchSelect
