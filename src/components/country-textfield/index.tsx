import icon from 'assets/employee-page/Polygon 1.png';
import style from './country.module.scss';

interface Props {
  label?: string;
  value?: string;
  name?: string;
  children?: JSX.Element[] | JSX.Element;
  register?: any;
  errorMessage?: string;
  placeholder?: string;
  disable?: boolean;
  star?: string;
}

const TextArea = ({ register, errorMessage, label, name, children }: Props) => {
  return (
    <>
      <div className={style.main}>
        <label>{label}</label>
        <div
          className={style.field}
          style={{ border: errorMessage ? '1px solid #ff5050' : ' 1px solid #d9d9d9' }}
        >
          <div
            style={{
              position: 'relative',
              borderRadius: '5px',
            }}
          >
            <select name={name} className={style.select} ref={register}>
              {children}
            </select>
            <img src={icon} alt="arrow icon" className={style.img} />
          </div>
        </div>
        {errorMessage ? <span className={style.errorMessage}>{errorMessage}</span> : ''}
      </div>
    </>
  );
};

export default TextArea;
