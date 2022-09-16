import style from './tags.module.scss';

interface Props {
  tagsTextArr: string[];
}

const Tags = ({ tagsTextArr }: Props) => {
  return (
    <div className={style.tags}>
      {tagsTextArr.map((ele: string, index: number) => (
        <div className={style.tagsText} key={index}>
          <p>{ele}</p>
        </div>
      ))}
    </div>
  );
};

export default Tags;
