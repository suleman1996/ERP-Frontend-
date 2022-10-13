import Button from 'new-components/button';

import cross from 'new-assets/cross.svg';
import style from './modal.module.scss';
interface Props {
  open: boolean;
  children: JSX.Element[] | JSX.Element;
  className?: string;
  title?: string;
  btnClass?: string;
  handleClose: () => void;
  text: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  iconStart?: string;
  iconEnd?: string;
  handleClick?: () => void;
  form?: string;
}

const Modal = ({
  open,
  children,
  className,
  handleClose,
  title,
  text,
  iconStart,
  iconEnd,
  // handleClick,
  type,
  btnClass,
  form,
}: Props) => {
  const handleClickWrapper = (event: React.MouseEvent<HTMLElement>): void => {
    event.nativeEvent.stopImmediatePropagation();
    handleClose?.();
  };

  return (
    <>
      {open && (
        <div className={style.modalWrapper} onClick={(e) => handleClickWrapper(e)}>
          <div
            className={`${style.modalContentWrapper} ${className}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={style.header}>
              <p>{title}</p>
              <img src={cross} alt="close icon" onClick={handleClose} />
            </div>
            <div className={style.body}>
              {children}
              <div className={`${style.btnClass}  ${btnClass}  `}>
                <Button
                  text={text}
                  iconStart={iconStart}
                  iconEnd={iconEnd}
                  type={type}
                  form={form}
                  // handleClick={handleClick}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
