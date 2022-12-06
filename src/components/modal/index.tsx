import Button from 'components/button'

import cross from 'assets/cross.svg'
import deleteIcon from 'assets/delete-Icon.svg'
import edit from 'assets/edit-icon.png'

import style from './modal.module.scss'
interface Props {
  open?: boolean
  children?: JSX.Element[] | JSX.Element
  className?: string
  title?: string
  btnClass?: string
  handleClose?: () => void
  text?: string
  type?: 'button' | 'submit' | 'reset' | undefined
  iconStart?: string
  iconEnd?: string
  handleClick?: () => void
  form?: string
  customHeader?: string
  loader?: boolean
  handleEdit?: any
  handleDelete?: any
  titleClass?: string
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
  handleClick,
  type,
  btnClass,
  form,
  loader,
  customHeader,
  handleEdit,
  handleDelete,
  titleClass,
}: Props) => {
  const handleClickWrapper = (event: React.MouseEvent<HTMLElement>): void => {
    event.nativeEvent.stopImmediatePropagation()
    handleClose?.()
  }
  return (
    <>
      {open && (
        <div
          className={style.modalWrapper}
          onClick={(e) => handleClickWrapper(e)}
        >
          <div
            className={`${style.modalContentWrapper} ${className}`}
            onClick={(e) => e.stopPropagation()}
          >
            {title && (
              <div className={style.fixedClass}>
                <div className={`${style.header} ${customHeader}`}>
                  <p className={titleClass}>{title}</p>
                  <div className={style.iconDiv}>
                    {handleEdit && (
                      <img
                        src={edit}
                        alt="edit icon"
                        onClick={handleEdit}
                        className={style.delIcon}
                      />
                    )}
                    {handleDelete && (
                      <img
                        src={deleteIcon}
                        alt="delete icon"
                        onClick={handleDelete}
                        className={style.delIcon}
                      />
                    )}
                    <img src={cross} alt="close icon" onClick={handleClose} />
                  </div>
                </div>
              </div>
            )}
            <div className={`${style.body} ${className}`}>
              {children}
              {text && (
                <div className={`${style.btnClass}  ${btnClass}  `}>
                  <Button
                    text={text}
                    isLoading={loader}
                    iconStart={iconStart}
                    iconEnd={iconEnd}
                    type={type}
                    form={form}
                    handleClick={handleClick}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default Modal
