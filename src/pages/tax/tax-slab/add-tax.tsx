import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import moment from 'moment'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Modal from 'components/modal'
import TextField from 'components/textfield'
import Button from 'components/button'
import Table from 'components/table'
import MonthYearPicker from 'components/range-month-picker'
import Selection from 'components/selection'

import TaxService from 'services/tax-service'
import { addSlabColumns } from './tax-helper'
import { createNotification } from 'common/create-notification'

import editIcon from 'assets/table-edit.svg'
import deleteIcon from 'assets/table-delete.svg'
import style from '../tax.module.scss'

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  setViewModal: Dispatch<SetStateAction<boolean>>
  getTaxSlabsData: () => void
  updateId: string
  setSingleId?: Dispatch<SetStateAction<any>>
  newSlab?: string[]
  newSlabUpdate?: string[]
  viewModal?: boolean
  slabs: string[]
  setSlab: Dispatch<SetStateAction<any>>
}

const AddAttendance = ({
  viewModal,
  open,
  setOpen,
  getTaxSlabsData,
  updateId,
  setSingleId,
  newSlabUpdate,
  slabs,
  setSlab,
  setViewModal,
}: Props) => {
  const { register, handleSubmit, errors, reset, control, watch, setValue } =
    useForm({
      resolver: yupResolver(schema),
      mode: 'onSubmit',
    })

  const [loading, setLoading] = useState(false)
  const [update, setUpdate] = useState({ check: false, index: null })

  const onSubmit = async (data) => {
    const newData = {
      ...data,
      category: data?.category?.value,
    }
    if (update.check) {
      const newSlab = [...slabs]
      newSlab[update.index] = { ...newSlab[update.index], ...newData }
      setSlab(newSlab)
      setUpdate({ check: false, index: null })
    } else {
      const slabsCopy = [...slabs]
      slabsCopy.push(newData)
      setSlab(slabsCopy)
      const sortSlab = slabsCopy.sort(function (a, b) {
        return a.lower - b.lower
      })
      setSlab(sortSlab)
    }

    reset({
      ...data,
      category: data?.category,
      lower: '',
      upper: '',
      fixTax: '',
      taxRate: '',
      lessLimit: '',
    })
  }

  const handleEditSlab = (index: number) => {
    setUpdate({ check: true, index: index })
    const data = slabs?.find((slab, ind) => {
      return ind === index
    })
    !updateId
      ? reset({
          ...data,
          category: {
            label: data?.category,
            value: data?.category,
          },
        })
      : reset({
          ...data,
          taxGroupName: newSlabUpdate?.groupName,
          category: {
            label: newSlabUpdate.category,
            value: newSlabUpdate.category,
          },
          financialYearStart:
            newSlabUpdate?.financialYearStart &&
            new Date(newSlabUpdate?.financialYearStart),
          financialYearEnd:
            newSlabUpdate?.financialYearEnd &&
            new Date(newSlabUpdate?.financialYearEnd),
        })
  }

  const handleDeleteSlab = (index: string | number) => {
    slabs?.splice(index, 1)
    setSlab([...slabs])
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const data = {
        financialYearStart: moment(slabs[0].financialYearStart).format(
          'YYYY/MM'
        ),
        financialYearEnd: moment(slabs[0].financialYearEnd).format('YYYY/MM'),
        groupName: slabs[0]?.taxGroupName,
        category: slabs[0]?.category,
        slabs: slabs?.map((item) => {
          return {
            lower: item.lower,
            upper: item.upper,
            fixTax: item.fixTax,
            taxRate: item.taxRate,
            lessLimit: item.lessLimit,
          }
        }),
      }
      if (updateId) {
        const res = await TaxService.updateTaxSlab(updateId, data)
        if (res.status === 200) {
          setSingleId('')
          getTaxSlabsData()
          setOpen(false)
        }
        setSingleId('')
      } else {
        const res = await TaxService.AddTaxSlab(data)
        if (res.status === 200) {
          setOpen(false)
          getTaxSlabsData()
        }
      }
    } catch (err) {
      createNotification('error', 'Error', err?.response?.data?.msg)
      setLoading(false)
    }
    setLoading(false)
  }

  useEffect(() => {
    updateId &&
      reset({
        taxGroupName: newSlabUpdate?.groupName,
        category: {
          label: newSlabUpdate?.category,
          value: newSlabUpdate.category,
        },
        financialYearStart:
          newSlabUpdate?.financialYearStart &&
          new Date(newSlabUpdate?.financialYearStart),
        financialYearEnd:
          newSlabUpdate?.financialYearEnd &&
          new Date(newSlabUpdate?.financialYearEnd),
      })

    updateId && newSlabUpdate && setSlab([...newSlabUpdate?.slabs])
  }, [])

  const financialYearStart = watch('financialYearStart')
  const financialYearEnd = watch('financialYearEnd')
  useEffect(() => {
    if (financialYearStart) {
      setValue(
        'financialYearEnd',
        new Date(moment(financialYearStart).add(1, 'year').format()),
        {
          shouldValidate: true,
        }
      )
    }
  }, [financialYearEnd, financialYearStart])

  return (
    <>
      <Modal
        open={open}
        title={`${updateId ? 'Edit' : 'Add'} Tax Group`}
        className={style.modalWrapper}
        handleClose={() => {
          setOpen(false)
          setViewModal(false)
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.add}>
            <TextField
              name="taxGroupName"
              label="Tax Group Name"
              placeholder="Enter Tax Group Name"
              register={register}
              errorMessage={errors?.taxGroupName?.message}
            />
            <div className={style.twoGrid}>
              <Selection
                label="Category"
                name={'category'}
                errorMessage={errors?.category?.message}
                control={control}
                options={categories.map((item) => {
                  return { label: item?.name, value: item?.name }
                })}
              />
              {/* <option value="">Select</option>
                <>
                  {categories &&
                    categories?.map((ele: any) => (
                      <option key={ele.name} value={ele?.value}>
                        {ele.name}
                      </option>
                    ))}
                </>
              </Select> */}
              <div className={style.gridTwo}>
                <MonthYearPicker
                  control={control}
                  label={'Start Year'}
                  name={'financialYearStart'}
                  errorMessage={errors?.financialYearStart?.message}
                  watch={watch}
                  max={watch().financialYearEnd}
                />
                <MonthYearPicker
                  control={control}
                  label={'End Year'}
                  name={'financialYearEnd'}
                  errorMessage={errors?.financialYearEnd?.message}
                  min={watch().financialYearStart}
                  watch={watch}
                />
              </div>
            </div>
            <div className={style.fiveGrid}>
              <TextField
                name="lower"
                label="Lower"
                type="number"
                placeholder="Enter lower"
                register={register}
                errorMessage={errors?.lower?.message}
                container={style.inputContainer}
              />
              <TextField
                name="upper"
                label="Upper"
                type="number"
                placeholder="Enter upper"
                register={register}
                errorMessage={errors?.upper?.message}
                container={style.inputContainer}
              />
              <TextField
                name="fixTax"
                label="Fix Tax"
                type="number"
                placeholder="Enter fix tax"
                register={register}
                errorMessage={errors?.fixTax?.message}
                container={style.inputContainer}
              />
              <TextField
                name="taxRate"
                label="Tax Rate"
                placeholder="Enter tax rate"
                register={register}
                container={style.inputContainer}
                errorMessage={errors?.taxRate?.message}
              />
              <TextField
                name="lessLimit"
                label="Less Limit"
                type="number"
                placeholder="Enter less limit"
                register={register}
                errorMessage={errors?.lessLimit?.message}
                container={style.inputContainer}
              />
            </div>
          </div>

          <div className={style.webBtnDiv}>
            {!viewModal && (
              <Button text={'Add Slab'} btnClass={style.btn} type="submit" />
            )}
          </div>
        </form>
        <div style={{ padding: '0 10px' }}>
          <Table
            columns={addSlabColumns}
            rows={
              slabs &&
              slabs.map((item, index) => {
                return {
                  ...item,
                  sr: index + 1,
                  taxRate: `${item.taxRate} %`,
                  Actions: (
                    <>
                      {!viewModal ? (
                        <div style={{ display: 'flex' }}>
                          <div style={{ marginRight: '10px' }}>
                            <img
                              src={editIcon}
                              width={30}
                              onClick={() => handleEditSlab(index)}
                            />
                          </div>
                          <div style={{ marginRight: '10px' }}>
                            <img
                              src={deleteIcon}
                              width={30}
                              onClick={() => handleDeleteSlab(index)}
                            />
                          </div>
                        </div>
                      ) : (
                        'view mode'
                      )}
                    </>
                  ),
                }
              })
            }
            minWidth="250px"
            tableHeight={style.taxSlabTableHeight}
            handleEdit={() => {
              setOpen(true)
            }}
          />
        </div>
        <div className={style.webBtnDiv}>
          {!viewModal && (
            <Button
              text={'Save'}
              btnClass={style.btn}
              type="button"
              isLoading={loading}
              handleClick={handleSave}
              disabled={slabs?.length <= 0}
            />
          )}
        </div>
      </Modal>
    </>
  )
}

export default AddAttendance

const schema = yup.object().shape({
  taxGroupName: yup.string().required('Tax group name is required'),
  financialYearStart: yup.date().typeError('Financial start year is required'),
  financialYearEnd: yup.date().typeError('Financial end year is required'),
  category: yup.object().required('Category  is required'),
  fixTax: yup.number().typeError('Fix Tax is required').min(0, 'Invalid value'),
  lower: yup.number().typeError('Lower is required').min(0, 'Invalid value'),
  upper: yup.number().typeError('Upper is required').min(0, 'Invalid value'),
  taxRate: yup
    .number()
    .typeError('Tax Rate is required')
    .max(100, 'Should be less or equal to 100')
    .min(0, 'Invalid value')
    .test(
      'maxDigitsAfterDecimal',
      'Must have 2 digits after decimal or less',
      (number) => /^\d+(\.\d{1,2})?$/.test(number)
    ),
  lessLimit: yup
    .number()
    .typeError('Less Limit is required')
    .min(0, 'Invalid value'),
})

const categories = [
  { name: 'Local', value: 'Local' },
  { name: 'Expat', value: 'Expat' },
  { name: 'Single Filers', value: 'Single Filers' },
  {
    name: 'Married Individuals filing joint returns',
    value: 'Married Individuals filing joint returns',
  },
  { name: 'For Heads of House Hold', value: 'For Heads of House Hold' },
]
