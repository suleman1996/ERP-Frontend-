import Button from 'new-components/button';
import style from './delete-modal.module.scss';

interface Props {
  // open: boolean;
  // setOpen: Dispatch<SetStateAction<boolean>>;
  // handleDelete?: () => void;
  // btnLoader?: boolean;
}

const DeletePopup = () => {
  return (
    <>
      <div style={{ background: 'red', width: '1130px' }}>
        <div className={style.emailPopupContentDiv}>
          <div className={style.headerDiv}>
            <h1>Are you sure you want to delete this?</h1>
            <p>If you delete this you can’t recover it</p>
          </div>
          <div className={style.flex}>
            <Button text="Cancel" btnClass={style.btn1} />
            <Button text="Delete" btnClass={style.button} />
          </div>
        </div>
      </div>
    </>
  );
};
export default DeletePopup;
