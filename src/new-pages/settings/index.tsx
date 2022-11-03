import CardContainer from 'new-components/card-container';

import style from './settings.module.scss';
import { useState } from 'react';
import AccountSetting from './account-setting';
import ManageUser from './manage-user';
import GeneralSetting from './general-setting/index';
import AccessLevel from './access-level';

const Settings = () => {
  const [index, setIndex] = useState(0);

  return (
    <CardContainer className={style.card}>
      <div className={style.header}>
        <div className={style.navBar}>
          {settingOptions?.map((setting, index) => {
            return (
              <p key={setting} onClick={() => setIndex(index)}>
                {setting}
              </p>
            );
          })}
        </div>
      </div>
      <div>
        {index === 0 && <AccountSetting />}
        {index === 1 && <ManageUser />}
        {index === 2 && <GeneralSetting />}
        {index === 3 && <AccessLevel />}
      </div>
    </CardContainer>
  );
};

export default Settings;

const settingOptions = ['Account Setting', 'Manage User', 'General Setting', 'Access Level'];
