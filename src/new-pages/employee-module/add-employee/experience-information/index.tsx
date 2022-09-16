import Button from 'new-components/button';
import TextField from 'new-components/textfield';
import DatePicker from 'new-components/date-picker';
import Table from 'new-components/table';
import ProfileUpload from 'new-components/profile-upload';
import Select from 'new-components/select';
import SearchSelect from 'new-components/search-select';
import Checkbox from 'new-components/checkbox';

import { selectCountry, rows, columns, schema, useExperience } from './helper';
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
}

const ExperienceDetails = ({
  handleBack,
  handleNext,
  formData,
  setFormData,
  employeeId,
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
  } = useExperience({
    handleBack,
    handleNext,
    formData,
    setFormData,
    employeeId,
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
              register={register}
              errorMessage={errors?.company?.message}
              placeholder="company"
            />
            <Select
              label="Country"
              name={'country'}
              errorMessage={errors?.country?.message}
              register={register}
              onChange={() => {
                getData({
                  country: watch().country,
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
            <SearchSelect
              name={'city'}
              register={register}
              control={control}
              errorMessage={errors?.city?.message}
              options={cities}
              label="City"
            />
            <TextField
              name="jobTitle"
              label="Job Title "
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
              placeholder="Enter Start Date"
              control={control}
              errorMessage={errors?.jobStartDate?.message}
            />
            <div className={style.onGoingSection}>
              {!onGoing && (
                <DatePicker
                  label="Job End Date"
                  name="jobEndDate"
                  id="4"
                  placeholder="Enter End Date"
                  control={control}
                  errorMessage={errors?.jobEndDate?.message}
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
              rows={educations}
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
