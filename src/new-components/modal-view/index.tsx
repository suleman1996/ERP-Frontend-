import style from './request.module.scss';

const ModalView = ({ children }: any) => {
  return <div className={style.deletePopup}>{children}</div>;
};

export default ModalView;
