import { ChangeEvent, useState } from 'react'
import Select from 'react-select'
import { Controller } from 'react-hook-form'

import Tags from 'components/tags'

import { SelectionStyle } from './custom-styles'

import style from './select.module.scss'

interface Props {
  label?: string
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
  classNameLabel?: string
  setMarkVal?: any
  marksVal?: any
  options?: any
  value?: any
  closeMenuOnSelect?: boolean
  isMulti?: boolean
  control: any
  isDisabled?: any
  defaultValue?: any
  placeHolderStyle?: any
  isSearchable?: boolean
  showNumber?: boolean
}

const Selection = ({
  label,
  options,
  errorMessage,
  star,
  wraperSelect,
  placeholder,
  closeMenuOnSelect,
  isMulti,
  name,
  control,
  isDisabled,
  defaultValue,
  placeHolderStyle,
  isSearchable,
  showNumber,
}: Props) => {
  const [customErr] = useState<string | undefined>()

  const CustomStyle = SelectionStyle

  if (placeHolderStyle) {
    CustomStyle.placeholder = (styles: any) => ({
      ...styles,
      fontSize: '13px',
      color: placeHolderStyle.color,
      ...(placeHolderStyle?.fontSize && {
        fontSize: placeHolderStyle?.fontSize,
      }),
    })
  }

  const formatOptionLabel = (
    {
      label,
      color,
    }: { label: any; value: any; color: any; checkbox: any; box: any },
    { context, selectValue }: { context: any; selectValue: any }
  ): any => {
    return (
      <div>
        {context === 'label' ? (
          <div>{label}</div>
        ) : (
          <div
            style={{
              display: 'flex',
              ...(context === 'menu' &&
                selectValue?.some((el: any) => el?.label === label) && {
                  color: 'white',
                }),
            }}
          >
            {color && (
              <div
                className={style.label}
                style={{
                  background: color,
                }}
              />
            )}
            {label}
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{ position: 'relative' }}>
      {label && (
        <div style={{ marginBottom: 7.31 }}>
          <label>
            {label}
            <b style={{ color: 'red' }}>{star}</b>
          </label>
        </div>
      )}
      <div
        style={{
          border: errorMessage ? '1px solid #ff5050' : '1px solid #E2E2EA',
          borderRadius: '6px',
        }}
        className={!isDisabled ? wraperSelect : style.disabledSelection}
      >
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ onChange: handleChange, value }) => {
            return (
              <>
                <Select
                  components={{
                    GroupHeading: (e) => (
                      <div
                        onClick={() => {
                          const set = new Set([
                            ...(value || ''),
                            ...e.data.options,
                          ])
                          handleChange([...set])
                        }}
                      >
                        <p className={style.groupHeading}>
                          {e?.children?.charAt(0)?.toUpperCase() +
                            e?.children?.slice(1)}
                        </p>
                      </div>
                    ),

                    ...(showNumber && {
                      MultiValue: (props) => {
                        const { getValue, data } = props
                        const selectedOptions = getValue()
                        const currentOptionIdx = selectedOptions.findIndex(
                          (option) => option?.value === data?.value
                        )
                        if (selectedOptions.length > 1) {
                          return currentOptionIdx === 0 ? (
                            <>
                              <Tags
                                text={data?.label}
                                boxColor={'#57B894'}
                                textColor={'#ffffff'}
                              />
                              <Tags
                                text={`+ ${selectedOptions.length - 1} more`}
                                boxColor={'pink'}
                              />
                            </>
                          ) : null
                        } else {
                          return currentOptionIdx === 0 ? (
                            <Tags
                              text={data?.label}
                              boxColor={'#57B894'}
                              textColor={'#ffffff'}
                            />
                          ) : (
                            <></>
                          )
                        }
                      },
                    }),
                  }}
                  hideSelectedOptions={false}
                  closeMenuOnSelect={closeMenuOnSelect}
                  isMulti={isMulti}
                  value={value}
                  onChange={handleChange}
                  options={options}
                  styles={CustomStyle}
                  placeholder={placeholder}
                  isDisabled={isDisabled || false}
                  formatOptionLabel={(data, metaData) =>
                    formatOptionLabel(data, metaData, true)
                  }
                  isSearchable={isSearchable}
                />
              </>
            )
          }}
        />
      </div>
      {errorMessage && (
        <span className={style.errorMessage}>{errorMessage}</span>
      )}
      {customErr && <span className={style.errorMessage}>{customErr}</span>}
    </div>
  )
}

export default Selection
