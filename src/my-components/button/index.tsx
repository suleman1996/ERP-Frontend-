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
  size?: string | number | undefined | any;
  textColor?: string;
  borderColor?: string;
  backgroundColor?: string;
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
  size,
  textColor,
  borderColor,
  backgroundColor,
}: Props) => {
  return (
    <>
      <button
        className={`${style.btn} ${btnClass}`}
        type={type}
        onClick={handleClick}
        disabled={isLoading || disabled ? true : false}
        style={{
          height:
            size === 'sm'
              ? 22
              : size === 'md'
              ? 24
              : size === 'lg'
              ? 45
              : size === 'xl'
              ? 64
              : undefined,
          width:
            size === 'sm'
              ? 92
              : size === 'md'
              ? 98
              : size === 'lg'
              ? 180
              : size === 'xl'
              ? 271
              : undefined,
          border: borderColor,
          backgroundColor: backgroundColor,
        }}
      >
        {isLoading ? (
          <Loading loaderClass={btnLoaderClass} />
        ) : (
          <>
            {iconStart && <img src={iconStart} alt="" className={style.img1} />}
            {text && (
              <span
                className={`${style.btnTitle} ${className}`}
                style={{
                  color: textColor,
                  fontSize:
                    size === 'sm'
                      ? 8
                      : size === 'md'
                      ? 9
                      : size === 'lg'
                      ? 16
                      : size === 'xl'
                      ? 22
                      : undefined,
                }}
              >
                {text}
              </span>
            )}
            {iconEnd && <img src={iconEnd} alt="" className={style.img} />}
          </>
        )}
      </button>
    </>
  );
};

export default Button;
