import image1 from 'new-assets/icons/1.svg';
import image2 from 'new-assets/icons/4.svg';
import image3 from 'new-assets/icons/5.svg';
import person from 'new-assets/icons/person.png';
import pen from 'new-assets/icons/edit.svg';
import style from './cv-side-bar.module.scss';

const CvSideBar = () => {
  return (
    <div className={style.sidebar}>
      <div className={style.userImg}>
        <img src={person} alt="no image" />
      </div>
      <div className={style.name}>
        <h1>John Smith</h1>
        <span className={style.designation}> UI | UX Designer</span>
      </div>
      <div className={style.aboutSection}>
        <div className={style.aboutHeader}>
          <h3>About</h3>
          <img src={pen} alt="no image" />
        </div>
      </div>
      <p className={style.para}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus veritatis,
        necessitatibus quidem consequatur autem a, consequuntur, earum magni in fuga iste quod illo
        molestiae maiores quasi asperiores architecto aperiam quos. lorem ipsum is simply dummy text
        of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
        text ever since the 1500s, when an unknown printer took a galley of type and scramtting
        industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
        an unknown printer took a galley.
      </p>
      <div className={style.languageHeader}> Languages </div>
      <div className={style.languageBody}>
        {languageData.map((data) => {
          return (
            <div className={style.point}>
              <span>{data.language}</span>
              <div className={style.cicularWraper}>
                {Array(data.score).fill(<div className={style.circulardiv}></div>)}
              </div>
            </div>
          );
        })}
      </div>
      <div className={style.languageHeader}> Contact </div>
      <div className={style.contactWraper}>
        <img src={image1} alt="img" />

        <span>126, Street mahon,</span>
        <span>New York City,USA,</span>
      </div>
      <div className={style.contactWraper}>
        <img src={image2} alt="img" />

        <span>012 4567 8910 1230</span>
        <span>012 4567 8910 1230</span>
      </div>
      <div className={style.contactWraper}>
        <img src={image3} alt="img" />

        <span>contact@gmail.com</span>
        <span>www.ownsite.com</span>
      </div>
    </div>
  );
};

export default CvSideBar;

const languageData = [
  { language: 'English', score: 5 },
  { language: 'French', score: 5 },
  { language: 'Chinese', score: 5 },
  { language: 'Urdu', score: 5 },
  { language: 'Persian', score: 5 },
];
