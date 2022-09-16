import CardContainer from 'new-components/card-container';

import cross from 'new-assets/cross.svg';
import style from './settings.module.scss';

const Settings = () => {
  return (
    <CardContainer className={style.card}>
      <div className={style.header}>
        <h6>Settings</h6>
        <img src={cross} alt="" />
      </div>
    </CardContainer>
  );
};

export default Settings;
