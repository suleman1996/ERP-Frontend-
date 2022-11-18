import { ChangeEvent } from 'react';

import plus from 'assets/plus-check.svg';
import minus from 'assets/minus-check.svg';

import style from './plus.module.scss';

interface Props {
  label?: string;
  onClick?: any;
  id?: string;
  checked?: boolean;
  name?: string;
  register?: any;
  containerClass?: string;
  afterClass?: any;
}

const PlusMinusCheckbox = ({ onClick, label, afterClass }: Props) => {
  return (
    <>
      <div className={`${style.plus_minus} ${afterClass}`}>
        <input type="checkbox" name="a" hidden id="a" className={style.css_checkbox} />
        <label htmlFor="a" className={style.css_label} onClick={onClick}>
          <img src={plus} alt="" className={`${style.fa} ${style.fa_plus}`} />
          <img src={minus} alt="" className={`${style.fa} ${style.fa_minus}`} />
        </label>
        <p>{label}</p>
      </div>
    </>
  );
};

export default PlusMinusCheckbox;
