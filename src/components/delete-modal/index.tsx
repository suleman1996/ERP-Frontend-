import React, { Dispatch, memo, SetStateAction } from 'react';

import Modal from 'components/modal';
import Button from 'components/button';

import cross from 'assets/delete-cross.svg';
import style from './delete-modal.module.scss';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleDelete?: () => void;
  btnLoader?: boolean;
}

const DeletePopup = ({ open, setOpen, handleDelete, btnLoader }: Props) => {
  return (
    <>
      <Modal open={open} handleClose={() => setOpen(false)} className={style.wrapperModal}>
        <div className={style.emailPopupContentDiv}>
          <div className={style.headerDiv}>
            <img src={cross} alt="" />
            <h1>Are you sure you want to delete this?</h1>
            <p>If you delete this you can’t recover it</p>
          </div>
          <div className={style.flex}>
            <Button text="Cancel" handleClick={() => setOpen(false)} btnClass={style.btn1} />
            <Button
              text="Delete"
              handleClick={() => {
                handleDelete && handleDelete();
              }}
              btnClass={style.button}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
export default memo(DeletePopup);
