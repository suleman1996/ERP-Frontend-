import moment from 'moment';

import Button from 'new-components/button';
import TextField from 'new-components/textfield';
import Select from 'new-components/select';
import TextArea from 'new-components/textarea';
import DatePicker from 'new-components/date-picker';
import Radio from 'new-components/radio';
import TimePicker from 'new-components/time-picker';
import Checkbox from 'new-components/checkbox';

import { selectCountry, employmentType, department, schema, useCompanyInfo } from './helper';

import arrowRight from 'new-assets/arrowBtnRight.svg';
import arrowLeft from 'new-assets/backBtn.svg';
import style from './company-information.module.scss';
import CustomTimePicker from 'components/custom-time-picker';

interface Props {
  handleBack: (data?: string) => void;
  handleNext: (data?: string) => void;
  formData: any;
  setFormData: any;
  employeeId: string;
}

const CompanyInformation = ({
  handleNext,
  handleBack,
  formData,
  setFormData,
  employeeId,
}: Props) => {
  const {
    onSubmit,
    register,
    handleSubmit,
    errors,
    control,
    watch,
    btnLoader,
    setProbation,
    probation,
  } = useCompanyInfo({
    handleBack,
    handleNext,
    formData,
    setFormData,
    employeeId,
  });

  return (
    <div className={style.mainForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            errorMessage={errors?.department?.message}
            register={register}
            name="department"
          >
            <option value="">Department</option>
            <>
              {department &&
                department.map(({ value, description }) => (
                  <option key={value} value={value}>
                    {description}
                  </option>
                ))}
            </>
          </Select>
          <Select
            label="Designation"
            star={' *'}
            register={register}
            name="designation"
            errorMessage={errors?.designation?.message}
          >
            <option value="">Designation</option>
            <>
              {selectCountry &&
                selectCountry.map(({ value, description }) => (
                  <option key={value} value={value}>
                    {description}
                  </option>
                ))}
            </>
          </Select>
          <TextField
            name="annualLeaves"
            star={' *'}
            label="Annual Leaves"
            type="number"
            register={register}
            errorMessage={errors?.annualLeaves?.message}
            placeholder="Annual Leaves"
          />
          <TextField
            name="medicalLeaves"
            label="Medical Leaves"
            star={' *'}
            type="number"
            register={register}
            errorMessage={errors?.medicalLeaves?.message}
            placeholder="Medical Leaves"
          />
          <TextField
            name="casualLeaves"
            star={' *'}
            label="Casual Leaves"
            type="number"
            register={register}
            errorMessage={errors?.casualLeaves?.message}
            placeholder="Casual Leaves"
          />
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
            label="Employee Type"
            name="employmentType"
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
                name={'checkIn'}
                register={register}
                errorMessage={errors?.checkIn?.message}
              />
              <TimePicker
                label="Check out"
                name={'checkOut'}
                register={register}
                errorMessage={errors?.checkOut?.message}
              />
            </>
          ) : (
            <CustomTimePicker
              name={'workingHours'}
              control={control}
              errorMessage={errors?.workingHours?.message}
            />
            // <TimePicker
            //   label="Working Hours"
            //   name={'workingHours'}
            //   star={' *'}
            //   register={register}
            //   errorMessage={errors?.workingTime?.message}
            // />
          )}
          {console.log('errr', errors)}
        </div>
        <TextArea
          name="note"
          label="Note "
          register={register}
          errorMessage={errors?.note?.message}
          placeholder="Note"
          className={style.field}
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
