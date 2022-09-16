import Loading from 'new-components/loading';

import style from './button.module.scss';

interface Props {
  text?: string;
  iconStart?: string;
  iconEnd?: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset' | undefined;
  isLoading?: boolean;
  btnClass?: string;
  disabled?: boolean;
  btnLoaderClass?: string;
  className?: string;
}

const Button = ({
  text,
  iconStart,
  iconEnd,
  handleClick,
  type,
  className,
  isLoading,
  btnClass,
  disabled,
  btnLoaderClass,
}: Props) => {
  return (
    <>
      <button
        className={`${style.btn} ${btnClass}`}
        type={type}
        onClick={handleClick}
        disabled={isLoading || disabled ? true : false}
        style={{
          pointerEvents: isLoading || disabled ? 'none' : 'auto',
        }}
      >
        {isLoading ? (
          <Loading loaderClass={btnLoaderClass} />
        ) : (
          <>
            {iconStart && <img src={iconStart} alt="" className={style.img1} />}
            {text && <span className={`${style.btnTitle} ${className}`}>{text}</span>}
            {iconEnd && <img src={iconEnd} alt="" className={style.img} />}
          </>
        )}
      </button>
    </>
  );
};

export default Button;
