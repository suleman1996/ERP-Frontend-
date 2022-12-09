import { ChangeEvent, useEffect, useState } from 'react'
import Select from 'react-select'
import { Controller } from 'react-hook-form'

import Tags from 'components/tags'
import TextField from 'components/textfield'

import icon from 'assets/Vector.svg'

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
  backClass?: any
  wraperSelect?: string
  withInput?: boolean
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
  newSelect?: boolean
  userId?: any
  propChange?: any
  getStates?: any
  getCities?: any
  permanentCountryData?: any
  permanentCountryDataa?: any
  currentCountryData?: any
  permanentCitiesData?: any
  changeHandler?: any
  setType?: any
  getDataLabel?: string
  getCitiesLabel?: string
  showNumber?: boolean
  marksType?: any
  setMarkVal?: any
  marksVal?: any
  backStyle?: any
  imgStyle?: any
  valuePag?: any
}

const Selection = ({
  backStyle,
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
  propChange,
  getStates,
  getCities,
  currentCountryData,
  permanentCountryData,
  permanentCountryDataa,
  permanentCitiesData,
  getDataLabel,
  getCitiesLabel,
  changeHandler,
  setType,
  newSelect,
  userId,
  withInput,
  name1,
  register,
  marksType,
  backClass,
  marksVal,
  imgStyle,
  valuePag,
}: Props) => {
  const [customErr, setCustomErr] = useState<string | undefined>()
  useEffect(() => {
    if (marksType?.value === 'percentage') {
      if (marksVal > 100) {
        setCustomErr('Percentage should be less than 100%')
      } else setCustomErr('')
    } else if (marksType?.value === 'cgpa') {
      if (marksVal > 4) {
        setCustomErr('CGPA should be less than or equal to 4')
      } else setCustomErr('')
    }
  }, [marksType, marksVal])

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
        <label className={style.label}>
          {label}
          <b style={{ color: 'red' }}>{star}</b>
        </label>
      )}
      <div
        style={{
          border: errorMessage ? '1px solid #ff5050' : '1px solid #E2E2EA',
          borderRadius: '6px',
          textAlign: 'left',
          marginTop: ' calc(5px + (12 - 5) * (100vw - 280px) / (2560 - 280))',
        }}
        className={`${backClass} ${
          !isDisabled ? wraperSelect : style.disabledSelection
        }`}
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
                    DropdownIndicator: () => (
                      <img
                        src={icon}
                        alt=""
                        style={imgStyle}
                        className={style.imgDropDown}
                      />
                    ),
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
                  onChange={(e) => {
                    setType && setType(e?.value)
                    changeHandler && changeHandler(e.value)
                    propChange && propChange({ country: e.label })

                    getStates &&
                      getStates(`${getDataLabel}`, {
                        country: e.label,
                      })

                    getCities &&
                      getCities(
                        `${getCitiesLabel}`,
                        currentCountryData && currentCountryData,
                        e.label
                      )

                    permanentCountryData &&
                      permanentCountryData('permanentCountryData', {
                        country: e?.label,
                      })

                    permanentCitiesData &&
                      permanentCitiesData(
                        'permanentCitiesData',
                        permanentCountryDataa,
                        e.label
                      )
                    handleChange(e)
                  }}
                  options={options}
                  styles={{
                    control: (styles: any, state: any) => ({
                      ...styles,
                      backgroundColor: '#ffffff',
                      borderRadius: 6,
                      boxShadow: 'none',
                      border: 'transparent !important',
                      fontSize:
                        'calc(12px + (18 - 12) * (100vw - 280px) / (2560 - 280))',
                      minHeight:
                        'calc(30px + (55 - 30) * (100vw - 280px) / (2560 - 280)) !important',
                      paddingLeft:
                        'calc(2px + (7 - 2) * (100vw - 280px) / (2560 - 280)) !important',
                      paddingRight:
                        'calc(2px + (7 - 2) * (100vw - 280px) / (2560 - 280)) !important',
                      borderColor: 'none !important',
                      cursor: 'pointer',
                      height:
                        'calc(30px + (55 - 30) * (100vw - 280px) / (2560 - 280)) !important',
                      ...backStyle,

                      '&:hover': {
                        outline: state.isFocused ? 0 : 0,
                      },
                    }),

                    option: (
                      styles: any,
                      { data, isDisabled, isFocused, isSelected }: any
                    ) => {
                      return {
                        ...styles,
                        backgroundColor: isDisabled
                          ? 'black'
                          : isSelected
                          ? '#57B894'
                          : isFocused
                          ? 'white'
                          : 'white',
                        color: isDisabled
                          ? '#ccc'
                          : isSelected
                          ? 'red  !important'
                          : data.color,
                        fontSize:
                          'calc(12px + (18 - 12) * (100vw - 280px) / (2560 - 280))',
                        cursor: isDisabled ? 'not-allowed' : 'default',
                        '&:active': {
                          backgroundColor: 'white',
                        },
                      }
                    },
                    placeholder: (styles: any) => ({
                      ...styles,
                      fontSize:
                        'calc(12px + (18 - 12) * (100vw - 280px) / (2560 - 280))',
                      color: '#cacaca',
                      fontWeight: '500 !important',
                      textTransform: 'capitalize',
                    }),

                    valueContainer: (provided) => ({
                      ...provided,
                      ...valuePag,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      flexWrap: 'wrap',
                    }),
                    input: (provided) => ({
                      ...provided,
                      minWidth: '20%',
                    }),
                  }}
                  placeholder={placeholder}
                  isDisabled={isDisabled || false}
                  formatOptionLabel={(data, metaData) =>
                    formatOptionLabel(data, metaData, true)
                  }
                  isSearchable={isSearchable}
                />
                {newSelect && <p className={style.labelClass1}>{userId}</p>}
                {withInput && (
                  <div style={{ flex: '1' }}>
                    <TextField
                      star={' *'}
                      type="text"
                      name={name1}
                      value={userId && userId}
                      register={register}
                      className={style.inputClass}
                      placeholder="Marks"
                    />
                  </div>
                )}
              </>
            )
          }}
        />
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

export default Selection
