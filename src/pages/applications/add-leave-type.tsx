import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'

import Modal from 'components/modal'
import TextField from 'components/textfield'
import Selection from 'components/selection'

import { paidOptions } from './helper'
import LeaveService from 'services/leave'
import { createNotification } from 'common/create-notification'
import { setErrors } from 'helper'

import style from './applications.module.scss'

interface Props {
  openAddTypeModal: boolean
  setOpenAddTypeModal: Dispatch<SetStateAction<boolean>>
  text?: string
  title: string
}

const AddLeaveType = ({
  openAddTypeModal,
  setOpenAddTypeModal,
  text,
  title,
}: Props) => {
  const [btnLoader, setBtnLoader] = useState(false)

  const { register, control, handleSubmit, errors, setError, clearErrors } =
    useForm({ mode: 'all' })

  const onSubmit = async (data: any) => {
    setBtnLoader(true)
    try {
      const transformData = {
        name: data?.name,
        paid: data?.paid?.value,
        balance: data?.balance?.value,
        encashment: data?.encashment?.value,
        carryForward: data?.carryForward?.value,
        maxCarryForward: data?.maxCarryForward,
      }
      const response = await LeaveService.AddLeave(transformData)
      if (response?.status === 200) {
        createNotification('success', 'success', response?.data?.msg)
        setOpenAddTypeModal(!openAddTypeModal)
      }
      setBtnLoader(false)
    } catch (err: any) {
      setBtnLoader(false)
      if (err?.response?.data?.error) {
        setErrors(err?.response?.data?.error, setError)
      }
      if (err?.response?.data?.msg) {
        setErrors(err?.response?.data?.msg, setError)
        createNotification('error', 'Error', err?.response?.data?.msg)
      }
    }
  }

  return (
    <div>
      <Modal
        open={openAddTypeModal}
        handleClose={() => setOpenAddTypeModal(false)}
        className={style.wrapperModal}
        title={title}
        text={text}
        type="submit"
        form="id"
        loader={btnLoader}
      >
        <form
          onSubmit={(e) => {
            clearErrors()
            handleSubmit(onSubmit)(e)
          }}
          id="id"
        >
          <div className={style.grid}>
            <TextField
              label="Name"
              placeholder="Enter Leave Name"
              name="name"
              register={register}
              errorMessage={errors?.name?.message}
            />
            <Selection
              label="Paid"
              options={paidOptions}
              placeholder="Select"
              control={control}
              name="paid"
              errorMessage={errors?.paid?.message}
            />
            <Selection
              label="Balance"
              options={paidOptions}
              placeholder="Select"
              control={control}
              name="balance"
              errorMessage={errors?.balance?.message}
            />
            <Selection
              label="Encashment"
              options={paidOptions}
              placeholder="Select"
              control={control}
              name="encashment"
              errorMessage={errors?.encashment?.message}
            />
            <Selection
              label="Carry Forward"
              options={paidOptions}
              placeholder="Select"
              control={control}
              name="carryForward"
              errorMessage={errors?.carryForward?.message}
            />
            <TextField
              label="Max Carry Forward"
              placeholder="Enter Max Carry Forward"
              name="maxCarryForward"
              register={register}
              errorMessage={errors?.maxCarryForward?.message}
            />
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AddLeaveType
