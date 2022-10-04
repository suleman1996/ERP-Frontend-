import Button from 'new-components/button';

import style from './employee-card.module.scss';

interface Props {
  handleClick?: any;
  img: string;
  name: string;
  designation: string;
  department: string;
  phone: string;
  id: string | undefined;
}

const EmployeeProfileCard = ({
  handleClick,
  img,
  name,
  designation,
  department,
  phone,
  id,
}: Props) => {
  return (
    <>
      <div className={style.mainDiv}>
        <div className={style.leftGrid}>
          <img src={img} alt="" />
          <Button text="More" handleClick={() => handleClick()} />
        </div>
        <div className={style.rightGrid}>
          <h1>{name}</h1>
          <h6>{designation}</h6>
          <div className={style.innerPara}>
            <p>
              Department:<span>{department}</span>
            </p>
            <p>
              Phone No:<span>{phone}</span>
            </p>
            <p>
              Employee ID:<span>{id}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeProfileCard;
