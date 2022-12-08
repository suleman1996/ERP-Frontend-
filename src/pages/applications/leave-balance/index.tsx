import { useState, useEffect } from 'react'

import Table from 'components/table'
import DeleteModal from 'components/delete-modal'

import AddLeaveType from '../add-leave-type'
import { columns } from './helper'
import LeaveService from 'services/leave'
import { createNotification } from 'common/create-notification'

const LeaveBalance = () => {
  const [editIndex, setEditIndex] = useState(-1)

  const [btnLoader, setBtnLoader] = useState(false)
  const [openViewTypeModal, setOpenViewTypeModal] = useState(false)
  const [openDelModal, setOpenDelModal] = useState(false)
  const [aLLLeave, setAllLeave] = useState<any>([])
  const [leaveId, setLeaveId] = useState<any>()
  const [close, setClose] = useState(false)

  useEffect(() => {
    getAllLeaveType()
  }, [])

  const getAllLeaveType = async () => {
    const res = await LeaveService.getAllLeaves()
    setAllLeave(res?.data?.leaveTypes)
  }

  const handleDeleteLeave = async () => {
    setBtnLoader(true)
    try {
      const res = await LeaveService.deleteLeave(leaveId)
      if (res?.status === 200) {
        createNotification('success', 'success', res?.data?.msg)
        getAllLeaveType()
        setOpenDelModal(!openDelModal)
      }
      setBtnLoader(false)
    } catch (err: any) {
      setBtnLoader(false)
    }
  }

  return (
    <div>
      <Table
        columns={columns}
        rows={aLLLeave.map((row: any) => ({
          ...row,
          name: <span>{row?.name}</span>,
          paid: <span>{row?.paid === true ? 'true' : 'false'}</span>,
          balance: <span>{row?.balance === true ? 'true' : 'false'}</span>,
          encashment: (
            <span>{row?.encashment === true ? 'true' : 'false'}</span>
          ),
          carryForward: (
            <span>{row?.carryForward === true ? 'true' : 'false'}</span>
          ),
          maxCarryForward: (
            <span>{row?.maxCarryForward ? row?.maxCarryForward : '-'}</span>
          ),
        }))}
        minWidth="1150px"
        handleEdit={(_, index) => {
          setOpenViewTypeModal(true)
          setEditIndex(index)
          setClose(false)
        }}
        handleView={(_id, index) => {
          setOpenViewTypeModal(true), setEditIndex(index), setClose(true)
        }}
        handleDelete={(id) => {
          setLeaveId(id), setOpenDelModal(true)
        }}
      />
      <AddLeaveType
        leaveData={editIndex >= 0 ? aLLLeave[editIndex] : null}
        setOpenAddTypeModal={setOpenViewTypeModal}
        openAddTypeModal={openViewTypeModal}
        title="Leave Type"
        getAllLeaveType={getAllLeaveType}
        close={close}
      />
      <DeleteModal
        open={openDelModal}
        setOpen={setOpenDelModal}
        handleDelete={() => handleDeleteLeave()}
        isLoading={btnLoader}
      />
    </div>
  )
}

export default LeaveBalance
