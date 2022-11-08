import Button from 'components/button';
import Input from 'components/input';
import React from 'react';

import cam from 'assets/camlogo.svg';
import style from './add-user.module.scss';
import Switch from 'components/switch';
import Select from 'components/select';

const AddUser = ({ setNewUser }) => {
  return (
    <>
      <div className={style.wraper}>
        <div className={style.imgParentDiv}>
          <img src={cam} />
        </div>
        <Input
          label="Name"
          name={'name'}
          placeholder={'Enter user name'}
          containerClass={style.containerClassInput}
        />
        <Input
          label="Email"
          name={'email'}
          placeholder={'Enter email'}
          containerClass={style.containerClassInput}
        />
        <Select
          label="Role"
          name={'category'}
          //   errorMessage={errors?.category?.message}
          //   register={register}
        >
          <option value="">Select</option>
          <>
            {categories &&
              categories?.map((ele: any) => (
                <option key={ele.name} value={ele?.value}>
                  {ele.name}
                </option>
              ))}
          </>
        </Select>
        <Input
          label="ID"
          name={'id'}
          placeholder={'Enter id'}
          containerClass={style.containerClassInput}
        />
        <Switch title={'Active'} label={'Status'} />
      </div>

      <div className={style.btns}>
        <Button
          text="Cancel"
          btnClass={style.cancelBtn}
          className={style.btnText}
          handleClick={() => setNewUser(false)}
        />
        <Button text="Add" btnClass={style.addBtn} handleClick={() => setNewUser(false)} />
      </div>
    </>
  );
};

export default AddUser;

const categories = [
  { name: 'Local', value: 'Local' },
  { name: 'Expat', value: 'Expat' },
  { name: 'Single Filers', value: 'Single Filers' },
  {
    name: 'Married Individuals filing joint returns',
    value: 'Married Individuals filing joint returns',
  },
  { name: 'For Heads of House Hold', value: 'For Heads of House Hold' },
];
