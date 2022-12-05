import { useState } from 'react'

import Table from 'components/table'
import DeleteModal from 'components/delete-modal'
import AddLeaveType from '../add-leave-type'

import { rows, columns } from './helper'

const LeaveBalance = () => {
  const [openEditTypeModal, setOpenEditTypeModal] = useState(false)
  const [openViewTypeModal, setOpenViewTypeModal] = useState(false)
  const [openDelModal, setOpenDelModal] = useState(false)

  return (
    <div>
      {' '}
      <Table
        columns={columns}
        rows={rows}
        minWidth="1150px"
        handleEdit={() => setOpenEditTypeModal(true)}
        handleView={() => setOpenViewTypeModal(true)}
        handleDelete={() => setOpenDelModal(true)}
      />
      <AddLeaveType
        setOpenAddTypeModal={setOpenEditTypeModal}
        openAddTypeModal={openEditTypeModal}
        title="Edit Leave Type"
        text="Save Changes"
      />
      <AddLeaveType
        setOpenAddTypeModal={setOpenViewTypeModal}
        openAddTypeModal={openViewTypeModal}
        title="Leave Type"
      />
      <DeleteModal open={openDelModal} setOpen={setOpenDelModal} />
    </div>
  )
}

export default LeaveBalance
