import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { addSlabColumns } from './tax-helper'
import Modal from 'components/modal'

import style from '../tax.module.scss'
import TaxService from 'services/tax-service'
import Select from 'components/select'
import TextField from 'components/textfield'
import Button from 'components/button'
import Table from 'components/table'

import editIcon from 'assets/table-edit.svg'
import deleteIcon from 'assets/table-delete.svg'
import { createNotification } from 'common/create-notification'
import MonthYearPicker from 'components/range-month-picker'
import moment from 'moment'

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  setViewModal: Dispatch<SetStateAction<boolean>>
  getTaxSlabsData: () => void
  updateId: string
  setSingleId?: Dispatch<SetStateAction<any>>
  newSlab?: any
  newSlabUpdate?: any
  viewModal?: boolean
  slabs: any
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
  const [loading, setLoading] = useState(false)
  const [update, setUpdate] = useState<any>({ check: false, index: null })

  const { register, handleSubmit, errors, reset, control, watch, setValue } =
    useForm({
      resolver: yupResolver(schema),
      mode: 'onSubmit',
    })

  const onSubmit = async (data: any) => {
    if (update.check) {
      const newSlab = [...slabs]
      newSlab[update.index] = { ...newSlab[update.index], ...data }
      setSlab(newSlab)
      setUpdate({ check: false, index: null })
    } else {
      const slabsCopy = [...slabs]
      slabsCopy.push(data)
      setSlab(slabsCopy)

      const sortSlab = slabsCopy.sort(function (a: any, b: any) {
        return a.lower - b.lower
      })

      setSlab(sortSlab)
    }

    reset({
      ...data,
      lower: '',
      upper: '',
      fixTax: '',
      taxRate: '',
      lessLimit: '',
    })
  }

  const handleEditSlab = (index: number) => {
    setUpdate({ check: true, index: index })
    const data = slabs?.find((slab: any, ind: number) => {
      return ind === index
    })

    !updateId
      ? reset({ ...data })
      : reset({
          ...data,
          taxGroupName: newSlabUpdate?.groupName,
          category: newSlabUpdate?.category,
          financialYearStart:
            newSlabUpdate?.financialYearStart &&
            new Date(newSlabUpdate?.financialYearStart),
          financialYearEnd:
            newSlabUpdate?.financialYearEnd &&
            new Date(newSlabUpdate?.financialYearEnd),
        })
  }

  const handleDeleteSlab = (index: any) => {
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
        slabs: slabs?.map((item: any) => {
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
        category: newSlabUpdate?.category,
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
    if (financialYearStart && !financialYearEnd) {
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
              <Select
                label="Category"
                name={'category'}
                errorMessage={errors?.category?.message}
                register={register}
              >
                <option value="">Select</option>
                <>
                  {categories &&
                    categories?.map((ele: any) => (
                      <option key={ele.name} value={ele?.value}>
                        {ele.name}
                      </option>
                    ))}
                </>
              </Select>
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
                  errorMessage={errors?.financialYearStart?.message}
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

          {/* <div className={style.mobileBtnDiv}>
            <MobileButton
              mobileIcon={tickIcon}
              btnClass={style.mobileBtn}
              type="submit"
              isLoading={loading}
            />
          </div> */}
        </form>

        <div style={{ padding: '0 10px' }}>
          <Table
            columns={addSlabColumns}
            rows={
              slabs &&
              slabs.map((item: any, index: number) => {
                return {
                  ...item,
                  sr: index + 1,
                  taxRate: `${item.taxRate} %`,
                  Actions: (
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
  financialYearStart: yup.date().typeError('Financial year is required'),
  financialYearEnd: yup.date().typeError('Financial year is required'),
  category: yup.string().required('Category  is required'),
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
