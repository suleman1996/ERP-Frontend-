import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'

import AddTaxSlab from './add-tax'
import Table from 'components/table'
import Switch from 'components/switch'
import Container from 'components/container'
import DeleteModal from 'components/delete-modal'

import { columns } from './tax-helper'
import TaxService from 'services/tax-service'

import deleteIcon from 'assets/table-delete.svg'
import view from 'assets/viewIconnew.svg'
import editIcon from 'assets/table-edit.svg'
import style from '../tax.module.scss'

interface Item {
  FinancialYear: string
  Status: boolean
  TaxCategory: string
  TaxGroupName: string
  _id: string
}

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
  const [taxSlabsData, setTaxSlabsData] = useState([])
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [viewModal, setViewModal] = useState(false)
  const [newSlab, setNewSlab] = useState()

  const { control } = useForm()

  useEffect(() => {
    getTaxSlabsData()
  }, [])

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

  const handleEdit = async (id: string) => {
    setSingleId(id)
    const res = await TaxService.getTaxSlabById(id)
    setNewSlab(res?.data?.tax)

    setOpen(true)
  }

  const handleSwitch = async (id: string, item: Item) => {
    const res = await TaxService.switchTaxSlab(id, item)
    if (res.status === 200) {
      getTaxSlabsData()
    }
  }

  const handleClick = (item) => {
    setOpen(true)
    handleEdit(item?._id)
    setSingleId(item?._id)
    setViewModal(true)
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
                        className={style.switchClass}
                        title={item.Status === true ? 'Active' : 'In Active'}
                        checked={item?.Status}
                        name={item._id}
                        handleSwitchChange={() => {
                          handleSwitch(item?._id, item)
                        }}
                      />
                    </div>
                  ),
                  taxActions: (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <div style={{ marginRight: '10px' }}>
                        <img
                          src={view}
                          width={30}
                          onClick={(item) => handleClick(item)}
                        />
                      </div>

                      <div style={{ marginRight: '10px' }}>
                        <img
                          src={editIcon}
                          width={30}
                          onClick={() => handleEdit(item?._id)}
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
        isLoading={deleteLoading}
      ></DeleteModal>
    </>
  )
}

export default TaxSlab
