import { useState, useEffect } from 'react'
import AddTaxSlab from './add-tax'
import { columns } from './tax-helper'
import TaxService from 'services/tax-service'
import style from '../tax.module.scss'

import editIcon from 'assets/table-edit.svg'
import view from 'assets/viewIconnew.svg'
import deleteIcon from 'assets/table-delete.svg'
import Table from 'components/table'
import Switch from 'components/switch'
import { useForm } from 'react-hook-form'
import Container from 'components/container'
import DeleteModal from 'components/delete-modal'

const TaxSlab = ({
  setIsLoading,
  open,
  setOpen,
  singleId,
  setSingleId,
  slabs,
  setSlab,
}: any) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [taxSlabsData, setTaxSlabsData] = useState<any[]>([])
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [viewModal, setViewModal] = useState(false)
  const [newSlab, setNewSlab] = useState()

  const { control } = useForm()

  const deleteTaxSlab = async (id: string) => {
    setDeleteLoading(true)
    const res = await TaxService.deleteTaxSlab(id)
    if (res.status === 200) {
      setDeleteModalOpen(false)
      setDeleteLoading(false)
      getTaxSlabsData()
    }
    setDeleteLoading(false)
  }

  const getTaxSlabsData = async () => {
    setIsLoading(true)
    const res = await TaxService.getAllTaxSlabsData()

    if (res.status === 200) {
      setTaxSlabsData(res?.data?.data)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getTaxSlabsData()
  }, [])

  const handleEdit = async (id) => {
    setSingleId(id)
    const res = await TaxService.getTaxSlabById(id)
    setNewSlab(res?.data?.tax)

    setOpen(true)
  }

  const handleSwitch = async (id, item) => {
    const res = await TaxService.switchTaxSlab(id, item)
    if (res.status === 200) {
      getTaxSlabsData()
    }
  }

  return (
    <>
      <Container container={style.innerContainer}>
        <div>
          <Table
            minWidth={'1500px'}
            columns={columns}
            rows={
              taxSlabsData &&
              taxSlabsData?.map((item): any => {
                return {
                  ...item,
                  Status: (
                    <div>
                      <Switch
                        control={control}
                        title={item.Status === true ? 'Active' : 'InActive'}
                        checked={item?.Status}
                        name={item._id}
                        handleClick={() => handleSwitch(item?._id, item)}
                      />
                    </div>
                  ),
                  taxActions: (
                    <div style={{ display: 'flex' }}>
                      <div style={{ marginRight: '10px' }}>
                        <img
                          src={view}
                          width={30}
                          onClick={() => {
                            setOpen(true)
                            handleEdit(item?._id)
                            setSingleId(item?._id)
                            setViewModal(true)
                          }}
                        />
                      </div>
                      <div style={{ marginRight: '10px' }}>
                        <img
                          src={deleteIcon}
                          width={30}
                          onClick={() => {
                            setDeleteModalOpen(true)
                            setSingleId(item?._id)
                          }}
                        />
                      </div>
                      <div style={{ marginRight: '10px' }}>
                        <img
                          src={editIcon}
                          width={30}
                          onClick={() => handleEdit(item?._id)}
                        />
                      </div>
                    </div>
                  ),
                }
              })
            }
          />
        </div>
      </Container>

      {open && (
        <AddTaxSlab
          open={open}
          setOpen={setOpen}
          getTaxSlabsData={getTaxSlabsData}
          updateId={singleId}
          setSingleId={setSingleId}
          newSlabUpdate={newSlab}
          viewModal={viewModal}
          setViewModal={setViewModal}
          slabs={slabs}
          setSlab={setSlab}
        />
      )}

      <DeleteModal
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        handleDelete={() => deleteTaxSlab(singleId)}
        btnLoader={deleteLoading}
      ></DeleteModal>
    </>
  )
}

export default TaxSlab
