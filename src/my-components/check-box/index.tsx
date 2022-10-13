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
  textColor?: string;
}

const Checkbox = ({
  id,
  label,
  handleChange,
  checked,
  name,
  register,
  containerClass,
  textColor,
}: Props) => {
  return (
    <div className={containerClass}>
      <label className={style.container} htmlFor={id}>
        <span className={style.checkMark}></span>
        <input
          name={name}
          ref={register}
          type="checkbox"
          id={id}
          onChange={handleChange}
          checked={checked}
        />
        {label && <p style={{ color: textColor }}>{label}</p>}
      </label>
    </div>
  );
};

export default Checkbox;
