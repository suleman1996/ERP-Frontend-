import CardContainer from '../../components/card-container';
import style from './applications.module.scss';
import { useState } from 'react';
import MyLeaves from './my-leaves';
import LeaveBalance from './leave-balance';
import Approvals from './approval';
import Button from 'components/button';
import CreateApplicationModal from './my-leaves/create-applications';

const Applications = () => {
  const [active, setActive] = useState(1);

  const handleTab = (index: number) => {
    setActive(index);
  };

  const ActiveView = () => {
    switch (active) {
      case 1:
        return <MyLeaves />;
      case 2:
        return <Approvals />;
      case 3:
        return <LeaveBalance />;
      default:
        return <MyLeaves />;
    }
  };
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      {openModal && <CreateApplicationModal openModal={openModal} setOpenModal={setOpenModal} />}
      <CardContainer className={style.cardContainer}>
        <div className={style.headContainer} style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex' }}>
            <p className={active === 1 ? style.active : ''} onClick={() => handleTab(1)}>
              My Leaves
            </p>
            <p className={active === 2 ? style.active : ''} onClick={() => handleTab(2)}>
              Approvals
            </p>
            <p className={active === 3 ? style.active : ''} onClick={() => handleTab(3)}>
              Leave Balance
            </p>
          </div>
          {active === 1 && (
            <Button
              text="Apply Leave"
              btnClass={style.btnClass}
              handleClick={() => setOpenModal(true)}
            />
          )}
        </div>

        {ActiveView()}
      </CardContainer>
    </>
  );
};

export default Applications;
