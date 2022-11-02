import style from './menu.module.scss';

export interface AttendanceInt {
  handlePdf?: () => void;
  handleExcel?: () => void;
}
const MenuPopup = ({ handlePdf, handleExcel }: any) => {
  return (
    <>
      <div className={style.mainDiv}>
        <div className={style.borderLine}>
          <p className={style.p} onClick={handlePdf}>
            Export as PDF
          </p>
        </div>
        <p className={style.p} onClick={handleExcel}>
          Export as Excel
        </p>
      </div>
    </>
  );
};
export default MenuPopup;
