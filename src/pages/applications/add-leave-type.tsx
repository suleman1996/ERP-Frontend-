import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'

import Modal from 'components/modal'
import TextField from 'components/textfield'
import Selection from 'components/selection'

import { paidOptions } from './helper'

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
  const { register, control } = useForm()

  return (
    <div>
      {' '}
      <Modal
        open={openAddTypeModal}
        handleClose={() => setOpenAddTypeModal(false)}
        className={style.wrapperModal}
        title={title}
        text={text}
      >
        <form>
          <div className={style.grid}>
            <TextField
              label="Name"
              placeholder="Enter Leave Name"
              name="enterLeaveName"
              register={register}
            />
            <Selection
              label="Paid"
              options={paidOptions}
              placeholder="Select"
              control={control}
              name="paid"
            />
            <Selection
              label="Balance"
              options={paidOptions}
              placeholder="Select"
              control={control}
              name="balance"
            />
            <Selection
              label="Encashment"
              options={paidOptions}
              placeholder="Select"
              control={control}
              name="encashment"
            />
            <Selection
              label="Carry Forward"
              options={paidOptions}
              placeholder="Select"
              control={control}
              name="carryForward"
            />
            <TextField
              label="Max Carry Forward"
              placeholder="Select"
              register={register}
              name="maxCarryForward"
            />
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AddLeaveType
