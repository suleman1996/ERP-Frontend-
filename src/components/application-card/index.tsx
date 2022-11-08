import style from './application-card.module.scss';

interface props {
  className?: string;
}

const ApplicationCard = ({ className }: props) => {
  return (
    <div className={`${className} ${style.applicationCard}`}>
      <div className={style.headBorder}>
        <p>Leave Application</p>
        <p>SPX001</p>
      </div>
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti mollitia facere quasi
          rerum officiis debitis alias assumenda incidunt accusamus, dolores nihil perspiciatis
          itaque odit, nostrum sit doloremque magnam suscipit dolor. Lorem ipsum dolor sit, amet
          consectetur adipisicing elit. Dolorem laudantium, error amet voluptas illum ut, voluptatem
          nostrum eum sint nemo quod voluptatibus facere pariatur cupiditate blanditiis, harum
          temporibus nam sunt.
        </p>
      </div>
      <div className={style.dashBorder}>
        <span className={style.left}></span>
        <span className={style.right}></span>
      </div>
    </div>
  );
};

export default ApplicationCard;
