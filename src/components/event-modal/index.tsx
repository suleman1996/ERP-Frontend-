import Button from 'components/button';

import cross from 'assets/cross.svg';

import style from './modal.module.scss';
interface Props {
  open: any;
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
  loader?: boolean;
}

const EventModal = ({
  open,
  children,
  className,
  handleClose,
  title,
  text,
  iconStart,
  iconEnd,
  handleClick,
  type,
  btnClass,
  form,
  loader,
}: Props) => {
  return (
    <>
      {open && (
        <div className={style.modalWrapper}>
          <div
            className={`${style.modalContentWrapper} ${className}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={style.body}>
              {children}
              <div className={`${style.btnClass}  ${btnClass}  `}>
                {text && (
                  <Button
                    text={text}
                    isLoading={loader}
                    iconStart={iconStart}
                    iconEnd={iconEnd}
                    type={type}
                    form={form}
                    handleClick={handleClick}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default EventModal;
