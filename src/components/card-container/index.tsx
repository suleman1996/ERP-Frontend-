import style from './card-container.module.scss';

interface Props {
  children?: any;
}

const CardContainer = ({ children }: Props) => {
  return (
    <>
      <div className={style.mainContainer}>
        <div className={style.height}>{children}</div>
      </div>
    </>
  );
};

export default CardContainer;
