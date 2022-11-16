import Modal from 'components/modal';
import Selection from 'components/selection';
import DatePicker from 'components/date-picker';
import ProfileUpload from 'components/profile-upload';
import TextArea from 'components/textarea';
import { useForm } from 'react-hook-form';
import style from './create-applications.module.scss';
import { useState } from 'react';
import { convertBase64Image } from 'main-helper';
import ApplicationService from 'services/application-service';
import moment from 'moment';
import { setErrors } from 'helper';
import { createNotification } from 'common/create-notification';

const CreateApplicationModal = ({
  openModal,
  setOpenModal,
  data,
  defaultLeaveType,
}: {
  openModal: boolean;
  setOpenModal: Function;
  data: any;
  defaultLeaveType?: any;
}) => {
  const [selectedFileName, setSelectedFileName] = useState<any>();
  const [btnLoader, setBtnLoader] = useState(false);
  const { control, register, errors, setError, clearErrors, handleSubmit, reset } = useForm({
    mode: 'all',
  });

  const submitHandler = async (data: any) => {
    setBtnLoader(true);
    try {
      data.attachment = await convertBase64Image(data?.attachment[0]);
      const dateFrom = data.dateFrom !== 'Invalid date' ? data.dateFrom : '';
      const dateTo = data.dateTo !== 'Invalid date' ? data.dateTo : '';
      const res = await ApplicationService.applyApplication({
        leaveType: data?.leaveType?.value,
        approvedBy: data?.approvedBy?.value,
        ...(dateFrom && { dateFrom }),
        ...(dateTo && { dateTo }),
        ...(data?.attachment && { attachment: data?.attachment }),
        reason: data?.reason,
        hrBy: data?.approvedBy?.value,
      });
      setBtnLoader(false);
      setOpenModal(false);
      createNotification('success', 'success', 'Application Submitted');
    } catch (err: any) {
      if (err?.response?.data?.error) {
        console.log(err?.response?.data?.error);
        setErrors(err?.response?.data?.error, setError);
      } else {
        createNotification('error', 'Error', err?.response?.data?.message);
      }
      setBtnLoader(false);
    }
  };

  console.log(errors);

  return (
    <Modal
      open={openModal}
      text="Apply"
      title={'Apply Leave Application'}
      handleClose={() => setOpenModal(false)}
      type="submit"
      form="createLeave"
      className={style.modelContainer}
      loader={btnLoader}
    >
      <form
        onSubmit={(e) => {
          clearErrors();
          handleSubmit(submitHandler)(e);
        }}
        id="createLeave"
        className={style.gridView}
      >
        <Selection
          classNameLabel={style.classNameLabel}
          label="Leave Type"
          placeholder="Select"
          options={data.leaves.map((el: any) => ({ label: el.name, value: el._id }))}
          name="leaveType"
          errorMessage={errors?.leaveType?.message}
          control={control}
          defaultValue={defaultLeaveType}
          placeHolderStyle={{ color: '#2D2D32' }}
        />
        <Selection
          classNameLabel={style.classNameLabel}
          wraperSelect={style.wraperSelect}
          label="Approval By"
          placeholder="Select"
          options={data.employeeOnlyName.map((el: any) => ({ label: el.fullName, value: el._id }))}
          name="approvedBy"
          errorMessage={errors?.approvedBy?.message}
          control={control}
        />
        <Selection
          classNameLabel={style.classNameLabel}
          wraperSelect={style.wraperSelect}
          label="HR By"
          placeholder="Select"
          options={data?.hr?.map((el: any) => ({ label: el.fullName, value: el._id }))}
          name="hrBy"
          errorMessage={errors?.hrBy?.message}
          control={control}
        />
        <ProfileUpload
          label="Attachment"
          name={'attachment'}
          register={register}
          type="application/pdf,application/vnd.ms-excel"
          id={'file'}
          placeholder="Upload a file"
          errorMessage={errors?.attachment?.message}
          className={style.fileUpload}
          classNameLabel={style.classNameLabel}
          selectedFileName={selectedFileName}
          setSelectedFileName={setSelectedFileName}
        />
        <DatePicker
          label={'From'}
          control={control}
          name="dateFrom"
          showTimeInput={true}
          errorMessage={errors?.dateFrom?.message}
          placeholder={'Select Date and Time'}
        />
        <DatePicker
          label={'To'}
          control={control}
          name="dateTo"
          showTimeInput={true}
          errorMessage={errors?.dateTo?.message}
          placeholder={'Select Date and Time'}
        />
        <TextArea
          className={style.textAreaGrid}
          label="Reason"
          placeholder="Enter Reason"
          register={register}
          name="reason"
          errorMessage={errors?.reason?.message}
        />
      </form>
    </Modal>
  );
};

export default CreateApplicationModal;
