import { Dispatch, SetStateAction } from 'react';

import Button from 'new-components/button';
import DatePicker from 'new-components/date-picker';
import ImageUpload from 'new-components/image-upload';
import TextField from 'new-components/textfield';
import Radio from 'new-components/radio';
import ProfileUpload from 'new-components/profile-upload';
import CountryInput from 'components/country-input';
import Select from 'new-components/select';

import { usePersonalInfo } from './helper';

import arrowRight from 'new-assets/arrowBtnRight.svg';
import style from './personal-information.module.scss';

interface Props {
  handleNext: (data?: string) => void;
  formData: any;
  setFormData: any;
  employeeDocId: string;
  setEmployeeId: Dispatch<SetStateAction<string>>;
  setEmployeeDocId: Dispatch<SetStateAction<string>>;
}

const PersonalInformation = ({
  handleNext,
  setFormData,
  employeeDocId,
  formData,
  setEmployeeId,
  setEmployeeDocId,
}: Props) => {
  const { onSubmit, register, handleSubmit, errors, control, img, setImg, btnLoader, userId } =
    usePersonalInfo({
      handleNext,
      setFormData,
      employeeDocId,
      formData,
      setEmployeeId,
      setEmployeeDocId,
    });

  return (
    <div className={style.mainForm}>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <ImageUpload name={'userimage'} img={img} setImg={setImg} />
        <div className={style.grid}>
          <TextField
            name="firstName"
            label="First Name "
            type="text"
            register={register}
            errorMessage={errors?.firstName?.message}
            placeholder="Enter First Name"
            star={'*'}
          />
          <TextField
            name="lastName"
            label="Last Name "
            type="text"
            register={register}
            errorMessage={errors?.lastName?.message}
            placeholder="Enter Last Name"
            star={'*'}
          />
          <Select
            label="ID"
            name={'employeeId'}
            userId={userId}
            selectContainer={style.selectContainer}
            wraperSelect={style.wraperSelect}
            newSelect
            star={' *'}
            errorMessage={errors?.employeeId?.message}
            register={register}
          >
            <>
              {selectOptions &&
                selectOptions.map((ele) => (
                  <>
                    <option key={ele.value} value={ele.value}>
                      {ele.description}
                    </option>
                  </>
                ))}
            </>
          </Select>
          <div>
            <label
              className={style.label}
              style={{ color: errors?.phoneNumber?.message ? '#ff5050' : '#2d2d32' }}
            >
              Page Number
              <b style={{ color: 'red' }}>{' *'}</b>
            </label>
            <CountryInput
              name={'phoneNumber'}
              placeholder={'Enter phone number'}
              control={control}
              errorMessage={errors?.phoneNumber?.message}
            />
          </div>
          <TextField
            name="email"
            label="Email "
            type="email"
            placeholder="Enter Email"
            errorMessage={errors?.email?.message}
            register={register}
            star={'*'}
          />
          <DatePicker
            label="Date of Birth "
            placeholder="MM/DD/YYYY"
            name="dob"
            id="1"
            control={control}
            errorMessage={errors?.dob?.message}
            maxDate={new Date()}
            star={'*'}
          />
          <TextField
            name="cnic"
            label="CNIC "
            type="number"
            placeholder=" Enter CNIC"
            errorMessage={errors?.cnic?.message}
            register={register}
            star={'*'}
          />

          <div className={style.flexClass}>
            <label
              className={style.label}
              style={{ color: errors?.gender?.message ? '#ff5050' : '#2d2d32' }}
            >
              Gender
              <b style={{ color: 'red' }}>{' *'}</b>
            </label>
            <div className={style.flexClassInner}>
              <Radio
                name="gender"
                label="Male "
                radioValue={'Male'}
                radioRef={register}
                errorMessage={errors?.gender?.message}
              />
              <div className={style.sec}>
                <Radio name="gender" label="Female " radioValue={'Female'} radioRef={register} />
              </div>
              <div className={style.sec}>
                <Radio name="gender" label="Other" radioValue={'Other'} radioRef={register} />
              </div>
            </div>
          </div>
          <div>
            <label className={style.label}>CNIC Front Side</label>
            <ProfileUpload
              name={'frontPic'}
              register={register}
              id={'frontPic'}
              errorMessage={errors?.frontPic?.message}
            />
          </div>
          <div>
            <label className={style.label}>CNIC Back Side</label>
            <ProfileUpload
              name={'backPic'}
              register={register}
              id={'backPic'}
              errorMessage={errors?.backPic?.message}
            />
          </div>
        </div>
        <div className={style.btnContainer}>
          <Button text="Next" iconEnd={arrowRight} type="submit" isLoading={btnLoader} />
        </div>
      </form>
    </div>
  );
};

export default PersonalInformation;

export const selectOptions = [
  {
    value: 'SPX',
    description: 'SPX',
  },
  {
    value: 'YYY',
    description: 'YYY',
  },
  {
    value: 'ZZZ',
    description: 'ZZZ',
  },
];
