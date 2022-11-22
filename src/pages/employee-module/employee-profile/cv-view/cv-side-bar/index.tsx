import image1 from 'assets/icons/1.svg'
import image2 from 'assets/icons/4.svg'
import image3 from 'assets/icons/5.svg'
import person from 'assets/icons/person.png'
import style from './cv-side-bar.module.scss'

const CvSideBar = ({ user }: any) => {
  return (
    <div className={style.sidebar}>
      <div className={style.userImg}>
        <img
          src={
            user?.personalInformation?.img
              ? user?.personalInformation?.img
              : person
          }
          alt="no image"
        />
      </div>
      <div className={style.name}>
        <h1>{`${user?.personalInformation?.firstName} ${user?.personalInformation?.lastName}`}</h1>
        <span className={style.designation}>
          {user?.companyInformation?.department}
        </span>
      </div>
      <div className={style.languageHeader}> Skills </div>
      <div className={style.languageBody}>
        {user?.skills.map((data: any, index) => {
          return (
            <div className={style.point} key={index}>
              <span>{data.skillName}</span>
              <div className={style.cicularWraper}>
                {Array(
                  data.skillLevel === 'Prof'
                    ? 3
                    : data.skillLevel === 'expert'
                    ? 5
                    : data.skillLevel === 'inter'
                    ? 2
                    : 1
                ).fill(<div className={style.circulardiv}></div>)}
              </div>
            </div>
          )
        })}
      </div>
      <div className={style.languageHeader}> Languages </div>
      <div className={style.languageBody}>
        {user?.languages.map((data: any, index) => {
          return (
            <div className={style.point} key={index}>
              <span>{data.language}</span>
              <div className={style.cicularWraper}>
                {Array(
                  data.skillLevel === 'Prof'
                    ? 3
                    : data.skillLevel === 'expert'
                    ? 5
                    : data.skillLevel === 'inter'
                    ? 2
                    : 1
                ).fill(<div className={style.circulardiv}></div>)}
              </div>
            </div>
          )
        })}
      </div>
      <div className={style.languageHeader}> Contact </div>
      <div className={style.contactWraper}>
        <img src={image1} alt="img" />

        <span>{user?.addressInformation?.currentAddress?.address}</span>
      </div>
      <div className={style.contactWraper}>
        <img src={image2} alt="img" />

        <span>{user?.personalInformation?.phoneNumber}</span>
      </div>
      <div className={style.contactWraper}>
        <img src={image3} alt="img" />

        <span>{user?.personalInformation?.email}</span>
        <span>www.sprintx.com</span>
      </div>
    </div>
  )
}

export default CvSideBar
