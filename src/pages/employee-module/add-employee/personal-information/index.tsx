import { Dispatch, SetStateAction } from 'react';

import Button from 'components/button';
import DatePicker from 'components/date-picker';
import ImageUpload from 'components/image-upload';
import TextField from 'components/textfield';
import ProfileUpload from 'components/profile-upload';
import CountryInput from 'components/country-input';
import Select from 'components/select';
import Loading from 'components/loading';

import { usePersonalInfo } from './helper';
import { useEmployeeForms } from '../context';

import arrowRight from 'assets/arrowBtnRight.svg';
import style from './personal-information.module.scss';

interface ContextProps {
  handleNext: (data?: string) => void;
  formData: any;
  setFormData: any;
  employeeDocId: string;
  setEmployeeId: Dispatch<SetStateAction<string>>;
  setEmployeeDocId: Dispatch<SetStateAction<string>>;
}

const PersonalInformation = () => {
  const { handleNext, setFormData, employeeDocId, formData, setEmployeeId, setEmployeeDocId }: any =
    useEmployeeForms();
  const {
    onSubmit,
    register,
    handleSubmit,
    errors,
    control,
    img,
    setImg,
    btnLoader,
    userId,
    clearErrors,
    selectedFileName,
    setSelectedFileName,
    selectedFileNameBack,
    setSelectedFileNameBack,
    gender,
    series,
    loader,
    customValidation,
    setCustomValidation,
  } = usePersonalInfo({
    handleNext,
    setFormData,
    employeeDocId,
    formData,
    setEmployeeId,
    setEmployeeDocId,
  });

  return (
    <>
      <div className={style.mainForm}>
        {loader ? (
          <div
            className={style.bgCHeight}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <Loading loaderClass={style.loader} />
          </div>
        ) : (
          <form
            className={style.form}
            onSubmit={(e) => {
              clearErrors();
              handleSubmit(onSubmit)(e);
            }}
          >
            <ImageUpload name={'profilePicture'} img={img} setImg={setImg} />
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
              <TextField
                name="fullName"
                label="Full Name "
                type="text"
                register={register}
                errorMessage={errors?.fullName?.message}
                placeholder="Enter Full Name"
                star={'*'}
              />
              <Select
                label="Employee ID"
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
                  {series &&
                    series.map((ele: any) => (
                      <>
                        <option key={ele.name} value={ele?.name}>
                          {ele.name}
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
                  Phone Number
                  <b style={{ color: 'red' }}>{' *'}</b>
                </label>
                <CountryInput
                  name={'phone'}
                  placeholder={'Enter phone number'}
                  control={control}
                  errorMessage={errors?.phone?.message}
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
                min={'0'}
                placeholder=" Enter CNIC"
                onChange={(e) => {
                  e.target.value.split('').length > 13
                    ? setCustomValidation('Only 13 digits are allowed')
                    : setCustomValidation('');
                }}
                customValidation={customValidation}
                errorMessage={errors?.cnic?.message}
                register={register}
                star={'*'}
              />

              <div>
                <label className={style.label}>CNIC Front Side</label>
                <ProfileUpload
                  name={'frontPic'}
                  register={register}
                  id={'frontPic'}
                  errorMessage={errors?.frontPic?.message}
                  selectedFileName={selectedFileName}
                  setSelectedFileName={setSelectedFileName}
                />
              </div>
              <div>
                <label className={style.label}>CNIC Back Side</label>
                <ProfileUpload
                  name={'backPic'}
                  register={register}
                  id={'backPic'}
                  errorMessage={errors?.backPic?.message}
                  selectedFileName={selectedFileNameBack}
                  setSelectedFileName={setSelectedFileNameBack}
                />
              </div>
              <Select
                label="Gender"
                star={' *'}
                register={register}
                name="gender"
                errorMessage={errors?.gender?.message}
              >
                <option value="">--Gender--</option>
                <>
                  {gender &&
                    gender.map((data: any) => (
                      <option key={data?._id} value={data?._id}>
                        {data.name}
                      </option>
                    ))}
                </>
              </Select>
            </div>
            <div className={style.btnContainer}>
              <Button text="Next" iconEnd={arrowRight} type="submit" isLoading={btnLoader} />
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default PersonalInformation;
