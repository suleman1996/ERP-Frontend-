import Modal from 'components/modal'
import Selection from 'components/selection'
import DatePicker from 'components/date-picker'
import ProfileUpload from 'components/profile-upload'
import TextArea from 'components/textarea'
import { useForm } from 'react-hook-form'
import style from './create-applications.module.scss'
import { useEffect, useState } from 'react'
import { convertBase64Image } from 'main-helper'
import ApplicationService from 'services/application-service'
import { setErrors } from 'helper'
import { createNotification } from 'common/create-notification'

const CreateApplicationModal = ({
  openModal,
  setOpenModal,
  data,
  defaultLeaveType,
  setRender,
  editData,
  type,
  value,
}: {
  openModal: boolean
  setOpenModal?: any
  data: any
  defaultLeaveType?: any
  setRender?: any
  editData?: any
  type?: any
  value?: any
}) => {
  const [selectedFileName, setSelectedFileName] = useState<any>()
  const [btnLoader, setBtnLoader] = useState(false)
  const [disabled] = useState(value?.approverStatus == 'Pending' ? true : false)
  const {
    control,
    register,
    errors,
    setError,
    clearErrors,
    handleSubmit,
    reset,
  } = useForm({
    mode: 'all',
  })

  useEffect(() => {
    if (editData) {
      if (editData.rawData.attachment) {
        setSelectedFileName('Attached Document')
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
      })
    }
  }, [editData])

  useEffect(() => {
    if (value) {
      if (value.attachment) {
        setSelectedFileName('Attached Document')
      }
      reset({
        leaveType: {
          value: value.leaveType._id,
          label: value.leaveType.name,
        },
        approvedBy: {
          value: value.employee._id,
          label: value.employee.fullName,
        },
        hrBy: {
          value: value?.hr?._id,
          label: value?.hr?.fullName,
        },
        dateFrom: new Date(value.dateFrom),
        dateTo: new Date(value.dateTo),
        reason: value.reason,
      })
    }
  }, [value])

  const submitHandler = async (data: any) => {
    setBtnLoader(true)
    try {
      data.attachment = await convertBase64Image(data?.attachment[0])
      const dateFrom = data.dateFrom !== 'Invalid date' ? data.dateFrom : ''
      const dateTo = data.dateTo !== 'Invalid date' ? data.dateTo : ''
      if (editData) {
        await ApplicationService.editApplication({
          applicationId: editData.rawData._id,
          leaveType: data?.leaveType?.value,
          approvedBy: data?.approvedBy?.value,
          ...(dateFrom && { dateFrom }),
          ...(dateTo && { dateTo }),
          ...(data?.attachment &&
            selectedFileName && { attachment: data?.attachment }),
          reason: data?.reason,
          hrBy: data?.hrBy?.value,
        })
      } else if (value?.approverStatus == 'Pending') {
        await ApplicationService.approveApplication(value?._id, {
          ...(data?.managerRemarks && {
            approverRemarks: data?.managerRemarks,
          }),
        })
        setRender((prev: any) => !prev)
      } else {
        await ApplicationService.applyApplication({
          leaveType: data?.leaveType?.value,
          approvedBy: data?.approvedBy?.value,
          ...(dateFrom && { dateFrom }),
          ...(dateTo && { dateTo }),
          ...(data?.attachment &&
            selectedFileName && { attachment: data?.attachment }),
          reason: data?.reason,
          hrBy: data?.hrBy?.value,
        })
      }

      setBtnLoader(false)
      setOpenModal(false)
      createNotification('success', 'success', 'Application Submitted')
      setRender((prev: any) => !prev)
    } catch (err: any) {
      if (err?.response?.data?.error) {
        setErrors(err?.response?.data?.error, setError)
      } else {
        createNotification('error', 'Error', err?.response?.data?.message)
      }
      setBtnLoader(false)
    }
  }

  return (
    <Modal
      open={openModal}
      text="Apply"
      title={'Apply Leave Application'}
      handleClose={() => setOpenModal(false)}
      type="submit"
      form="createLeave"
      loader={btnLoader}
    >
      <form
        onSubmit={(e) => {
          clearErrors()
          handleSubmit(submitHandler)(e)
        }}
        id="createLeave"
        className={style.gridView}
      >
        <Selection
          label="Leave Type"
          placeholder="Select"
          options={data?.leaves?.map((el: any) => ({
            label: el.name,
            value: el._id,
          }))}
          name="leaveType"
          errorMessage={errors?.leaveType?.message}
          control={control}
          defaultValue={defaultLeaveType}
          isDisabled={disabled}
        />
        <Selection
          label="Approval By"
          placeholder="Select"
          options={data?.employeeOnlyName?.map((el: any) => ({
            label: el.fullName,
            value: el._id,
          }))}
          name="approvedBy"
          errorMessage={errors?.approvedBy?.message}
          control={control}
          isDisabled={disabled}
        />
        <Selection
          label="HR By"
          placeholder="Select"
          options={data?.employeeOnlyName?.map((el: any) => ({
            label: el.fullName,
            value: el._id,
          }))}
          name="hrBy"
          errorMessage={errors?.hrBy?.message}
          control={control}
          isDisabled={disabled}
        />
        <ProfileUpload
          label="Attachment"
          name={'attachment'}
          register={register}
          type="application/pdf,application/vnd.ms-excel"
          id={'file'}
          placeholder="Upload a file"
          errorMessage={errors?.attachment?.message}
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
          isDisable={disabled}
        />
        <DatePicker
          label={'To'}
          control={control}
          name="dateTo"
          showTimeInput={true}
          errorMessage={errors?.dateTo?.message}
          placeholder={'Select Date and Time'}
          isDisable={disabled}
        />
        <TextArea
          label="Reason"
          placeholder="Enter Reason"
          register={register}
          name="reason"
          errorMessage={errors?.reason?.message}
          isDisable={disabled}
          className={style.textAreaGrid}
        />
        {type?.name == 'approvalManager' && (
          <TextArea
            label="Manager Remarks"
            placeholder="Enter REmarks"
            register={register}
            name="managerRemarks"
            className={style.textAreaGrid}
            errorMessage={errors?.remarks?.message}
          />
        )}
      </form>
    </Modal>
  )
}

export default CreateApplicationModal
