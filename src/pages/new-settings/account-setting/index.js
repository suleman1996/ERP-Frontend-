import { useState } from 'react';

import CardContainer from 'components/card-container';
import ImageUpload from 'components/image-upload';
import Input from 'components/input';
import Button from 'components/button';

import pencilIcon from 'assets/pencil.svg';
import eyeCross from 'assets/eyeCross.svg';
import eye from 'assets/eye.svg';
import style from './account.module.scss';

const AccountSetting = () => {
  const [img, setImg] = useState('');
  const [newpass, setNewPass] = useState(false);
  const [disableName, setDisableName] = useState(false);
  const [disableEmail, setDisableEmail] = useState(false);
  const [confirmNewpass, setConfirmNewPass] = useState(false);
  return (
    <CardContainer className={style.card}>
      <form>
        <ImageUpload img={img} setImg={setImg} />
        <div className={style.customInputs}>
          <Input
            label={'Name'}
            name={'name'}
            isDisable={disableName}
            placeholder={'name'}
            icon={pencilIcon}
            iconClass={style.iconClass}
            onClick={() => setDisableName(!disableName)}
          />
          <Input
            label={'Email'}
            name={'email'}
            placeholder={'Email'}
            icon={pencilIcon}
            isDisable={disableEmail}
            iconClass={style.iconClass}
            onClick={() => setDisableEmail(!disableEmail)}
          />
          <Input
            label={'New Password'}
            name={'newPassword'}
            type={newpass ? 'text' : 'password'}
            placeholder={'New Password'}
            icon={newpass ? eye : eyeCross}
            iconClass={style.iconClass}
            onClick={() => setNewPass(!newpass)}
          />
          <Input
            label={'ConfirmPassword'}
            name={'confirmPassword'}
            type={confirmNewpass ? 'text' : 'password'}
            placeholder={'Confirm Password'}
            icon={confirmNewpass ? eye : eyeCross}
            iconClass={style.iconClass}
            onClick={() => setConfirmNewPass(!confirmNewpass)}
          />
        </div>

        <div className={style.btnClass}>
          <Button text="Save" type="submit" />
        </div>
      </form>
    </CardContainer>
  );
};

export default AccountSetting;
