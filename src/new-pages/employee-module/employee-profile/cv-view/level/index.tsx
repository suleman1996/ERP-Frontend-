import style from './level.module.scss';

interface Props {
  name: string;
  val: number;
}

const Skills = ({ name, val }: Props) => {
  return (
    <div className={style.parent}>
      <label>{name}</label>
      <progress className={style.progress_bar} id="file" value={val} max="100"></progress>
    </div>
  );
};

export default Skills;
