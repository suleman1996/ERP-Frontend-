import Button from 'new-components/button';
import TextField from 'new-components/textfield';
import TextArea from 'new-components/textarea';
import DatePicker from 'new-components/date-picker';
import Table from 'new-components/table';
import ProfileUpload from 'new-components/profile-upload';
import Checkbox from 'new-components/checkbox';
import Select from 'new-components/select';

import { columns, useEducationDetail } from './helper';

import tick from 'new-assets/tick.svg';
import arrowLeft from 'new-assets/backBtn.svg';
import arrowRight from 'new-assets/arrowBtnRight.svg';
import style from './education.module.scss';

interface Props {
  formData: any;
  setFormData: any;
  employeeId: string;
  employeeDocId: string;
  handleBack: (data?: string) => void;
  handleNext: (data?: string) => void;
}

const EducationalDetails = ({
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
    register,
    control,
    errors,
    reset,
    educations,
    handleSubmit,
    handleEducation,
    btnLoader,
    setOngoing,
    ongiong,
    handleDeleteIndex,
    setStartDateHandle,
    startDateHandle,
    startDate,
    setValue,
    filename,
    setMarksType,
    marksType,
    setMarkVal,
    marksVal,
  } = useEducationDetail({
    handleBack,
    handleNext,
    formData,
    setFormData,
    employeeId,
    employeeDocId,
  });

  return (
    <div className={style.mainForm}>
      <form onSubmit={handleSubmit(handleAddEduction)}>
        <div className={style.grid}>
          <TextField
            name="institute"
            label="Institute"
            star={' *'}
            type="text"
            register={register}
            errorMessage={errors?.institute?.message}
            placeholder="Institute"
          />
          <TextField
            name="degree"
            label="Degree"
            star={' *'}
            type="text"
            register={register}
            errorMessage={errors?.degree?.message}
            placeholder="Degree"
          />
          <TextArea
            name="description"
            label="Description "
            register={register}
            errorMessage={errors?.description?.message}
            placeholder="Description"
            className={style.field}
          />
          <DatePicker
            label="Start Date"
            name="startDate"
            star={' *'}
            id="4"
            placeholder="Start Date"
            control={control}
            errorMessage={errors?.startDate?.message}
            minDate={'1900-01-01'}
          />
          <div className={style.onGoingSection}>
            {!ongiong && (
              <DatePicker
                label="End Date"
                name="endDate"
                star={' *'}
                id="5"
                control={control}
                errorMessage={errors?.endDate?.message}
                placeholder="End Date"
                minDate={startDate}
              />
            )}
            <Checkbox
              label="On Going"
              handleChange={(e) => setOngoing(e.target.checked)}
              name={'ongoing'}
              register={register}
              containerClass={style.containerClass}
            />
          </div>
          <Select
            label="Percentage/CGPA"
            name={'marksType'}
            name1={'marks'}
            selectContainer={style.selectContainer}
            wraperSelect={style.wraperSelect}
            withInput
            star={' *'}
            errorMessage={errors?.marks?.message}
            register={register}
          >
            <>
              {selectOptions &&
                selectOptions.map((ele) => (
                  <>
                    <option key={ele.value} value={ele.value}>
                      {ele.description}
                    </option>
                  </>
                ))}
            </>
          </Select>
          <div>
            <label
              style={{ color: errors?.transcript?.message && '#ff5050' }}
              className={style.label}
            >
              Transcript
            </label>
            <ProfileUpload
              name={'transcript'}
              register={register}
              id={'transcript'}
              defaultFileName={filename ? filename : ''}
              setFileName={(value: string) => setValue('filename', value)}
              errorMessage={errors?.transcript?.message}
              type={'application/pdf'}
            />
          </div>
        </div>
        <div className={style.btnContainer}>
          <p></p>
          <Button
            type="submit"
            text="Add"
            iconEnd={tick}
            // disabled={marksType === 'percentage' && marksVal ? marksVal > 101 : true}
          />
        </div>
        <div style={{ marginTop: '30px' }}>
          <Table
            rows={educations.map((education) => ({
              ...education,
              endDate: education.endDate || '---',
            }))}
            columns={columns}
            minWidth="950px"
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
            handleClick={() => handleBack('Company')}
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
  );
};

export default EducationalDetails;

export const selectOptions = [
  {
    value: 'percentage',
    description: 'Percentage',
  },
  {
    value: 'cgpa',
    description: 'CGPA',
  },
];
