import Button from 'components/button'
import TextField from 'components/textfield'
import TextArea from 'components/textarea'
import Checkbox from 'components/checkbox'
import Selection from 'components/selection'

import { useAddressInfo } from './helper'
import countries from 'assets/countries.json'
import { useEmployeeForms } from '../context'

import arrowRight from 'assets/arrowBtnRight.svg'
import arrowLeft from 'assets/backBtn.svg'
import style from './address-information.module.scss'

countries.sort((a, b) => (a.name < b.name ? -1 : 1))

const AddressInformation = () => {
  const {
    handleNext,
    setFormData,
    employeeDocId,
    formData,
    setEmployeeDocId,
    handleBack,
    employeeId,
  }: any = useEmployeeForms()

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
    clearErrors,
  } = useAddressInfo({
    handleNext,
    handleBack,
    setFormData,
    formData,
    employeeId,
    employeeDocId,
    setEmployeeDocId,
  })
  return (
    <div className={style.mainForm}>
      <form
        onSubmit={(e) => {
          clearErrors()
          handleSubmit(onSubmit)(e)
        }}
      >
        <div>
          <h1>Current Address</h1>
        </div>
        <div className={style.grid}>
          <Selection
            name={'currentAddress.country'}
            star={' *'}
            control={control}
            value={watch('currentAddress.country')}
            errorMessage={errors?.currentAddress?.country?.message}
            options={countries?.map(({ name }) => {
              return { label: name, value: name }
            })}
            label="Country"
            getStates={getData}
            getDataLabel={'currentCountryData'}
          />
          <Selection
            name={'currentAddress.state'}
            star={' *'}
            control={control}
            value={watch('currentAddress.state')}
            errorMessage={errors?.currentAddress?.state?.message}
            options={currentCountryData?.map(({ name }) => {
              return { label: name, value: name }
            })}
            label="State"
            getCities={getCities}
            getCitiesLabel={'currentCitiesData'}
            currentCountryData={currentCountryData}
          />
          <Selection
            name={'currentAddress.city'}
            star={' *'}
            control={control}
            value={watch('currentAddress.city')}
            errorMessage={errors?.currentAddress?.city?.message}
            options={currentCitiesData?.map(({ name }) => {
              return { label: name, value: name }
            })}
            label="City"
          />
          <TextField
            name="currentAddress.postalCode"
            label="Postal Code "
            type="number"
            min={'0'}
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
          <Selection
            name={'permanentAddress.country'}
            star={' *'}
            control={control}
            value={watch('permanentAddress.country')}
            errorMessage={errors?.permanentAddress?.country?.message}
            options={countries?.map(({ name }) => {
              return { label: name, value: name }
            })}
            label="Country"
            getStates={getData}
            getDataLabel={'permanentCountryData'}
          />
          <Selection
            name={'permanentAddress.state'}
            star={' *'}
            control={control}
            value={watch('permanentAddress.state')}
            errorMessage={errors?.permanentAddress?.state?.message}
            options={permanentCountryData?.map(({ name }) => {
              return { label: name, value: name }
            })}
            label="State"
            getCities={getCities}
            getCitiesLabel={'permanentCitiesData'}
            currentCountryData={permanentCountryData}
          />
          <Selection
            label="City"
            star={' *'}
            name={'permanentAddress.city'}
            value={watch('permanentAddress.city')}
            control={control}
            errorMessage={errors?.permanentAddress?.city?.message}
            options={permanentCitiesData.map(({ name }) => {
              return { label: name, value: name }
            })}
          />
          <TextField
            name="permanentAddress.postalCode"
            star={'*'}
            min={'0'}
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
          <Button
            isLoading={btnLoader}
            text="Next"
            iconEnd={arrowRight}
            type="submit"
          />
        </div>
      </form>
    </div>
  )
}

export default AddressInformation
