import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CardContainer from 'components/card-container';
import Select from 'components/select';
import AddProfileTag from './add-modal';
import Button from 'components/button';

import { gender, useProfileSetting, department, designation, employmentType } from './helper';

import cross from 'assets/cross.svg';
import tick from 'assets/tick.svg';
import style from './profile-settings.module.scss';

interface Data {
  value: string;
  description: string;
}
const ProfileSetting = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const { onSubmit, register, handleSubmit, errors } = useProfileSetting();

  return (
    <CardContainer className={style.card}>
      <div className={style.header}>
        <h6>Profile Setting</h6>
        <img src={cross} alt="" onClick={() => navigate('/settings')} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <div className={style.grid}>
          <Select
            label="Gender"
            name={'gender'}
            errorMessage={errors?.gender?.message}
            register={register}
          >
            <option value="">Select Gender</option>
            <>
              {gender.length &&
                gender.map(({ value, description }: Data) => (
                  <option key={value} value={value}>
                    {description}
                  </option>
                ))}
            </>
          </Select>
          <Select
            label="Department"
            name={'department'}
            errorMessage={errors?.department?.message}
            register={register}
          >
            <option value="">Select Department</option>
            <>
              {department.length &&
                department.map(({ value, description }: Data) => (
                  <option key={value} value={value}>
                    {description}
                  </option>
                ))}
            </>
          </Select>
          <Select
            label="Designation"
            name={'designation'}
            errorMessage={errors?.designation?.message}
            register={register}
          >
            <option value="">Select Designation</option>
            <>
              {designation.length &&
                designation.map(({ value, description }: Data) => (
                  <option key={value} value={value}>
                    {description}
                  </option>
                ))}
            </>
          </Select>
          <Select
            label="Employment Type"
            name={'employmentType'}
            errorMessage={errors?.employmentType?.message}
            register={register}
          >
            <option value="">Select Employment Type</option>
            <>
              {employmentType.length &&
                employmentType.map(({ value, description }: Data) => (
                  <option key={value} value={value}>
                    {description}
                  </option>
                ))}
            </>
          </Select>
          <Select
            label="Pay Type"
            name={'payType'}
            errorMessage={errors?.payType?.message}
            register={register}
          >
            <option value="">Monthly</option>
            <>
              {designation.length &&
                designation.map(({ value, description }: Data) => (
                  <option key={value} value={value}>
                    {description}
                  </option>
                ))}
            </>
          </Select>
        </div>
        <div className={style.btnDiv}>
          <Button
            text="View Permissions"
            btnClass={style.btn}
            type="button"
            handleClick={() => setOpen(true)}
          />
          <Button text="Save" iconEnd={tick} />
        </div>
      </form>
      <AddProfileTag open={open} setOpen={setOpen} />
    </CardContainer>
  );
};

export default ProfileSetting;
