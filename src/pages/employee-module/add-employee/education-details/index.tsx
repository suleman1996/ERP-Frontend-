import moment from 'moment'

import Button from 'components/button'
import TextField from 'components/textfield'
import TextArea from 'components/textarea'
import DatePicker from 'components/date-picker'
import Table from 'components/table'
import ProfileUpload from 'components/profile-upload'
import Checkbox from 'components/checkbox'
import Selection from 'components/selection'

import { columns, useEducationDetail } from './helper'
import { useEmployeeForms } from '../context'

import tick from 'assets/tick.svg'
import arrowLeft from 'assets/backBtn.svg'
import arrowRight from 'assets/arrowBtnRight.svg'
import style from './education.module.scss'

const EducationalDetails = () => {
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
    register,
    control,
    errors,
    educations,
    handleSubmit,
    handleEducation,
    btnLoader,
    setOngoing,
    watch,
    handleDeleteIndex,
    startDate,
    setValue,
    filename,
    selectedFileName,
    setSelectedFileName,
    selectOptions,
  } = useEducationDetail({
    handleBack,
    handleNext,
    formData,
    setFormData,
    employeeId,
    employeeDocId,
  })

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
            maxDate={new Date()}
            star={' *'}
            id="4"
            placeholder="Start Date"
            control={control}
            errorMessage={errors?.startDate?.message}
            minDate={'1900-01-01'}
          />
          <div className={style.onGoingSection}>
            {!watch().ongoing && (
              <DatePicker
                label="End Date"
                name="endDate"
                maxDate={new Date()}
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
          <Selection
            label="Percentage/CGPA"
            name={'marksType'}
            name1={'marks'}
            selectContainer={style.selectContainer}
            wraperSelect={style.wraperSelect}
            star={' *'}
            withInput
            register={register}
            errorMessage={errors?.marks?.message}
            control={control}
            defaultValue={{
              label: selectOptions[1].label,
              value: selectOptions[1].value,
            }}
            options={selectOptions}
          />
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
              selectedFileName={selectedFileName}
              setSelectedFileName={setSelectedFileName}
              defaultFileName={filename ? filename : ''}
              setFileName={(value: string) => setValue('filename', value)}
              errorMessage={errors?.transcript?.message}
              type={'application/pdf'}
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
              endDate:
                (education.endDate &&
                  moment(education.endDate).format('Do MMMM YYYY')) ||
                '---',
              startDate: moment(education.startDate).format('Do MMMM YYYY'),
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
  )
}

export default EducationalDetails
