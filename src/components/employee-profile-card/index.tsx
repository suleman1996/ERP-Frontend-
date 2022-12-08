import Button from 'components/button'

import style from './employee-card.module.scss'
import profile from 'assets/avatar.jfif'

interface Props {
  handleClick?: any
  img?: string
  name?: string
  designation?: string
  department?: string
  phone?: string
  id?: string | undefined
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
          <img src={img ? img : profile} alt="" />
          <Button text="More" handleClick={() => handleClick()} />
        </div>
        <div className={style.rightGrid}>
          <div className={style.ellipse}>
            <h1>
              {name}

              <div className={style.tooltip}>
                <p>{name}</p>
              </div>
            </h1>
          </div>
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
  )
}

export default EmployeeProfileCard
