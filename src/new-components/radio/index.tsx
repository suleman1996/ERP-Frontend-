import style from './radio.module.scss';

interface Props {
  label?: string;
  id?: string;
  name?: string;
  handleClick?: () => void;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  radioRef?: any;
  radioValue?: number | string;
  error?: boolean;
  errorMessage?: string;
  className?: string;
  defaultChecked?: boolean;
}

const Radio = ({
  label,
  id,
  handleClick,
  name,
  handleChange,
  checked,
  radioRef,
  radioValue,
  error,
  className,
  defaultChecked,
}: Props) => {
  return (
    <div>
      <label className={`${style.container} ${className}`} htmlFor={id}>
        <p> {label}</p>
        <input
          type="radio"
          name={name}
          id={id}
          onClick={handleClick}
          onChange={handleChange}
          checked={checked}
          ref={radioRef}
          value={radioValue}
          defaultChecked={defaultChecked}
        />
        <span className={style.checkMark} style={{ borderColor: error ? 'red' : '' }}></span>
      </label>
    </div>
  );
};

export default Radio;
