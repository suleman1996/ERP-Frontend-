import Loading from 'components/loading';

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
  form?: string;
  hide?: boolean;
  btnTextClass?: string;
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
  form,
  hide,
  btnTextClass,
}: Props) => {
  return (
    <>
      <button
        className={`${style.btn} ${btnClass}`}
        type={type}
        form={form}
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
            {text && (
              <span className={`${style.btnTitle} ${className} ${btnTextClass}`}>{text}</span>
            )}
            {iconEnd && <img src={iconEnd} alt="" className={style.img} />}
          </>
        )}
      </button>
    </>
  );
};

export default Button;
