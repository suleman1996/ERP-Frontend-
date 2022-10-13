import style from './card-container.module.scss';

interface Props {
  children?: JSX.Element[] | JSX.Element;
  className?: string;
  backgroundColor?: string;
}

const CardContainer = ({ children, className, backgroundColor }: Props) => {
  return (
    <>
      <div
        className={`${style.mainContainer} ${className}`}
        style={{ backgroundColor: backgroundColor }}
      >
        {children}
      </div>
    </>
  );
};

export default CardContainer;
