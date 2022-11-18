import { ChangeEvent } from 'react';

import style from './checkbox.module.scss';

interface Props {
  label?: string;
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  checked?: boolean;
  name?: string;
  register?: any;
  containerClass?: string;
  onClick?: any;
}

const Checkbox = ({
  id,
  label,
  handleChange,
  checked,
  name,
  register,
  containerClass,
  onClick,
}: Props) => {
  return (
    <div className={containerClass}>
      <label className={style.container} htmlFor={id} onClick={onClick}>
        {label && <p>{label}</p>}
        <input
          name={name}
          ref={register}
          type="checkbox"
          id={id}
          onChange={handleChange}
          checked={checked}
        />
        <span className={style.checkMark}></span>
      </label>
    </div>
  );
};

export default Checkbox;
