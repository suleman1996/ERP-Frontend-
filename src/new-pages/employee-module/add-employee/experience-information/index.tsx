import moment from 'moment';

import Button from 'new-components/button';
import TextField from 'new-components/textfield';
import DatePicker from 'new-components/date-picker';
import Table from 'new-components/table';
import ProfileUpload from 'new-components/profile-upload';
import Select from 'new-components/select';
import SearchSelect from 'new-components/search-select';
import Checkbox from 'new-components/checkbox';

import { selectCountry, rows, columns, useExperience } from './helper';
import countries from 'new-assets/countries.json';

import tick from 'new-assets/tick.svg';
import arrowRight from 'new-assets/arrowBtnRight.svg';
import arrowLeft from 'new-assets/backBtn.svg';
import style from './experience.module.scss';

interface Props {
  formData: any;
  setFormData: any;
  employeeId: string;
  handleBack: (data?: string) => void;
  handleNext: (data?: string) => void;
  employeeDocId?: any;
}

const ExperienceDetails = ({
  handleBack,
  handleNext,
  formData,
  setFormData,
  employeeId,
  employeeDocId,
}: Props) => {
  const {
    handleAddEduction,
    onSubmit,
    handleSubmit,
    register,
    reset,
    errors,
    control,
    educations,
    openTenure,
    setOpenTenure,
    setOnGoing,
    onGoing,
    handleEducation,
    handleDeleteIndex,
    btnLoader,
    getData,
    watch,
    cities,
    startDate,
    currentCountryData,
  } = useExperience({
    handleBack,
    handleNext,
    formData,
    setFormData,
    employeeId,
    employeeDocId,
  });

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
                });
              }}
            />
            <SearchSelect
              name={'city'}
              star={' *'}
              register={register}
              control={control}
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
                id={'letter'}
                errorMessage={errors?.letter?.message}
                type={'application/pdf'}
              />
            </div>
            <DatePicker
              label="Job Start Date"
              name="jobStartDate"
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
                    ? `${moment(watch().jobEndDate).diff(watch().jobStartDate, 'days')} Days`
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
  );
};

export default ExperienceDetails;
