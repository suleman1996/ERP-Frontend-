import { Dispatch, SetStateAction, useState, useEffect } from 'react'
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
  leaveData: any
  viewLeaveData: any
  getAllLeaveType: () => void
  close?: any
}

const AddLeaveType = ({
  openAddTypeModal,
  setOpenAddTypeModal,
  title,
  leaveData,
  getAllLeaveType,
  close,
}: Props) => {
  const [btnLoader, setBtnLoader] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    errors,
    setError,
    clearErrors,
    reset,
  } = useForm({ mode: 'all' })

  useEffect(() => {
    updateLeave()
  }, [leaveData])

  const updateLeave = () => {
    const { name, paid, balance, encashment, carryForward, maxCarryForward } =
      leaveData || {}
    reset({
      name: name ? name : '',
      paid:
        paid === undefined
          ? ''
          : { label: paid ? 'Yes' : 'No', value: `${paid}` },
      balance:
        balance === undefined
          ? ''
          : { label: balance ? 'Yes' : 'No', value: `${balance}` },
      encashment:
        encashment === undefined
          ? ''
          : { label: encashment ? 'Yes' : 'No', value: `${encashment}` },
      carryForward:
        carryForward === undefined
          ? ''
          : { label: carryForward ? 'Yes' : 'No', value: `${carryForward}` },
      maxCarryForward: maxCarryForward ? maxCarryForward : '',
    })
  }

  const onSubmit = async (data: any) => {
    setBtnLoader(true)
    try {
      const transformData = {
        name: data?.name,
        paid: data?.paid?.value,
        balance: data?.balance?.value,
        encashment: data?.encashment?.value,
        maxCarryForward: data?.maxCarryForward,
        carryForward: data?.carryForward?.value,
      }
      if (leaveData) {
        if (transformData.carryForward === 'true') {
          const res = await LeaveService.updateLeave(
            leaveData?._id,
            transformData
          )
          if (res?.status === 200) {
            createNotification('success', 'success', res?.data?.msg)
            getAllLeaveType()
            setOpenAddTypeModal(!openAddTypeModal)
          }
          setBtnLoader(false)
        } else {
          delete transformData?.maxCarryForward
          const res = await LeaveService.updateLeave(
            leaveData?._id,
            transformData
          )
          if (res?.status === 200) {
            createNotification('success', 'success', res?.data?.msg)
            getAllLeaveType()
            setOpenAddTypeModal(!openAddTypeModal)
          }
          setBtnLoader(false)
        }
      } else {
        if (transformData.carryForward === 'true') {
          const response = await LeaveService.AddLeave(transformData)
          if (response?.status === 200) {
            createNotification('success', 'success', response?.data?.msg)
            setOpenAddTypeModal(false)
          }
          setBtnLoader(false)
        } else {
          delete transformData?.maxCarryForward
          const response = await LeaveService.AddLeave(transformData)
          if (response?.status === 200) {
            createNotification('success', 'success', response?.data?.msg)
            setOpenAddTypeModal(false)
          }
        }
        setBtnLoader(false)
      }
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
        text={close ? null : leaveData ? 'Save Changes' : 'Add'}
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
              star="*"
              isDisable={close && true}
            />
            <Selection
              label="Paid"
              options={paidOptions}
              placeholder="Select"
              control={control}
              name="paid"
              errorMessage={errors?.paid?.message}
              star="*"
              isDisabled={close && true}
            />
            <Selection
              label="Balance"
              options={paidOptions}
              placeholder="Select"
              control={control}
              name="balance"
              errorMessage={errors?.balance?.message}
              star="*"
              isDisabled={close && true}
            />
            <Selection
              label="Encashment"
              options={paidOptions}
              placeholder="Select"
              control={control}
              name="encashment"
              errorMessage={errors?.encashment?.message}
              star="*"
              isDisabled={close && true}
            />
            <Selection
              label="Carry Forward"
              options={paidOptions}
              placeholder="Select"
              control={control}
              name="carryForward"
              errorMessage={errors?.carryForward?.message}
              star="*"
              isDisabled={close && true}
            />
            <TextField
              label="Max Carry Forward"
              placeholder="Enter Max Carry Forward"
              name="maxCarryForward"
              register={register}
              errorMessage={errors?.maxCarryForward?.message}
              isDisable={close && true}
            />
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AddLeaveType
