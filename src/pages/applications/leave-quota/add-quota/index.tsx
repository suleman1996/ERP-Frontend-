import Modal from 'components/modal'
import Selection from 'components/selection'
import DatePicker from 'components/date-picker'
import { useForm } from 'react-hook-form'
import style from './add-quota.module.scss'
import { useState } from 'react'

import { setErrors } from 'helper'
import { createNotification } from 'common/create-notification'
import TextField from 'components/textfield'

const AddQuotaModal = ({
  openModal,
  setOpenModal,
}: // setRender,
{
  openModal: boolean
  setOpenModal?: any
  defaultLeaveType?: any
  setRender?: any
  editData?: any
}) => {
  const [btnLoader, setBtnLoader] = useState(false)

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
    'Date of Joining',
  ]
  const leaves = {
    count: 3,
    leaveTypes: [
      {
        _id: '63860ae673c78fa065b50564',
        name: 'Annual',
        paid: true,
        balance: true,
        encashment: true,
        carryForward: true,
        maxCarryForward: 10,
        createdAt: '2022-11-29T13:36:38.758Z',
        updatedAt: '2022-11-29T13:36:38.758Z',
        __v: 0,
      },
      {
        _id: '63860aea73c78fa065b50567',
        name: 'Sick',
        paid: true,
        balance: true,
        encashment: true,
        carryForward: true,
        createdAt: '2022-11-29T13:36:42.640Z',
        updatedAt: '2022-12-01T10:12:59.945Z',
        __v: 0,
        maxCarryForward: 12,
      },
      {
        _id: '63860fff62bbfa5c662b5100',
        name: 'Causal',
        paid: true,
        balance: true,
        encashment: true,
        carryForward: false,
        createdAt: '2022-11-29T13:58:23.263Z',
        updatedAt: '2022-11-29T13:58:23.263Z',
        __v: 0,
      },
    ],
  }

  const leavesNameMap: any = leaves?.leaveTypes?.reduce((acc: any, curr) => {
    acc[curr?.name?.toLowerCase()] = curr?._id
    return acc
  }, {})

  const { control, register, errors, setError, clearErrors, handleSubmit } =
    useForm({
      mode: 'all',
    })

  const submitHandler = async (data: any) => {
    setBtnLoader(true)
    try {
      console.log('checking data ', data)

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
        ...(data?.renew && { renew: data?.renew }),
        ...(data?.effectiveDate && { effectiveDate: data?.effectiveDate }),
        ...(data?.leaveStart && { leaveStart: data?.leaveStart }),
        ...(data?.leaveEnd && { leaveEnd: data?.leaveEnd }),
        leaves: dynamic,
      }

      console.log('data quota ', obj)

      setBtnLoader(false)
      // setOpenModal(false)
      // createNotification('success', 'success', 'Application Submitted')
      // setRender((prev: any) => !prev)
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
      title={'Add Leave Quota'}
      handleClose={() => setOpenModal(false)}
      type="submit"
      form="quotaForm"
      btnClass={style.btnClass}
      className={style.modelContainer}
      loader={btnLoader}
      customHeader={style.customHeader}
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
          label="Quota Name"
          container={style.textAreaGrid}
          register={register}
          // classNameLabel={style.classNameLabel}
          placeholder="Enter Quota Name"
          name="quotaName"
          errorMessage={errors?.name?.message}
          // control={control}
        />
        <Selection
          classNameLabel={style.classNameLabel + style.textAreaGrid}
          label="Renew"
          placeholder="Select"
          options={month.map((item) => ({ label: item, value: item }))}
          name="renew"
          errorMessage={errors?.renew?.message}
          control={control}
          placeHolderStyle={{ color: '#2D2D32', fontSize: '16px' }}
        />
        <DatePicker
          label={'Effective Date'}
          control={control}
          name="effectiveDate"
          showTimeInput={true}
          errorMessage={errors?.effectiveDate?.message}
          placeholder={'Select Date'}
        />
        <Selection
          classNameLabel={style.classNameLabel}
          wraperSelect={style.wraperSelect}
          label="Leave Start"
          placeholder="Select"
          options={[
            'End of employee probation',
            'Date Joining of Employee',
          ].map((item) => ({ label: item, value: item }))}
          name="leaveStart"
          errorMessage={errors?.leaveStart?.message}
          control={control}
        />
        <Selection
          classNameLabel={style.classNameLabel}
          wraperSelect={style.wraperSelect}
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
            register={register}
            key={item?.name}
            label={item?.name + ' Leave'}
            placeholder={`Enter ${item?.name} Leave`}
            name={item?.name}
            errorMessage={errors?.leaveType?.message}
          />
        ))}
      </form>
    </Modal>
  )
}

export default AddQuotaModal
