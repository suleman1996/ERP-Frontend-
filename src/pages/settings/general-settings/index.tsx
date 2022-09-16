import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Input from 'components/input';
import Button from 'components/button';
import Profile from 'components/profile';
import MobileButton from 'components/button/mobile-button';

import { removeKey } from 'main-helper';
import { setCurrentUser } from 'store';
import AuthService from 'services/auth-service';
import { GeneralSettingUpdateUser } from './helper';
import SettingsService from 'services/settings-service';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import checkIcon from 'assets/check.svg';
import cross from 'assets/employee-page/Path 306.svg';
import tickIcon from 'assets/mobile-view/tickIcon.svg';
import style from './general.module.scss';

interface Props {
  setActive: Dispatch<SetStateAction<number>>;
}

const GeneralSettings = ({ setActive }: Props) => {
  const dispatch = useAppDispatch();
  const [img, setImg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentUser } = useAppSelector((state: any) => state.app);

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  const onSubmit = async (data: GeneralSettingUpdateUser) => {
    if (data?.password || img) {
      const tempData = removeKey({
        ...data,
        img,
      });
      if (tempData.password) {
        setIsLoading(true);
        const resp = await SettingsService.userUpdate(currentUser.id, {
          ...tempData,
        });
        if (resp.status === 200) {
          const res = await AuthService.getUserData(currentUser.id);
          if (res.status === 200) {
            dispatch(setCurrentUser(res?.data));
            reset({ ...currentUser, password: '', confirmPassword: '' });
          }
        }
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (currentUser) {
      reset(currentUser);
      if (currentUser.img) setImg(currentUser.img);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <>
      <div className={style.main}>
        {currentUser?.role !== 'Employee' && (
          <div className={style.imgDiv}>
            <img
              src={cross}
              alt=""
              style={{ cursor: 'pointer' }}
              className={style.img}
              onClick={() => setActive(0)}
            />
          </div>
        )}
        <Profile setImg={setImg} img={img} />
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.grid}>
            <Input
              name="employeeId"
              label="Employee ID"
              inputRef={register}
              containerClass={style.order2}
              type="text"
              placeholder="employee id"
              isDisable={true}
            />
            <Input
              name="email"
              label="Email"
              type="email"
              placeholder="tanveerhack@gmail.com"
              inputRef={register}
              containerClass={style.order}
              isDisable={true}
            />
            <Input
              name="password"
              label="New Password"
              type="password"
              inputRef={register}
              containerClass={style.order3}
              error={errors?.password}
              errorMessage={errors?.password?.message}
              placeholder="******"
            />
            <Input
              name="confirmPassword"
              label="Confirm New Password"
              type="password"
              inputRef={register}
              containerClass={style.order1}
              error={errors?.confirmPassword}
              errorMessage={errors?.confirmPassword?.message}
              placeholder="******"
            />
          </div>
          <div className={style.webBtnDiv}>
            <Button
              type="submit"
              text="Save Changes"
              icon={checkIcon}
              isLoading={isLoading}
              btnClass={style.button}
            />
          </div>
          <div className={style.mobileBtnDiv}>
            <MobileButton
              mobileIcon={tickIcon}
              btnClass={style.mobileBtn}
              type="submit"
              isLoading={isLoading}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default GeneralSettings;

const schema = yup
  .object()
  .shape({
    password: yup.string().when({
      is: (val: any) => val.length > 0,
      then: yup.string().min(8, 'minimum 8 characters required '),
      otherwise: yup.string(),
    }),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'passwords must match'),
  })
  .required();
