import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import Modal from 'components/modal'
import ProfileUpload from 'components/profile-upload'
import TextField from 'components/textfield'

import EmployeeService from 'services/employee-service'
import { removeKeys, setErrors } from '../../../../helper/index'

import tick from 'assets/tick.svg'
import style from './document.module.scss'
import { useParams } from 'react-router'
import { convertBase64Image } from 'main-helper'

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  docId?: any
  setDocId?: any
  getAllDocuments?: () => void
}

const AddDocument = ({ open, setOpen, docId, getAllDocuments }: Props) => {
  const { id } = useParams()
  const { register, handleSubmit, errors, reset, setError, clearErrors } =
    useForm()
  const [selectedFileName, setSelectedFileName] = useState('')
  const [loader, setLoader] = useState(false)

  const onSubmit = async (data: any) => {
    setLoader(true)
    try {
      const userDoc = {
        ...data,
        employeeId: id,
        ...(data.file.length > 0 && {
          file: selectedFileName && (await convertBase64Image(data.file[0])),
        }),
      }
      data.file.length <= 0 && removeKeys(userDoc, ['file'])
      if (docId) {
        const res = await EmployeeService.updateDocument(userDoc, docId)
        if (res.status === 200) {
          setOpen(false)
          getAllDocuments && getAllDocuments()
        }
      } else {
        const res = await EmployeeService.addDocument(userDoc)
        if (res.status === 200) {
          setOpen(false)
          getAllDocuments && getAllDocuments()
        }
      }
    } catch (err) {
      console.error(err)
      if (err?.response?.data?.error) {
        setErrors(err?.response?.data?.error, setError)
      }
      setLoader(false)
    }
    setLoader(false)
  }

  const getDocById = async () => {
    const res = await EmployeeService.getByIdDocument(docId)
    reset({
      documentName: res?.data?.name,
      category: res?.data?.category,
    })
    setSelectedFileName(res?.data?.fileFor)
  }

  useEffect(() => {
    docId && getDocById()
  }, [docId])

  return (
    <>
      <Modal
        open={open}
        title={`${docId ? 'Edit' : 'Add'} Document`}
        handleClose={() => setOpen(false)}
        text="Done"
        loader={loader}
        type="submit"
        iconEnd={tick}
        form="addDoc"
      >
        <form
          id="addDoc"
          onSubmit={(e) => {
            clearErrors()
            handleSubmit(onSubmit)(e)
          }}
        >
          <div className={style.grid}>
            <TextField
              name="documentName"
              label="Name"
              star=" *"
              type="text"
              register={register}
              errorMessage={errors?.documentName?.message}
              placeholder="Name"
            />
            <div>
              <label
                className={style.label}
                style={{ color: errors?.documentName && 'black' }}
              >
                Document <b style={{ color: 'red' }}>*</b>
              </label>
              <ProfileUpload
                name={'file'}
                register={register}
                id={'frontPic'}
                errorMessage={errors?.file?.message}
                selectedFileName={selectedFileName}
                setSelectedFileName={setSelectedFileName}
              />
            </div>
            <TextField
              name="category"
              label="Category"
              type="text"
              star=" *"
              register={register}
              errorMessage={errors?.category?.message}
              placeholder="Category"
            />
          </div>
        </form>
      </Modal>
    </>
  )
}

export default AddDocument
