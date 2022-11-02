import Button from 'my-components/button';

import style from './employee-card.module.scss';

interface Props {
  handleClick?: any;
  img: string;
  name: string;
  designation: string;
  department: string;
  phone: string;
  id: string | undefined;
  fontSize: string;
  fontWeight: number;
  designationColor: string;
  desigFont: number;
  fontSizeForm: number;
  fontWeightForm: number;
}

const EmployeeProfileCard = ({
  handleClick,
  img,
  name,
  designation,
  department,
  phone,
  id,
  fontSize,
  fontWeight,
  designationColor,
  desigFont,
  fontSizeForm,
  fontWeightForm,
}: Props) => {
  return (
    <>
      <div className={style.mainDiv}>
        <div className={style.leftGrid}>
          <img src={img} alt="" />
          <Button text="More" handleClick={() => handleClick()} />
        </div>
        <div className={style.rightGrid}>
          <h1
            style={{
              fontSize: fontSize,
              fontWeight: fontWeight,
              margin: 0,
            }}
          >
            {name}
          </h1>
          <p style={{ margin: 2, color: designationColor, fontSize: '20px' }}>{designation}</p>
          <div className={style.innerPara}>
            <p className={style.form}>
              Department:
              <span style={{ fontSize: '17px', fontWeight: fontWeightForm }}>{department}</span>
            </p>
            <p className={style.form}>
              Phone No:<span>{phone}</span>
            </p>
            <p className={style.form}>
              Employee ID:<span>{id}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default EmployeeProfileCard;
