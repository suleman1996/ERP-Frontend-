import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import CardContainer from 'components/card-container';
import ImageUpload from 'components/image-upload';
import Input from 'components/input';
import Button from 'components/button';

import { setErrors } from './../../../helper/index';
import { createNotification } from 'common/create-notification';

import eye from 'assets/eye.svg';
import eyeCross from 'assets/eyeCross.svg';
import pencilIcon from 'assets/edit-icon.svg';
import style from './account.module.scss';

const AccountSetting = () => {
  const userData = useSelector((state) => state?.app?.currentUser);
  const { register, handleSubmit, reset, setError, clearErrors } = useForm();

  const [img, setImg] = useState('');
  const [newpass, setNewPass] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const [disableName, setDisableName] = useState(true);
  const [disableEmail, setDisableEmail] = useState(true);
  const [confirmNewpass, setConfirmNewPass] = useState(false);

  useEffect(() => {
    setImg(userData?.img);
    reset({ name: userData?.name, email: userData.email });
  }, []);

  const onSubmit = (data) => {
    try {
      let newData = {
        ...data,
        name: data?.name ? data?.name : `${userData.firstName} ${userData.lastName}`,
        email: data?.email ? data?.email : userData.email,
        img: img,
      };
    } catch (err) {
      if (err?.response?.data?.error) {
        setErrors(err?.response?.data?.error, setError);
      } else {
        createNotification('error', 'Error', err?.response?.data?.message);
      }
      setBtnLoader(false);
    }
  };

  return (
    <CardContainer className={style.card}>
      <form
        onSubmit={(e) => {
          clearErrors();
          handleSubmit(onSubmit)(e);
        }}
      >
        <ImageUpload name={'profilePicture'} img={img} setImg={setImg} accountSetting />
        <div className={style.customInputs}>
          <Input
            label={'Name'}
            name={'name'}
            isDisable={disableName}
            placeholder={'Enter name'}
            register={register}
            icon={pencilIcon}
            iconClass={style.iconClass}
            onClick={() => setDisableName(!disableName)}
          />
          <Input
            label={'Email'}
            name={'email'}
            placeholder={'Enter email'}
            register={register}
            icon={pencilIcon}
            isDisable={disableEmail}
            iconClass={style.iconClass}
            onClick={() => setDisableEmail(!disableEmail)}
          />
          <Input
            label={'New Password'}
            name={'newPassword'}
            type={newpass ? 'text' : 'password'}
            placeholder={'Enter new password'}
            icon={newpass ? eye : eyeCross}
            iconClass={style.iconClass}
            onClick={() => setNewPass(!newpass)}
            register={register}
          />
          <Input
            label={'ConfirmPassword'}
            name={'confirmPassword'}
            type={confirmNewpass ? 'text' : 'password'}
            placeholder={'Enter confirm password'}
            icon={confirmNewpass ? eye : eyeCross}
            iconClass={style.iconClass}
            onClick={() => setConfirmNewPass(!confirmNewpass)}
            register={register}
          />
        </div>

        <div className={style.btnClass}>
          <Button text="Save Changes" type="submit" />
        </div>
      </form>
    </CardContainer>
  );
};

export default AccountSetting;
