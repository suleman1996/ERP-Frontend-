import Modal from 'components/modal';
import Selection from 'components/selection';
import DatePicker from 'components/date-picker';
import ProfileUpload from 'components/profile-upload';
import TextArea from 'components/textarea';
import { useForm } from 'react-hook-form';
import style from './create-applications.module.scss';
import { useEffect, useState } from 'react';
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
  setRender,
  editData,
}: {
  openModal: boolean;
  setOpenModal: Function;
  data: any;
  defaultLeaveType?: any;
  setRender?: any;
  editData?: any;
}) => {
  const [selectedFileName, setSelectedFileName] = useState<any>();
  const [btnLoader, setBtnLoader] = useState(false);
  const { control, register, errors, setError, clearErrors, handleSubmit, reset } = useForm({
    mode: 'all',
  });

  useEffect(() => {
    if (editData) {
      if (editData.rawData.attachment) {
        setSelectedFileName('Attached Document');
      }
      reset({
        leaveType: {
          value: editData.rawData.leaveType._id,
          label: editData.rawData.leaveType.name,
        },
        approvedBy: {
          value: editData.rawData.employee._id,
          label: editData.rawData.employee.fullName,
        },
        hrBy: {
          value: editData.rawData?.hr?._id,
          label: editData.rawData?.hr?.fullName,
        },
        dateFrom: new Date(editData.rawData.dateFrom),
        dateTo: new Date(editData.rawData.dateTo),
        reason: editData.rawData.reason,
      });
    }
  }, [editData]);

  const submitHandler = async (data: any) => {
    setBtnLoader(true);
    try {
      data.attachment = await convertBase64Image(data?.attachment[0]);
      const dateFrom = data.dateFrom !== 'Invalid date' ? data.dateFrom : '';
      const dateTo = data.dateTo !== 'Invalid date' ? data.dateTo : '';
      if (editData) {
        const res = await ApplicationService.editApplication({
          applicationId: editData.rawData._id,
          leaveType: data?.leaveType?.value,
          approvedBy: data?.approvedBy?.value,
          ...(dateFrom && { dateFrom }),
          ...(dateTo && { dateTo }),
          ...(data?.attachment && { attachment: data?.attachment }),
          reason: data?.reason,
          hrBy: data?.hrBy?.value,
        });
      } else {
        const res = await ApplicationService.applyApplication({
          leaveType: data?.leaveType?.value,
          approvedBy: data?.approvedBy?.value,
          ...(dateFrom && { dateFrom }),
          ...(dateTo && { dateTo }),
          ...(data?.attachment && { attachment: data?.attachment }),
          reason: data?.reason,
          hrBy: data?.hrBy?.value,
        });
      }

      setBtnLoader(false);
      setOpenModal(false);
      createNotification('success', 'success', 'Application Submitted');
      setRender((prev: any) => !prev);
    } catch (err: any) {
      if (err?.response?.data?.error) {
        setErrors(err?.response?.data?.error, setError);
      } else {
        createNotification('error', 'Error', err?.response?.data?.message);
      }
      setBtnLoader(false);
    }
  };

  return (
    <Modal
      open={openModal}
      text="Apply"
      title={'Apply Leave Application'}
      handleClose={() => setOpenModal(false)}
      type="submit"
      form="createLeave"
      btnClass={style.btnClass}
      className={style.modelContainer}
      loader={btnLoader}
      customHeader={style.customHeader}
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
          options={data?.leaves?.map((el: any) => ({ label: el.name, value: el._id }))}
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
          options={data?.employeeOnlyName?.map((el: any) => ({
            label: el.fullName,
            value: el._id,
          }))}
          name="approvedBy"
          errorMessage={errors?.approvedBy?.message}
          control={control}
        />
        <Selection
          classNameLabel={style.classNameLabel}
          wraperSelect={style.wraperSelect}
          label="HR By"
          placeholder="Select"
          options={data?.employeeOnlyName?.map((el: any) => ({
            label: el.fullName,
            value: el._id,
          }))}
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
