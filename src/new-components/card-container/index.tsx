import style from './card-container.module.scss';

interface Props {
  children?: JSX.Element[] | JSX.Element;
  className?: string;
}

const CardContainer = ({ children, className }: Props) => {
  return (
    <>
      <div className={`${style.mainContainer} ${className}`}>{children}</div>
    </>
  );
};

export default CardContainer;
