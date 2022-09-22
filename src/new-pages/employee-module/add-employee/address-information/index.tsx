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
}

countries.sort((a, b) => (a.name < b.name ? -1 : 1));

const AddressInformation = ({
  handleNext,
  handleBack,
  setFormData,
  formData,
  employeeId,
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
  });

  return (
    <div className={style.mainForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1>Current Address</h1>
        </div>
        <div className={style.grid}>
          <Select
            label="Country"
            name={'currentCountry'}
            star={'*'}
            errorMessage={errors?.currentCountry?.message}
            register={register}
            onChange={() => {
              getData('currentCountryData', {
                country: watch().currentCountry,
              });
            }}
          >
            <option value="">Country</option>
            <>
              {countries &&
                countries.map(({ name }) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
            </>
          </Select>
          <Select
            label="State"
            star={'*'}
            register={register}
            errorMessage={errors?.currentState?.message}
            name="currentState"
            value={watch('currentState')}
            onChange={() => {
              getCities('currentCitiesData', currentCountryData, watch().currentState);
            }}
          >
            <option value="">State</option>
            <>
              {currentCountryData &&
                currentCountryData.map(({ name }) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
            </>
          </Select>
          <SearchSelect
            name={'currentCity'}
            star={' *'}
            control={control}
            value={watch('currentCity')}
            errorMessage={errors?.currentCity?.message}
            options={currentCitiesData?.map(({ name }) => name)}
            label="City"
          />
          <TextField
            name="currentCode"
            label="Postal Code "
            type="number"
            register={register}
            errorMessage={errors?.currentCode?.message}
            placeholder="Postal Code"
            star={'*'}
          />
        </div>
        <TextArea
          name="currentAddress"
          star={'*'}
          label="Address "
          register={register}
          errorMessage={errors?.currentAddress?.message}
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
          <Select
            label="Country"
            star={'*'}
            name={'permanentCountry'}
            errorMessage={errors?.permanentCountry?.message}
            register={register}
            onChange={() => {
              getData('permanentCountryData', {
                country: watch().permanentCountry,
              });
            }}
          >
            <option value="">Country</option>
            <>
              {countries &&
                countries.map(({ name }) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
            </>
          </Select>
          <Select
            label="State"
            star={'*'}
            register={register}
            errorMessage={errors?.permanentState?.message}
            name="permanentState"
            onChange={() => {
              getCities('permanentCitiesData', permanentCountryData, watch().permanentState);
            }}
          >
            <option value="">State</option>
            <>
              {permanentCountryData &&
                permanentCountryData.map(({ name }) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
            </>
          </Select>
          <SearchSelect
            label="City"
            star={' *'}
            name={'permanentCity'}
            value={watch('permanentCity')}
            control={control}
            errorMessage={errors?.permanentCity?.message}
            options={permanentCitiesData.map(({ name }) => name)}
          />
          <TextField
            name="permanentCode"
            star={'*'}
            label="Postal Code "
            type="number"
            register={register}
            errorMessage={errors?.permanentCode?.message}
            placeholder="Postal Code"
          />
        </div>
        <TextArea
          name="permanentAddress"
          star={'*'}
          label="Address "
          register={register}
          errorMessage={errors?.permanentAddress?.message}
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
