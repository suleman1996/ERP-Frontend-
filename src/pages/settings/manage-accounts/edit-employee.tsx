/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Input from 'components/input';
import Radio from 'components/radio';
import Select from 'components/select';
import Button from 'components/button';
import Profile from 'components/profile';
import MobileButton from 'components/button/mobile-button';

import { removeKey } from 'main-helper';
import { Employee } from 'interfaces/employee';
import SettingsService from 'services/settings-service';
import { ManageAccountsEditEmployee } from './manage-accounts-helper';

import icon from 'assets/edit.svg';
import checkIcon from 'assets/check.svg';
import style from './manage-accounts.module.scss';
import cross from 'assets/employee-page/Path 306.svg';
import tickIcon from 'assets/mobile-view/tickIcon.svg';

interface Props {
  employees: Employee[];
  getEmployeesData: () => void;
}

const EditEmployee = ({ employees, getEmployeesData }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [emailReadOnly, setEmailReadOnly] = useState(true);
  const [img, setImg] = useState<any>('');

  const { register, handleSubmit, errors, reset } = useForm<ManageAccountsEditEmployee>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ManageAccountsEditEmployee) => {
    const currentUser = employees.find((x) => x.id === id);
    const newData = removeKey({
      ...data,
      img,
      email: data.email === currentUser?.email ? '' : data.email,
    });
    setIsLoading(true);
    id &&
      (await SettingsService.editEmployee(id, {
        ...newData,
      }));
    setIsLoading(false);
    getEmployeesData();
    navigate('/settings');
  };

  const setCurrentEmployeeData = () => {
    const currentUser = employees.find((x) => x.id === id);
    reset(currentUser);
    if (currentUser?.img) setImg(currentUser?.img);
  };

  useEffect(() => {
    setCurrentEmployeeData();
  }, [employees]);

  return (
    <div className={style.main}>
      <div className={style.imgDiv}>
        <img src={cross} alt="" className={style.img} onClick={() => navigate('/settings')} />
      </div>
      <Profile setImg={setImg} img={img} />
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.grid}>
          <Input
            label="Employee ID"
            name="employeeId"
            type="text"
            placeholder="employee id"
            inputRef={register}
            isDisable={true}
          />
          <Input
            name="email"
            label="Email"
            type="text"
            placeholder="tanveerhack@gmail.com"
            icon={icon}
            inputRef={register}
            onClick={() => {
              setEmailReadOnly((prev) => !prev);
            }}
            readOnly={emailReadOnly}
            error={errors?.email}
            errorMessage={errors?.email?.message}
          />
          <Input
            name="password"
            label="New Password"
            type="password"
            placeholder="******"
            inputRef={register}
            error={errors?.password}
            errorMessage={errors?.password?.message}
          />
          <Input
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            placeholder="******"
            inputRef={register}
            error={errors?.confirmPassword}
            errorMessage={errors?.confirmPassword?.message}
          />
          <Select
            label="Account"
            options={options}
            placeHolder="Select Account"
            name="account"
            inputRef={register}
            error={errors?.account}
            errorMessage={errors?.account?.message}
          />
          <div className={style.statusDiv}>
            <div className={style.labelDiv}>
              <label>Status</label>
            </div>
            <div className={style.radio} style={{ marginTop: '10px' }}>
              <Radio name="status" label="Active" radioRef={register} radioValue={'Active'} />
              <div className={style.sec}>
                <Radio name="status" label="Inactive" radioRef={register} radioValue={'Inactive'} />
              </div>
            </div>
          </div>
        </div>
        <div className={style.btnDiv}>
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
  );
};

export default EditEmployee;

const options = ['Employee', 'Human Resource', 'Admin'];

const schema = yup
  .object()
  .shape({
    email: yup.string().email(),
    password: yup.string().when({
      is: (val: any) => val.length > 0,
      then: yup.string().min(8, 'minimum 8 characters required '),
      otherwise: yup.string(),
    }),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'passwords must match'),
    account: yup.string().required(),
    status: yup.string(),
  })
  .required();
