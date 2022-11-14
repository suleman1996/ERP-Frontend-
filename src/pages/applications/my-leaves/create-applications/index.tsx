import Modal from 'components/modal';
import Selection from 'components/selection';
import DatePicker from 'components/date-picker';
import ProfileUpload from 'components/profile-upload';
import TextArea from 'components/textarea';
import { useForm } from 'react-hook-form';
import style from './create-applications.module.scss';

const CreateApplicationModal = ({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: Function;
}) => {
  const { control, register, errors, setError, clearErrors, handleSubmit, reset } = useForm({
    mode: 'all',
  });
  return (
    <Modal
      open={openModal}
      text="Apply"
      title={'Apply Leave Application'}
      handleClose={() => setOpenModal(false)}
      type="submit"
      form="createLeave"
      className={style.modelContainer}
    >
      <form onSubmit={(e) => {}} id="AddPolicy" className={style.gridView}>
        <Selection
          classNameLabel={style.classNameLabel}
          // wraperSelect={style.wraperSelect}
          label="Leave Type"
          placeholder="Select"
          // options={policyCategory}
          onChange={(item) => console.log(item)}
          name="leaveType"
          errorMessage={errors?.categoryId?.message}
          control={control}
        />
        <Selection
          classNameLabel={style.classNameLabel}
          wraperSelect={style.wraperSelect}
          label="Approval By"
          placeholder="Select"
          // options={policyCategory}
          onChange={(item) => console.log(item)}
          name="approvalBy"
          errorMessage={errors?.categoryId?.message}
          control={control}
        />
        <Selection
          classNameLabel={style.classNameLabel}
          wraperSelect={style.wraperSelect}
          label="HR By"
          placeholder="Select"
          // options={policyCategory}
          onChange={(item) => console.log(item)}
          name="hrBy"
          errorMessage={errors?.categoryId?.message}
          control={control}
        />
        <ProfileUpload
          label="Attachment"
          name={'pdf'}
          register={register}
          type="application/pdf,application/vnd.ms-excel"
          id={'file'}
          errorMessage={errors?.pdf?.message}
          className={style.fileUpload}
          classNameLabel={style.classNameLabel}
          // selectedFileName={selectedFileName}
          // setSelectedFileName={setSelectedFileName}
        />
        <DatePicker
          label={'From'}
          control={control}
          name="from"
          showTimeInput={true}
          // handleChange={(date) => console.log(date)}
          errorMessage={errors?.start?.message}
          placeholder={'Select Date and Time'}
        />
        <DatePicker
          label={'To'}
          control={control}
          name="to"
          showTimeInput={true}
          // handleChange={(date) => console.log(date)}
          errorMessage={errors?.start?.message}
          placeholder={'Select Date and Time'}
        />
        <TextArea
          className={style.textAreaGrid}
          label="Reason"
          placeholder="Enter Reason"
          register={register}
          name="reason"
          errorMessage={errors?.discription?.message}
        />
      </form>
    </Modal>
  );
};

export default CreateApplicationModal;
