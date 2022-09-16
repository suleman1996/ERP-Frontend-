import Input from 'components/input';
import Button from 'components/button';
import Select from 'components/select';
import Loading from 'components/loading';
import Checkbox from 'components/checkbox';

import { useAddressInfo } from './helper';

import style from '../add-employee.module.scss';
import arrowRight from 'assets/employee-page/arrow-right.svg';
import arrowLeft from 'assets/employee-page/arrow-left.svg';
import countries from 'assets/countries.json';

interface Props {
  formData: any;
  setFormData: any;
  employeeId: string;
  handleBack: () => void;
  handleNext: () => void;
}

countries.sort((a, b) => (a.name < b.name ? -1 : 1));

const AddressInformation = ({
  handleBack,
  handleNext,
  setFormData,
  formData,
  employeeId,
}: Props) => {
  const {
    isLoading,
    currentCountryData,
    currentCitiesData,
    permanentCitiesData,
    permanentCountryData,
    checkboxChecked,
    errors,
    register,
    handleSubmit,
    onSubmit,
    handleCheck,
    getCities,
    getData,
    watch,
  } = useAddressInfo({
    handleBack,
    handleNext,
    setFormData,
    formData,
    employeeId,
  });

  return (
    <div className={style.padding}>
      <form className={style.form1} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1>Current Address</h1>
          <div className={style.grid1}>
            <Select
              label="Country"
              name="currentCountry"
              star="*"
              options={countries?.map((data) => {
                return data.name;
              })}
              error={errors?.currentCountry}
              errorMessage={errors?.currentCountry?.message}
              placeHolder="Select Country"
              inputRef={register}
              onChange={() => {
                getData('currentCountryData', {
                  country: watch().currentCountry,
                });
              }}
            />
            <Select
              name="currentState"
              label="State "
              star="*"
              options={currentCountryData?.map((data: any) => {
                return data.name;
              })}
              inputRef={register}
              error={errors?.currentState}
              errorMessage={errors?.currentState?.message}
              placeHolder="Select State"
              onChange={() => {
                getCities('currentCitiesData', currentCountryData, watch().currentState);
              }}
            />
            <Select
              name="currentCity"
              label="City Name "
              star="*"
              options={currentCitiesData?.map((data: any) => {
                return data.name;
              })}
              inputRef={register}
              error={errors?.currentCity}
              errorMessage={errors?.currentCity?.message}
              placeHolder="Select City"
            />
            <div className={style.first}>
              <Input
                name="currentCode"
                label="Postal Code "
                type="number"
                star="*"
                inputRef={register}
                error={errors?.currentCode}
                errorMessage={errors?.currentCode?.message}
                placeholder="Postal Code"
              />
            </div>
            <div className={style.second}>
              <Input
                name="currentAddress"
                label="Address "
                star="*"
                type="text"
                inputRef={register}
                error={errors?.currentAddress}
                errorMessage={errors?.currentAddress?.message}
                placeholder="Address"
              />
            </div>
          </div>
          <div className={style.heading}>
            <h1 style={{ marginTop: '35px' }}>Permanent Address</h1>
            <Checkbox
              labelClass={style.checkBoxLabel}
              label="Same as current address "
              checked={checkboxChecked}
              handleChange={handleCheck}
            />
          </div>
          <div className={style.grid1}>
            {isLoading ? (
              <div className={style.loaderDiv}>
                <Loading loaderClass={style.loadingStyle} />
              </div>
            ) : (
              <>
                <Select
                  name="permanentCountry"
                  label="Country "
                  star="*"
                  options={countries.map((data: any) => {
                    return data.name;
                  })}
                  inputRef={register}
                  error={errors?.permanentCountry}
                  errorMessage={errors?.permanentCountry?.message}
                  placeHolder="Select Country"
                  onChange={() => {
                    getData('permanentCountryData', {
                      country: watch().permanentCountry,
                    });
                  }}
                />
                <Select
                  name="permanentState"
                  label="State "
                  star="*"
                  options={permanentCountryData.map((data: any) => {
                    return data.name;
                  })}
                  inputRef={register}
                  error={errors?.permanentState}
                  errorMessage={errors?.permanentState?.message}
                  placeHolder="Select State"
                  onChange={() => {
                    getCities('permanentCitiesData', permanentCountryData, watch().permanentState);
                  }}
                />
                <Select
                  name="permanentCity"
                  label="City Name "
                  star="*"
                  options={permanentCitiesData.map((data: any) => {
                    return data.name;
                  })}
                  inputRef={register}
                  error={errors?.permanentCity}
                  errorMessage={errors?.permanentCity?.message}
                  placeHolder="Select City"
                />
                <div className={style.first}>
                  <Input
                    name="permanentCode"
                    label="Postal Code  "
                    type="number"
                    star="*"
                    inputRef={register}
                    error={errors?.permanentCode}
                    errorMessage={errors?.permanentCode?.message}
                    placeholder="Postal Code"
                  />
                </div>
                <div className={style.second}>
                  <Input
                    name="permanentAddress"
                    label="Address "
                    star="*"
                    type="text"
                    inputRef={register}
                    error={errors?.permanentAddress}
                    errorMessage={errors?.permanentAddress?.message}
                    placeholder="Address"
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px',
          }}
        >
          <div className={style.btnContainer}>
            <Button handleClick={handleBack} btnClass={style.button2} icon={arrowLeft} />
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

export default AddressInformation;
