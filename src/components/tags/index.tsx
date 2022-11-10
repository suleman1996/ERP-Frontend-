import style from './tags.module.scss';

interface Props {
  text?: string;
  textColor?: string;
  boxColor?: string;
}

const Tags = ({ text, textColor, boxColor }: Props) => {
  return (
    <div className={style.tags}>
      <div className={style.tagsText} style={{ backgroundColor: boxColor && boxColor }}>
        <p style={{ color: textColor && textColor }}>{text}</p>
      </div>
    </div>
  );
};

export default Tags;
