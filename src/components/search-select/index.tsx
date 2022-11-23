/* eslint-disable @typescript-eslint/no-unused-vars */
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useController } from 'react-hook-form';

import TextField from 'components/textfield';
import Checkbox from 'components/checkbox';

import edit from 'assets/edit.svg';
import delIcon from 'assets/delete.svg';
import arrow from 'assets/arrow-left.svg';
import arrowDown from 'assets/opposite-icon.svg';
import style from './search-select.module.scss';

interface Props {
  label?: string;
  className?: string;
  icons?: string;
  placeholder?: string;
  handleEdit?: MouseEventHandler<HTMLImageElement>;
  handleDelete?: MouseEventHandler<HTMLImageElement>;
  options?: string[];
  name?: string;
  errorMessage?: string;
  control?: any;
  register?: any;
  value?: string;
  star?: string;
  onChange?: (value: any) => void;
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
  } = useController({ control, name: name || '' });

  const [open, setOpen] = useState(false);
  const [list, setList] = useState(options);
  const [selectValue, setSelectValue] = useState('');
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (value == selectValue) return;
    if (value) {
      setSelectValue(value);
    } else {
      setSelectValue('');
    }
  }, [value]);

  useEffect(() => {
    changeHandler && changeHandler(selectValue);
    onChange(selectValue);
  }, [selectValue]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectValue(e.target.value);
    timerRef.current && clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (e.target.value === '') {
        setOpen(false);
      } else {
        setOpen(true);
        setList(
          options?.filter((ele: string) =>
            ele?.toLowerCase().includes(e.target.value.toLowerCase()),
          ),
        );
      }
    }, 100);
  };

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
        onChange={(e) => handleSearch(e)}
        onClick={() => setOpen(!open)}
        className={style.field}
      />
      {open && (
        <div className={style.searchDropdown}>
          {list?.map((ele: string, index: number) => (
            <div className={style.innerDiv} key={index}>
              <p
                onClick={(e: any) => {
                  setOpen(false);
                  setSelectValue(ele);
                }}
              >
                {ele}
              </p>
              {icons && (
                <div className={style.icons}>
                  <div>
                    <Checkbox />
                  </div>
                  <img src={edit} alt="" onClick={handleEdit && handleEdit} />
                  <img src={delIcon} alt="" onClick={handleDelete && handleDelete} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchSelect;
