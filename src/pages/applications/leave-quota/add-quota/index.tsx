import moment from 'moment'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import Modal from 'components/modal'
import Selection from 'components/selection'
import DatePicker from 'components/date-picker'
import { createNotification } from 'common/create-notification'
import TextField from 'components/textfield'

import { setErrors } from 'helper'
import SettingsService from 'services/settings-service'
import ApplicationService from 'services/application-service'

import style from './add-quota.module.scss'

const AddQuotaModal = ({
  openModal,
  setOpenModal,
  setRenderState,
  btnText,
  title,
  selectedLeaveQuota,
}: {
  openModal: boolean
  setOpenModal?: any
  defaultLeaveType?: any
  setRender?: any
  editData?: any
  setRenderState?: any
  btnText?: string
  title?: string
  selectedLeaveQuota?: any
}) => {
  const [btnLoader, setBtnLoader] = useState(false)
  const [leaves, setLeaves] = useState({})

  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const leavesNameMap: any = leaves?.leaveTypes?.reduce((acc: any, curr) => {
    acc[curr?.name?.toLowerCase()] = curr?._id
    return acc
  }, {})

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
    title && handleEdit(selectedLeaveQuota)
    getLeaveTypes()
  }, [])

  const getLeaveTypes = async () => {
    try {
      const result = await SettingsService.getLeaveTypesApi()

      setLeaves(result?.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleEdit = async (data: any) => {
    const { quota, renew, effectiveDate, start, end } = data

    const leavesQuota = data?.leavesQuota?.reduce((acc: any, curr: any) => {
      acc[curr?.leaveType?.name] = curr?.count
      return acc
    }, {})

    reset({
      quotaName: quota,
      renew: { label: renew, value: renew },
      effectiveDate: new Date(effectiveDate),
      leaveStart: { label: start, value: start },
      leaveEnd: { label: end, value: end },
      ...leavesQuota,
    })
  }

  const submitHandler = async (data: any) => {
    setBtnLoader(true)
    try {
      const staticKeys: any = {
        renew: true,
        effectiveDate: true,
        leaveStart: true,
        leaveEnd: true,
        quotaName: true,
      }

      const dynamic = []
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const el = data[key]

          if (!staticKeys[key] && el) {
            dynamic.push({
              count: el,
              leaveType: leavesNameMap[key.toLowerCase()],
            })
          }
        }
      }

      const obj = {
        ...(data?.quotaName && { name: data?.quotaName }),
        ...(data?.renew && { renew: data?.renew?.value }),
        ...(data?.effectiveDate && {
          effectiveDate: moment(data?.effectiveDate).format('YYYY-MM'),
        }),
        ...(data?.leaveStart && { leaveStart: data?.leaveStart?.value }),
        ...(data?.leaveEnd && { leaveEnd: data?.leaveEnd?.value }),
        leaves: dynamic,
      }
      !title
        ? await ApplicationService.addLeaveQuotaApi(obj)
        : await ApplicationService.editLeaveQuotaApi(
            selectedLeaveQuota?._id,
            obj
          )
      setRenderState((prev: any) => !prev)
      setBtnLoader(false)
      setOpenModal(false)
      createNotification('success', 'success', 'Application Submitted')
    } catch (err: any) {
      console.log('catch error ', err)
      if (err?.response?.status == 422) {
        console.log(err.response.data)
        createNotification('error', 'Error', err?.response?.data?.error?.leaves)
      }

      if (err?.response?.data?.error) {
        setErrors(err?.response?.data?.error, setError)
      } else {
        createNotification('error', 'Error', err?.response?.data?.msg)
      }
      setBtnLoader(false)
    }
  }

  return (
    <Modal
      open={openModal}
      text={btnText ? btnText : 'Add Quota'}
      title={title ? title : 'Add Leave Quota'}
      handleClose={() => setOpenModal(false)}
      type="submit"
      form="quotaForm"
      loader={btnLoader}
      btnClass={style.btnClass}
    >
      <form
        onSubmit={(e) => {
          clearErrors()
          handleSubmit(submitHandler)(e)
        }}
        id="quotaForm"
        className={style.gridView}
      >
        <TextField
          star={' *'}
          label="Quota Name"
          container={style.textAreaGrid}
          register={register}
          placeholder="Enter Quota Name"
          name="quotaName"
          errorMessage={errors?.name?.message}
        />
        <Selection
          star={' *'}
          label="Renew"
          placeholder="Select"
          options={month.map((item) => ({ label: item, value: item }))}
          name="renew"
          errorMessage={errors?.renew?.message}
          control={control}
          // defaultValue={defaultLeaveType}
        />
        <DatePicker
          star={' *'}
          label={'Effective Date'}
          control={control}
          name="effectiveDate"
          showTimeInput={true}
          errorMessage={errors?.effectiveDate?.message}
          placeholder={'Select Date'}
        />
        <Selection
          star={' *'}
          label="Leave Start"
          placeholder="Select"
          options={[
            'End Of Employee Probation',
            'Date Joining Of Employee',
          ].map((item) => ({ label: item, value: item }))}
          name="leaveStart"
          errorMessage={errors?.leaveStart?.message}
          control={control}
        />
        <Selection
          star={' *'}
          label="Leave End"
          placeholder="Select"
          options={['Last Working Day', 'Notice Period'].map((item) => ({
            label: item,
            value: item,
          }))}
          name="leaveEnd"
          errorMessage={errors?.leaveEnd?.message}
          control={control}
        />
        <div className={`${style.dottedBorder}   ${style.textAreaGrid}`}></div>

        {leaves?.leaveTypes?.map((item) => (
          <TextField
            type="number"
            register={register}
            key={item?.name}
            label={item?.name + ' Leave'}
            placeholder={`Enter ${item?.name} Leave`}
            onKeyDown={(e) => {
              if (e?.key === '-' || e?.key === '0') e?.preventDefault()
            }}
            name={item?.name}
          />
        ))}
      </form>
    </Modal>
  )
}

export default AddQuotaModal
