import moment from 'moment'

import Button from 'components/button'
import TextField from 'components/textfield'
import DatePicker from 'components/date-picker'
import TimePicker from 'components/time-picker'
import Checkbox from 'components/checkbox'
import CustomTimePicker from 'components/custom-time-picker'

import { useCompanyInfo } from './helper'

import arrowRight from 'assets/arrowBtnRight.svg'
import arrowLeft from 'assets/backBtn.svg'
import style from './company-information.module.scss'
import WeekDay from 'components/week-day'
import { useEmployeeForms } from '../context'
import Selection from 'components/selection'

const CompanyInformation = () => {
  const {
    handleNext,
    setFormData,
    employeeDocId,
    formData,
    handleBack,
    employeeId,
  }: any = useEmployeeForms()

  const {
    onSubmit,
    register,
    handleSubmit,
    errors,
    clearErrors,
    control,
    watch,
    btnLoader,
    setProbation,
    probation,
    type,
    setType,
    departments,
    designation,
    leaves,
    check,
    setCheck,
    departmentChangeHandler,
    setCustomErr,
    customErr,
    probationDurationData,
    employmentTypeData,
    selectHoursDuration,
  } = useCompanyInfo({
    handleBack,
    handleNext,
    formData,
    setFormData,
    employeeId,
    employeeDocId,
  })

  return (
    <div className={style.mainForm}>
      <form
        onSubmit={(e) => {
          clearErrors()
          handleSubmit(onSubmit)(e)
        }}
      >
        <div className={style.grid}>
          <DatePicker
            label="Joining Date"
            placeholder="Enter Joining Date"
            name="joiningDate"
            id="1"
            star={' *'}
            control={control}
            errorMessage={errors?.joiningDate?.message}
            maxDate={moment(new Date()).add(3, 'M').toDate()}
          />
          <Selection
            label="Department"
            star={' *'}
            errorMessage={errors?.departmentId?.message}
            control={control}
            name="departmentId"
            changeHandler={departmentChangeHandler}
            options={departments?.map((item) => {
              return { label: item?.name, value: item?._id }
            })}
          />
          <Selection
            label="Designation"
            star={' *'}
            control={control}
            name="designationId"
            errorMessage={errors?.designationId?.message}
            options={designation?.map((item) => {
              return { label: item?.name, value: item?._id }
            })}
          />
          {leaves &&
            leaves.map((data: any, index: number) => {
              return (
                <div key={data.name}>
                  <TextField
                    name={`leaves.${index}.quantity`}
                    star={' *'}
                    label={`${data.name} Leave`}
                    type="number"
                    register={register}
                    min={'0'}
                    errorMessage={
                      errors.leaves && errors.leaves[index]?.quantity?.message
                    }
                    placeholder={`${data?.name} Leave`}
                  />
                </div>
              )
            })}
        </div>
        <div style={{ marginTop: '20px' }}>
          <label className={style.label}>Status</label>
          <Checkbox
            label="Probation"
            handleChange={(e) => setProbation(e.target.checked)}
            name={'probation'}
            register={register}
            containerClass={style.containerClass}
          />
        </div>
        {probation && (
          <div className={style.grid1}>
            <Selection
              label="Probation Duration"
              star={' *'}
              control={control}
              errorMessage={errors?.probationDurationDays?.message}
              name="probationDurationDays"
              options={probationDurationData}
            />
            <DatePicker
              label="Start Date"
              name="startDate"
              star={' *'}
              id="10"
              placeholder={
                watch().joiningDate &&
                moment(watch().joiningDate).format('MM/DD/YYYY')
              }
              control={control}
              errorMessage={errors?.startDate?.message}
              readOnly
            />
            <DatePicker
              label="End Date"
              name="endDate"
              star={' *'}
              id="100"
              placeholder={
                watch().joiningDate &&
                moment(watch().joiningDate)
                  .add(watch().probationDurationDays / 30, 'M')
                  .format('MM/DD/YYYY')
              }
              control={control}
              errorMessage={errors?.endDate?.message}
              readOnly
            />
          </div>
        )}
        <div className={style.grid}>
          <Selection
            label="Employment Type"
            name="employmentType"
            name1="type"
            star={' *'}
            control={control}
            errorMessage={errors?.employmentType?.message}
            options={employmentTypeData}
          />

          {watch()?.employmentType?.label === 'Full-Time' ? (
            <>
              <TimePicker
                label="Check in"
                name={'employmentInfo.checkIn'}
                star={' *'}
                register={register}
                errorMessage={errors?.employmentInfo?.checkIn?.message}
              />
              <TimePicker
                label="Check out"
                star={' *'}
                name={'employmentInfo.checkOut'}
                register={register}
                errorMessage={errors?.employmentInfo?.checkOut?.message}
              />
            </>
          ) : (
            <CustomTimePicker
              name={'employmentInfo.workingHours'}
              control={control}
              setCustomErr={setCustomErr}
              customErr={customErr}
              errorMessage={errors?.employmentInfo?.workingHours?.message}
              type={type}
              setType={setType}
              star={' *'}
              selectHoursDuration={selectHoursDuration}
            />
          )}
        </div>
        <WeekDay
          check={check}
          setCheck={setCheck}
          star={' *'}
          clearErrors={clearErrors}
          errorMessage={errors?.workingDaysInWeek?.message}
        />
        <div className={style.btnContainer}>
          <Button
            text="Back"
            type="button"
            btnClass={style.btn}
            iconStart={arrowLeft}
            handleClick={() => handleBack('Address')}
          />
          <Button
            isLoading={btnLoader}
            type={'submit'}
            text="Next"
            iconEnd={arrowRight}
          />
        </div>
      </form>
    </div>
  )
}

export default CompanyInformation
