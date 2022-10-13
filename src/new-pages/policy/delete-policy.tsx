import Button from 'new-components/button';

import delLogo from 'assets/delLogo.svg';

import style from './request.module.scss';
import ModalView from 'new-components/modal-view';

const DeletePolicie = ({ visible = false, setOpen }: any) => {
  if (!visible) {
    return null;
  } else
    return (
      <ModalView>
        <div className={style.delView}>
          <img
            style={{ cursor: 'pointer', height: 50, width: 50 }}
            src={delLogo}
            alt=""
            className={style.img}
          />
          <p className={style.delTitle}>Are you sure you want to delete this?</p>
          <p className={style.delSubTitle}>If you delete this you can’t recover it.</p>
          <div className={style.btnView}>
            <div style={{ marginRight: '10px' }}>
              <Button
                className={style.textColor}
                btnClass={style.cancelBtn}
                handleClick={() => setOpen(false)}
                text="Cancel"
              />
            </div>
            <Button handleClick={() => setOpen(false)} text="Delete" />
          </div>
        </div>
      </ModalView>
    );
};

export default DeletePolicie;
