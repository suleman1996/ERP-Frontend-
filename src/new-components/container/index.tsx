import React from 'react';

import style from './container.module.scss';

interface Props {
  children?: JSX.Element[] | JSX.Element;
  container?: string;
}

const Container = ({ children, container }: Props) => {
  return (
    <div className={`${style.container} ${container}`} id="container">
      {children}
    </div>
  );
};

export default Container;
