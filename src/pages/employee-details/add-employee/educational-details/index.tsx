import Input from 'components/input';
import Button from 'components/button';
import DatePicker from 'components/date-picker';
import DeletePopup from 'components/delete-modal';
import NewTable from 'components/table/new-table';

import { useEducationInfo, columns } from './helper';

import style from '../add-employee.module.scss';
import add from 'assets/employee-page/Group 1853.png';
import arrowRight from 'assets/employee-page/arrow-right.svg';
import arrowLeft from 'assets/employee-page/arrow-left.svg';

interface Props {
  handleBack?: () => void;
  handleNext?: () => void;
  setFormData: any;
  formData: any;
  employeeId: string;
}

const EducationalDetails = ({
  handleBack,
  handleNext,
  setFormData,
  formData,
  employeeId,
}: Props) => {
  const {
    isLoading,
    openModal,
    educations,
    updateEdu,
    date,
    errors,
    control,
    register,
    handleSubmit,
    onSubmit,
    setOpenModal,
    setUpdateEdu,
    handleDelete,
    handleEducation,
    handleDateChange,
    handleAddEduction,
  } = useEducationInfo({
    handleNext,
    setFormData,
    formData,
    employeeId,
  });

  return (
    <div className={style.padding}>
      <form onSubmit={handleSubmit(handleAddEduction)} className={style.companyForm}>
        <div className={style.grid3}>
          <Input
            name="degree"
            label="Degree"
            type="text"
            star="*"
            inputRef={register}
            error={errors?.degree}
            errorMessage={errors?.degree?.message}
            placeholder="Degree"
          />
          <Input
            name="institute"
            label="Institute"
            star="*"
            type="text"
            inputRef={register}
            error={errors?.institute}
            errorMessage={errors?.institute?.message}
            placeholder="Institute"
          />
          <DatePicker
            label="Start Date"
            name="startDate"
            star="*"
            id="4"
            placeholder="Start Date"
            maxDate={new Date()}
            handleChange={handleDateChange}
            control={control}
            error={errors?.startDate}
          />
          <DatePicker
            label="End Date"
            name="endDate"
            star="*"
            id="5"
            maxDate={new Date()}
            minDate={date.startDate}
            placeholder="End Date"
            control={control}
            error={errors?.endDate}
          />
          <Input
            name="percentageCgpa"
            label="Percentage/CGPA"
            type="number"
            inputRef={register}
            star="*"
            error={errors?.percentageCgpa}
            errorMessage={errors?.percentageCgpa?.message}
            placeholder="Percentage/CGPA"
            step="any"
          />
          <button className={style.add} type="submit">
            <img src={add} alt="" />
            <p>Add More</p>
          </button>
        </div>
        <div style={{ marginTop: '30px' }}>
          <NewTable
            columns={columns}
            rows={educations}
            minWidth="1035px"
            tableHeight={style.educationTableHeight}
            handleEducation={handleEducation}
            handleModalOpen={() => setOpenModal(true)}
            handleDeleteIndex={(index) => setUpdateEdu({ ...updateEdu, editInd: index })}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px',
          }}
        >
          <div className={style.btnContainer}>
            <Button handleClick={handleBack} btnClass={style.button2} icon={arrowLeft} />
            <span>Back</span>
          </div>
          <div className={style.btnContainer}>
            <span>Next</span>
            <Button
              type="button"
              btnClass={educations?.length ? style.buttonEducation : style.btnEducation}
              icon={arrowRight}
              handleClick={onSubmit}
              isLoading={isLoading}
              disabled={educations?.length ? false : true}
            />
          </div>
        </div>
      </form>
      <DeletePopup handleDelete={handleDelete} open={openModal} setOpen={setOpenModal} />
    </div>
  );
};

export default EducationalDetails;
