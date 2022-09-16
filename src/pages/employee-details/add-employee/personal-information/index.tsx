import { Dispatch, SetStateAction } from 'react';

import Input from 'components/input';
import Radio from 'components/radio';
import Button from 'components/button';
import Profile from 'components/profile';
import DatePicker from 'components/date-picker';

import { usePersonalInfo } from './helper';

import arrowRight from 'assets/employee-page/arrow-right.svg';
import arrowLeft from 'assets/employee-page/arrow-left.svg';
import style from '../add-employee.module.scss';

interface Props {
  activeStep?: number;
  formData: any;
  setOnlyActive: Dispatch<SetStateAction<number | boolean>>;
  setEmployeeId: Dispatch<SetStateAction<string>>;
  setFormData: any;
  handleBack: () => void;
  handleNext: () => void;
  employeeId: string;
}

const PersonalInformation = ({
  handleNext,
  setOnlyActive,
  setFormData,
  formData,
  setEmployeeId,
  employeeId,
}: Props) => {
  const { register, handleSubmit, onSubmit, errors, control, isLoading, img, setImg } =
    usePersonalInfo({
      handleNext,
      setOnlyActive,
      setFormData,
      formData,
      setEmployeeId,
      employeeId,
    });
  return (
    <div className={style.main}>
      <Profile img={img} setImg={setImg} />
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.grid}>
          <Input
            name="firstName"
            label="First Name "
            star="*"
            type="text"
            inputRef={register}
            error={errors?.firstName}
            errorMessage={errors?.firstName?.message}
            placeholder="First Name"
          />
          <Input
            name="lastName"
            label="Last Name "
            star="*"
            type="text"
            inputRef={register}
            error={errors?.lastName}
            errorMessage={errors?.lastName?.message}
            placeholder="Last Name"
          />
          <Input
            name="email"
            label="Email "
            type="email"
            placeholder="Email"
            error={errors?.email}
            errorMessage={errors?.email?.message}
            inputRef={register}
          />
          <DatePicker
            label="Date of Birth "
            star="*"
            name="dob"
            id="1"
            placeholder="Date of Birth"
            control={control}
            error={errors?.dob}
            maxDate={new Date()}
            // errorMessage={errors?.date?.dob}
          />
          <Input
            name="cnic"
            label="CNIC "
            star="*"
            type="number"
            placeholder="CNIC"
            error={errors?.cnic}
            errorMessage={errors?.cnic?.message}
            inputRef={register}
          />
          <Input
            name="phoneNumber"
            label="Phone Number "
            star="*"
            type="number"
            inputRef={register}
            error={errors?.phoneNumber}
            errorMessage={errors?.phoneNumber?.message}
            placeholder="Phone Number"
          />
          <div style={{ marginTop: '12px' }}>
            <label className={style.label}>
              Gender <span style={{ color: 'red' }}>*</span>
            </label>

            <div className={style.radio}>
              <Radio
                name="gender"
                label="Male "
                radioValue={'Male'}
                radioRef={register}
                errorMessage={errors?.gender?.message}
                error={errors?.gender}
              />
              <div className={style.sec}>
                <Radio
                  name="gender"
                  label="Female "
                  radioValue={'Female'}
                  error={errors?.gender}
                  radioRef={register}
                  errorMessage={errors?.gender?.message}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px',
          }}
        >
          <div className={style.btnContainer}>
            <Button type="button" disabled={true} btnClass={style.button2} icon={arrowLeft} />
            <span>Back</span>
          </div>

          <div className={style.btnContainer}>
            <span>Next</span>
            <Button
              type="submit"
              btnClass={style.button1}
              icon={arrowRight}
              isLoading={isLoading}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonalInformation;
