import moment from 'moment';

import Button from 'components/button';
import TextField from 'components/textfield';
import Select from 'components/select';
import DatePicker from 'components/date-picker';
import TimePicker from 'components/time-picker';
import Checkbox from 'components/checkbox';
import CustomTimePicker from 'components/custom-time-picker';

import { employmentType, useCompanyInfo } from './helper';

import arrowRight from 'assets/arrowBtnRight.svg';
import arrowLeft from 'assets/backBtn.svg';
import style from './company-information.module.scss';
import WeekDay from 'components/week-day';
import { useEffect } from 'react';
import { useEmployeeForms } from '../context';

interface Props {
  handleBack: (data?: string) => void;
  handleNext: (data?: string) => void;
  formData: any;
  setFormData: any;
  employeeId: string;
  employeeDocId?: string | any;
}

const CompanyInformation = () => {
  const {
    handleNext,
    setFormData,
    employeeDocId,
    formData,
    setEmployeeId,
    setEmployeeDocId,
    handleBack,
    employeeId,
  }: any = useEmployeeForms();

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
  } = useCompanyInfo({
    handleBack,
    handleNext,
    formData,
    setFormData,
    employeeId,
    employeeDocId,
  });

  return (
    <div className={style.mainForm}>
      <form
        onSubmit={(e) => {
          clearErrors();
          handleSubmit(onSubmit)(e);
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
          <Select
            label="Department"
            star={' *'}
            errorMessage={errors?.departmentId?.message}
            register={register}
            name="departmentId"
            onChange={departmentChangeHandler}
          >
            <option value="">Department</option>
            <>
              {departments &&
                departments.map((data: any) => (
                  <option key={data?._id} value={data?._id}>
                    {data.name}
                  </option>
                ))}
            </>
          </Select>
          <Select
            label="Designation"
            star={' *'}
            register={register}
            name="designationId"
            errorMessage={errors?.designationId?.message}
          >
            <option value="">Designation</option>
            <>
              {designation &&
                designation.map((data: any) => (
                  <option key={data?.departmentSettingId} value={data?._id}>
                    {data.name}
                  </option>
                ))}
            </>
          </Select>
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
                    errorMessage={errors.leaves && errors.leaves[index]?.quantity?.message}
                    placeholder={`${data?.name} Leave`}
                  />
                </div>
              );
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
            <Select
              label="Probation Duration"
              star={' *'}
              register={register}
              errorMessage={errors?.probationDurationDays?.message}
              name="probationDurationDays"
            >
              <option value="60">2 Months</option>
              <option value="90">3 Months</option>
              <option value="120">4 Months</option>
              <option value="150">5 Months</option>
              <option value="180">6 Months</option>
            </Select>
            <DatePicker
              label="Start Date"
              name="startDate"
              star={' *'}
              id="10"
              placeholder={watch().joiningDate && moment(watch().joiningDate).format('MM/DD/YYYY')}
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
          <Select
            label="Employment Type"
            name="employmentType"
            name1="type"
            star={' *'}
            register={register}
            errorMessage={errors?.employmentType?.message}
          >
            <>
              {employmentType.length &&
                employmentType.map(({ value, description }) => (
                  <option key={value} value={value}>
                    {description}
                  </option>
                ))}
            </>
          </Select>
          {watch().employmentType === 'Full-Time' ? (
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
          <Button isLoading={btnLoader} type={'submit'} text="Next" iconEnd={arrowRight} />
        </div>
      </form>
    </div>
  );
};

export default CompanyInformation;
