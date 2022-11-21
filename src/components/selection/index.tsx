import Tags from 'components/tags';
import { ChangeEvent, useState } from 'react';
import { Controller } from 'react-hook-form';

import Select from 'react-select';

import { SelectionStyle } from './custom-styles';

import style from './select.module.scss';

interface Props {
  label?: string;
  name?: string;
  name1?: string;
  children?: JSX.Element[] | JSX.Element;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  register?: any;
  errorMessage?: string;
  placeholder?: string;
  disable?: boolean;
  star?: string;
  selectContainer?: string;
  wraperSelect?: string;
  newSelect?: boolean;
  withInput?: boolean;
  userId?: any;
  marksType?: string;
  classNameLabel?: string;
  setMarkVal?: any;
  marksVal?: any;
  options?: any;
  value?: any;
  closeMenuOnSelect?: boolean;
  isMulti?: boolean;
  control: any;
  isDisabled?: any;
  defaultValue?: any;
  placeHolderStyle?: any;
  showNumber?: Boolean;
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
  classNameLabel,
  defaultValue,
  placeHolderStyle,
  showNumber,
}: Props) => {
  const [customErr, setCustomErr] = useState<string | undefined>();

  const CustomStyle = SelectionStyle;

  if (placeHolderStyle) {
    CustomStyle.placeholder = (styles: any) => ({
      ...styles,
      fontSize: '13px',
      color: placeHolderStyle.color,
    });
  }

  const formatOptionLabel = (
    {
      label,
      value,
      color,
      checkbox,
      box,
    }: { label: any; value: any; color: any; checkbox: any; box: any },
    { context, selectValue }: { context: any; selectValue: any },
    badge: any,
  ): any => {
    return (
      <>
        {context === 'label' ? (
          <div>{label}</div>
        ) : (
          <div style={{ display: 'flex' }}>
            <div
              style={{
                height: '10px',
                width: '10px',
                borderRadius: '50%',
                background: color,
                marginRight: '10px',
                marginTop: '5px',
              }}
            />
            {label}
          </div>
        )}
      </>
    );
  };

  return (
    <div style={{ position: 'relative' }}>
      {label && (
        <div style={{ marginBottom: 7.31 }}>
          <label style={{ color: errorMessage ? '#000' : '#2d2d32' }}>
            {label}
            <b style={{ color: 'red' }}>{star}</b>
          </label>
        </div>
      )}
      <div
        style={{
          border: !errorMessage ? '1px solid #E2E2EA' : '1px solid red',
          borderRadius: '5PX',
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
                          const set = new Set([...(value || ''), ...e.data.options]);
                          handleChange([...set]);
                        }}
                      >
                        <p className={style.groupHeading}>
                          {e?.children?.charAt(0)?.toUpperCase() + e?.children?.slice(1)}
                        </p>
                      </div>
                    ),
                    ...(showNumber && {
                      MultiValue: (props) => {
                        const { getValue, data } = props;
                        const selectedOptions = getValue();
                        const currentOptionIdx = selectedOptions.findIndex(
                          (option) => option?.value === data?.value,
                        );
                        if (selectedOptions.length > 1) {
                          return currentOptionIdx === 0 ? <Tags boxColor={'red'}></Tags> : <></>;
                        } else {
                          return currentOptionIdx === 0 ? (
                            <Tags text={data?.label} boxColor={'#39695B'}></Tags>
                          ) : (
                            <></>
                          );
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
                  formatOptionLabel={(data, metaData) => formatOptionLabel(data, metaData, true)}
                />
              </>
            );
          }}
        />
      </div>
      {errorMessage && <span className={style.errorMessage}>{errorMessage}</span>}
      {customErr && <span className={style.errorMessage}>{customErr}</span>}
    </div>
  );
};

export default Selection;
