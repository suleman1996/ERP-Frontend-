import style from './card-container.module.scss';

interface Props {
  children?: any;
  containerClass?: any;
}

const CardContainer = ({ children, containerClass }: Props) => {
  return (
    <>
      <div className={`${style.mainContainer} ${containerClass}`}>
        <div className={style.height}>{children}</div>
      </div>
    </>
  );
};

export default CardContainer;
