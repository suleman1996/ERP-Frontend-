import CardContainer from '../../components/card-container';
import style from './applications.module.scss';
import filterIcon from 'assets/filterIcon.svg';
import filterIconDull from 'assets/icons/filter-icon-dull.svg';
import { useState } from 'react';
import ApplicationApproval from './approval';

const Applications = () => {
  const [active, setActive] = useState(true);
  return (
    <>
      <CardContainer className={style.cardContainer}>
        <div className={style.headContainer}>
          <p>Request Forms</p>
          <p>
            My Records <img src={active ? filterIcon : filterIconDull} alt="" />
          </p>
          <p className={active ? style.active : ''}>Approvals</p>
        </div>
        <ApplicationApproval />
      </CardContainer>
    </>
  );
};

export default Applications;
