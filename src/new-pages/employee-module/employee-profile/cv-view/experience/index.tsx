import style from './exp.module.scss';

interface Props {
  date: string;
  company: string;
  job: string;
  intro: string;
}

const Experience = ({ date, company, job, intro }: Props) => {
  return (
    <div className={style.parent}>
      <div className={style.innerSec1}>
        <div className={style.left}>
          <p className={style.p1}>{date}</p>
          <p className={style.p2}>{company}</p>
        </div>
        <div className={style.right}>
          <h5>{job}</h5>
          <p>{intro}</p>
        </div>
      </div>
    </div>
  );
};

export default Experience;
