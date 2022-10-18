import { Dispatch, SetStateAction } from 'react';
import Button from 'new-components/button';
import TextField from 'new-components/textfield';
import Select from 'new-components/select';
import TextArea from 'new-components/textarea';
import Checkbox from 'new-components/checkbox';
import SearchSelect from 'new-components/search-select';

import { useAddressInfo } from './helper';
import countries from 'new-assets/countries.json';

import arrowRight from 'new-assets/arrowBtnRight.svg';
import arrowLeft from 'new-assets/backBtn.svg';
import style from './address-information.module.scss';

interface Props {
  formData: any;
  setFormData: any;
  employeeId: string;
  handleBack: (data?: string) => void;
  handleNext: (data?: string) => void;
  employeeDocId?: string;
  setEmployeeDocId?: Dispatch<SetStateAction<string>>;
}

countries.sort((a, b) => (a.name < b.name ? -1 : 1));

const AddressInformation = ({
  handleNext,
  handleBack,
  setFormData,
  formData,
  employeeId,
  employeeDocId,
  setEmployeeDocId,
}: Props) => {
  const {
    btnLoader,
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
    control,
  } = useAddressInfo({
    handleNext,
    handleBack,
    setFormData,
    formData,
    employeeId,
    employeeDocId,
    setEmployeeDocId,
  });
  return (
    <div className={style.mainForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1>Current Address</h1>
        </div>
        <div className={style.grid}>
          <SearchSelect
            name={'currentAddress.country'}
            star={' *'}
            control={control}
            value={watch('currentAddress.country')}
            errorMessage={errors?.currentAddress?.country?.message}
            options={countries?.map(({ name }) => name)}
            label="Country"
            onChange={(value) => {
              getData('currentCountryData', {
                country: value,
              });
            }}
          />
          <SearchSelect
            name={'currentAddress.state'}
            star={' *'}
            control={control}
            value={watch('currentAddress.state')}
            errorMessage={errors?.currentAddress?.state?.message}
            options={currentCountryData?.map(({ name }) => name)}
            label="State"
            onChange={(value) => {
              getCities('currentCitiesData', currentCountryData, value);
            }}
          />
          <SearchSelect
            name={'currentAddress.city'}
            star={' *'}
            control={control}
            value={watch('currentAddress.city')}
            errorMessage={errors?.currentAddress?.city?.message}
            options={currentCitiesData?.map(({ name }) => name)}
            label="City"
          />
          <TextField
            name="currentAddress.postalCode"
            label="Postal Code "
            type="number"
            register={register}
            errorMessage={errors?.currentAddress?.postalCode?.message}
            placeholder="Postal Code"
            star={'*'}
          />
        </div>
        <TextArea
          name="currentAddress.address"
          star={'*'}
          label="Address "
          register={register}
          errorMessage={errors?.currentAddress?.address?.message}
          placeholder="Address"
          className={style.field}
        />
        <div className={style.flexClass}>
          <h1>Permanent Address</h1>
          <Checkbox
            label="Click here if same with the current address"
            checked={checkboxChecked}
            handleChange={handleCheck}
          />
        </div>
        <div className={style.grid}>
          <SearchSelect
            name={'permanentAddress.country'}
            star={' *'}
            control={control}
            value={watch('permanentAddress.country')}
            errorMessage={errors?.permanentAddress?.country?.message}
            options={countries?.map(({ name }) => name)}
            label="Country"
            onChange={(value) => {
              getData('permanentCountryData', {
                country: value,
              });
            }}
          />
          <SearchSelect
            name={'permanentAddress.state'}
            star={' *'}
            control={control}
            value={watch('permanentAddress.state')}
            errorMessage={errors?.permanentAddress?.state?.message}
            options={permanentCountryData?.map(({ name }) => name)}
            label="State"
            onChange={(value) => {
              getCities('permanentCitiesData', permanentCountryData, value);
            }}
          />
          <SearchSelect
            label="City"
            star={' *'}
            name={'permanentAddress.city'}
            value={watch('permanentAddress.city')}
            control={control}
            errorMessage={errors?.permanentAddress?.city?.message}
            options={permanentCitiesData.map(({ name }) => name)}
          />
          <TextField
            name="permanentAddress.postalCode"
            star={'*'}
            label="Postal Code "
            type="number"
            register={register}
            errorMessage={errors?.permanentAddress?.postalCode?.message}
            placeholder="Postal Code"
          />
        </div>
        <TextArea
          name="permanentAddress.address"
          star={'*'}
          label="Address "
          register={register}
          errorMessage={errors?.permanentAddress?.address?.message}
          placeholder="Address"
          className={style.field}
        />
        <div className={style.btnContainer}>
          <Button
            text="Back"
            type="button"
            btnClass={style.btn}
            iconStart={arrowLeft}
            handleClick={() => handleBack('Personal')}
          />
          <Button isLoading={btnLoader} text="Next" iconEnd={arrowRight} type="submit" />
        </div>
      </form>
    </div>
  );
};

export default AddressInformation;
