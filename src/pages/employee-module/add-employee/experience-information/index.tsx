import moment from 'moment'

import Button from 'components/button'
import TextField from 'components/textfield'
import DatePicker from 'components/date-picker'
import Table from 'components/table'
import ProfileUpload from 'components/profile-upload'
import SearchSelect from 'components/select-and-search-select'
import Checkbox from 'components/checkbox'

import { columns, useExperience } from './helper'
import countries from 'assets/countries.json'

import tick from 'assets/tick.svg'
import arrowRight from 'assets/arrowBtnRight.svg'
import arrowLeft from 'assets/backBtn.svg'
import style from './experience.module.scss'
import { useEmployeeForms } from '../context'

const ExperienceDetails = () => {
  const {
    handleNext,
    setFormData,
    employeeDocId,
    formData,
    handleBack,
    employeeId,
  }: any = useEmployeeForms()

  const {
    handleAddEduction,
    onSubmit,
    handleSubmit,
    register,
    errors,
    control,
    educations,
    setOnGoing,
    onGoing,
    handleEducation,
    handleDeleteIndex,
    btnLoader,
    getData,
    watch,
    cities,
    startDate,
    selectedFileName,
    setSelectedFileName,
  } = useExperience({
    handleBack,
    handleNext,
    formData,
    setFormData,
    employeeId,
    employeeDocId,
  })

  return (
    <>
      <div className={style.mainForm}>
        <form onSubmit={handleSubmit(handleAddEduction)}>
          <div className={style.grid}>
            <TextField
              name="company"
              label="Company"
              type="text"
              star={' *'}
              register={register}
              errorMessage={errors?.company?.message}
              placeholder="company"
            />
            <SearchSelect
              name={'country'}
              star={' *'}
              control={control}
              value={watch('country')}
              errorMessage={errors?.country?.message}
              options={countries?.map(({ name }) => name)}
              label="Country"
              onChange={(value) => {
                getData({
                  country: value,
                })
              }}
            />
            <SearchSelect
              name={'city'}
              star={' *'}
              register={register}
              control={control}
              value={watch('city')}
              errorMessage={errors?.city?.message}
              options={cities}
              label="City"
            />
            <TextField
              name="jobTitle"
              label="Job Title "
              star={' *'}
              register={register}
              errorMessage={errors?.jobTitle?.message}
              placeholder="Job Title"
            />
            <div>
              <label className={style.label}>Experience Letter</label>
              <ProfileUpload
                name={'letter'}
                register={register}
                selectedFileName={selectedFileName}
                setSelectedFileName={setSelectedFileName}
                id={'letter'}
                errorMessage={errors?.letter?.message}
                type={'application/pdf'}
              />
            </div>
            <DatePicker
              label="Job Start Date"
              name="jobStartDate"
              maxDate={new Date()}
              id="4"
              star={' *'}
              placeholder="Enter Start Date"
              control={control}
              errorMessage={errors?.jobStartDate?.message}
            />
            <div className={style.onGoingSection}>
              {!onGoing && (
                <DatePicker
                  label="Job End Date"
                  name="jobEndDate"
                  maxDate={new Date()}
                  star={' *'}
                  id="11"
                  placeholder="Enter End Date"
                  control={control}
                  errorMessage={errors?.jobEndDate?.message}
                  minDate={startDate}
                />
              )}

              <Checkbox
                label="On Going"
                handleChange={(e) => setOnGoing(e.target.checked)}
                name={'ongoing'}
                register={register}
                containerClass={style.containerClass}
              />
            </div>
          </div>
          <div className={style.btnContainer}>
            <p></p>
            <Button type="submit" text="Add" iconEnd={tick} />
          </div>
          <div style={{ marginTop: '30px' }}>
            <Table
              rows={educations.map((education) => ({
                ...education,
                tenure:
                  education.jobStartDate && education.jobEndDate
                    ? `${moment(education.jobEndDate).diff(
                        education.jobStartDate,
                        'months'
                      )} Months`
                    : 'On Going',
              }))}
              columns={columns}
              minWidth="1000px"
              handleEducation={handleEducation}
              handleDeleteIndex={handleDeleteIndex}
            />
          </div>
          <div className={style.btnContainer}>
            <Button
              text="Back"
              type="button"
              btnClass={style.btn}
              iconStart={arrowLeft}
              handleClick={() => handleBack('Education')}
            />
            <Button
              isLoading={btnLoader}
              text="Next"
              type={'button'}
              handleClick={onSubmit}
              iconEnd={arrowRight}
            />
          </div>
        </form>
      </div>
    </>
  )
}

export default ExperienceDetails
