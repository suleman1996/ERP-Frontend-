import React, { useState } from 'react'

import TextField from 'components/textfield'
import { useForm } from 'react-hook-form'
import moment from 'moment'

import DeletePopup from 'components/delete-modal'
import DatePicker from 'components/date-picker'
import Loading from 'components/loading'
import editIcon from 'assets/edit-icon.svg'

import Modal from 'components/modal'
import TextArea from 'components/textarea'
import ProfileUpload from 'components/profile-upload'
import Selection from 'components/selection'
import PdfViewModal from 'components/pdf-viewer'
import { sampleBase64pdf } from './pdfSample'
import PolicyService from 'services/policy-service'
import { setErrors } from 'helper'
import { createNotification } from 'common/create-notification'
import EmployeeService from 'services/employee-service'
import RenderAllPolicies from './render-all-policy'
import RenderObsolete from './render-obselete-policy'
import { convertBase64Image } from 'main-helper'
import SettingsService from 'services/settings-service'

import style from './request.module.scss'

const Policy = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  const [showFilterView, setShowFilterView] = useState(false)
  const [editPoplicy, setEditPolicy] = useState({ bool: false, label: '' })

  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [openAddPolice, setOpenAddPolice] = useState(false)
  const [openPolicyPdfView, setOpenViewPdfPolicy] = useState(false)
  const [render, setRender] = useState(false)
  const [selectedPolicy, setSelectedPolicy] = useState({ _id: '' })

  const [employees, setEmployees] = React.useState<any>([])
  const [policyCategory, setPolicyCategory] = React.useState<any>([])
  const [employeesWithDep] = React.useState<any>([])

  const [selectedFileName, setSelectedFileName] = React.useState<any>('')
  const [renderObselete, setRenderObselete] = useState<any>(false)
  const [loading, setLoading] = useState<any>(false)

  const {
    control,
    register,
    errors,
    setError,
    clearErrors,
    handleSubmit,
    reset,
  } = useForm({
    mode: 'all',
  })

  React.useEffect(() => {
    getAllEmployees()
    getEmployeesWithDep()
    getPolicyCategory()
  }, [])

  const getAllEmployees = async () => {
    try {
      const result = await EmployeeService.getOnlyEmployees()

      setEmployees(
        result?.data?.map((item: any) => ({
          value: item?._id,
          label: item?.fullName,
        }))
      )
    } catch (error) {
      console.error(error)
    }
  }

  const getEmployeesWithDep = async () => {
    try {
      const result = await EmployeeService.getEmployeesWithDepApi()

      result?.data?.employeesWithDepartment?.map((item: any) => {
        employeesWithDep.push({
          options: item?.employees?.map((ite: any) => ({
            value: ite?._id,
            label: ite?.fullName,
          })),
          label: item?._id?.name,
        })
      })
    } catch (error) {
      console.error(error)
    }
  }

  const getPolicyCategory = async () => {
    try {
      const result = await SettingsService.getPolicyCat()

      setPolicyCategory(
        result?.data?.policyCategory?.map((item: any) => ({
          value: item?._id,
          label: item?.name,
        }))
      )
    } catch (error) {
      console.error(error)
    }
  }

  const handleAddPolicy = async (data: any) => {
    try {
      setIsLoading(true)
      const pdffile = await convertBase64Image(data?.pdf[0])
      const policyData = {
        ...(data?.name && { name: data?.name }),
        ...(data?.policyNumber && { policyNumber: data?.policyNumber }),
        ...(data?.version && { version: Number(data?.version) }),
        ...(data?.categoryId?.value && { categoryId: data?.categoryId?.value }),
        ...(data?.effectiveDate && {
          effectiveDate: moment(new Date(data?.effectiveDate)).format(
            'YYYY-MM-DD'
          ),
        }),
        ...(data?.preparedBy?.value && { preparedBy: data?.preparedBy?.value }),
        ...(data?.approvedBy?.value && { approvedBy: data?.approvedBy?.value }),
        ...(data?.reviewers?.value && { reviewers: [data?.reviewers?.value] }),
        ...(data?.appliesTo?.length > 0 && {
          appliesTo: data?.appliesTo.map((item: any) => item?.value),
        }),
        ...(pdffile && selectedFileName && { file: pdffile }),
        description: data?.description,
      }

      await PolicyService.addPolicyApi(policyData)

      setRender(!render)
      setOpenAddPolice(false)
      setIsLoading(false)
      setSelectedFileName('')
    } catch (err: any) {
      if (err?.response?.data?.error) {
        setErrors(err?.response?.data?.error, setError)
      }

      setIsLoading(false)
    }
  }

  const deletePolicy = async () => {
    try {
      setIsLoading(true)
      await PolicyService.deletePolicy(selectedPolicy?._id)
      selectedTab == 0 ? setRender(!render) : setRenderObselete(!renderObselete)
      setIsLoading(false)
      setOpen(false)
    } catch (error) {
      setIsLoading(false)
      console.error(error)
    }
  }

  const handleEdit = async (data: any) => {
    const {
      appliesTo,
      approvedBy,
      categoryId,
      effectiveDate,
      name,
      policyNumber,
      preparedBy,
      reviewers,
      version,
      description,
      fileId,
    } = data
    fileId[0]?.name && setSelectedFileName(fileId[0]?.name)

    reset({
      appliesTo: appliesTo?.map((item: any) => ({
        label: item?.fullName,
        value: item?._id,
      })),
      approvedBy: { value: approvedBy?._id, label: approvedBy?.fullName },
      categoryId: { value: categoryId?._id, label: categoryId?.name },
      effectiveDate: new Date(effectiveDate),
      name,
      policyNumber,
      preparedBy: { value: preparedBy?._id, label: preparedBy?.fullName },
      reviewers: { value: reviewers[0]?._id, label: reviewers[0]?.fullName },
      version,
      description,
    })
  }

  const updatePolicy = async (data: any) => {
    try {
      setIsLoading(true)
      const pdffile = await convertBase64Image(data?.pdf[0])

      const policyData = {
        ...(data?.name && { name: data?.name }),
        ...(data?.policyNumber && { policyNumber: data?.policyNumber }),
        ...(data?.version && { version: Number(data?.version) }),
        ...(data?.categoryId?.value && { categoryId: data?.categoryId?.value }),
        ...(data?.effectiveDate && {
          effectiveDate: moment(new Date(data?.effectiveDate)).format(
            'YYYY-MM-DD'
          ),
        }),
        ...(data?.preparedBy?.value && { preparedBy: data?.preparedBy?.value }),
        ...(data?.approvedBy?.value && { approvedBy: data?.approvedBy?.value }),
        ...(data?.reviewers?.value && { reviewers: [data?.reviewers?.value] }),
        ...(data?.appliesTo?.length > 0 && {
          appliesTo: data?.appliesTo.map((item: any) => item?.value),
        }),
        ...(pdffile && selectedFileName && { file: pdffile }),
        description: data?.description,
      }

      await PolicyService.updatePolicyApi(policyData, selectedPolicy?._id)
      setRender(!render)
      setOpenAddPolice(false)
      setIsLoading(false)
      setSelectedFileName('')
    } catch (err: any) {
      setIsLoading(false)
      console.error('error from add policy ', err?.response?.data)
      if (err?.response?.data?.error) {
        setErrors(err?.response?.data?.error, setError)
      }
      createNotification('error', 'Error', err?.response?.data?.msg)
    }
  }

  const handleAddRevisionPolicy = async (data: any) => {
    try {
      setIsLoading(true)
      const pdffile = await convertBase64Image(data?.pdf[0])

      const revisionPolicyData = {
        ...(data?.effectiveDate && {
          effectiveDate: moment(new Date(data?.effectiveDate)).format(
            'YYYY-MM-DD'
          ),
        }),
        ...(data?.preparedBy?.value && { preparedBy: data?.preparedBy?.value }),
        ...(data?.approvedBy?.value && { approvedBy: data?.approvedBy?.value }),
        ...(data?.reviewers?.value && { reviewers: [data?.reviewers?.value] }),
        ...(data?.appliesTo?.length > 0 && {
          appliesTo: data?.appliesTo.map((item: any) => item?.value),
        }),
        ...(pdffile && selectedFileName && { file: pdffile }),
        description: data?.description,
      }

      await PolicyService.addRevisionPolicyApi(
        selectedPolicy?._id,
        revisionPolicyData
      )
      setRender(!render)
      setOpenAddPolice(false)
      setIsLoading(false)
      setSelectedFileName('')
    } catch (err: any) {
      setIsLoading(false)
      console.error('error from add policy ', err?.response?.data)
      if (err?.response?.data?.error) {
        setErrors(err?.response?.data?.error, setError)
      }
      createNotification('error', 'Error', err?.response?.data?.msg)
    }
  }

  return (
    <>
      <>
        {selectedTab == 0 ? (
          <RenderAllPolicies
            render={render}
            reset={reset}
            handleEdit={handleEdit}
            setSelectedPolicy={setSelectedPolicy}
            setOpen={setOpen}
            setSelectedTab={setSelectedTab}
            control={control}
            selectedTab={selectedTab}
            setOpenAddPolice={setOpenAddPolice}
            setShowFilterView={setShowFilterView}
            showFilterView={showFilterView}
            options={employees}
            setEditPolicy={setEditPolicy}
            setOpenViewPdfPolicy={setOpenViewPdfPolicy}
            policyCategory={policyCategory}
            setLoading={setLoading}
          />
        ) : (
          <RenderObsolete
            renderObselete={renderObselete}
            setRenderObselete={setRenderObselete}
            type="Obselete"
            setOpen={setOpen}
            setSelectedPolicy={setSelectedPolicy}
            reset={reset}
            handleEdit={handleEdit}
            control={control}
            selectedTab={selectedTab}
            setOpenAddPolice={setOpenAddPolice}
            setSelectedTab={setSelectedTab}
            setShowFilterView={setShowFilterView}
            showFilterView={showFilterView}
            options={employees}
            setEditPolicy={setEditPolicy}
            setOpenViewPdfPolicy={setOpenViewPdfPolicy}
            policyCategory={policyCategory}
            setLoading={setLoading}
          />
        )}
      </>

      {loading && (
        <div className={style.loaderDiv}>
          <Loading loaderClass={style.loadingStyle} />
        </div>
      )}
      <DeletePopup
        heading="Are you sure you want to delete this policy?"
        handleDelete={() => deletePolicy()}
        setOpen={setOpen}
        open={open}
        isLoading={isLoading}
      />

      <Modal
        open={openAddPolice}
        text={
          editPoplicy?.label == 'Update Policy'
            ? 'Save Changes'
            : editPoplicy?.label == 'Add Revision'
            ? 'Save Changes'
            : 'Add Policy'
        }
        iconEnd={undefined}
        title={editPoplicy?.label}
        handleClose={() => {
          setOpenAddPolice(false)
          setSelectedFileName('')
        }}
        type="submit"
        form="AddPolicy"
        loader={isLoading}
      >
        <form
          onSubmit={(e) => {
            clearErrors()
            editPoplicy?.label == 'Update Policy'
              ? handleSubmit(updatePolicy)(e)
              : editPoplicy?.label == 'Add Revision'
              ? handleSubmit(handleAddRevisionPolicy)(e)
              : handleSubmit(handleAddPolicy)(e)
          }}
          id="AddPolicy"
        >
          <div className={style.gridView}>
            <TextField
              register={register}
              label="Name"
              placeholder="Enter Policy Name"
              star=" *"
              name="name"
              errorMessage={errors?.name?.message}
              isDisable={editPoplicy?.bool}
              icon={editPoplicy?.label == 'Update Policy' ? editIcon : ''}
              iconClass={style.iconClass}
            />
            <TextField
              register={register}
              label="Policy Number"
              placeholder="Enter Policy Number"
              star=" *"
              name="policyNumber"
              errorMessage={errors?.policyNumber?.message}
              isDisable={editPoplicy?.bool}
              icon={editPoplicy?.label == 'Update Policy' ? editIcon : ''}
              iconClass={style.iconClass}
            />
          </div>
          <div className={style.gridView}>
            <TextField
              register={register}
              label="Version"
              placeholder="Enter Policy Version"
              star=" *"
              name="version"
              errorMessage={errors?.version?.message}
              isDisable={editPoplicy?.bool}
              icon={editPoplicy?.label == 'Update Policy' ? editIcon : ''}
              iconClass={style.iconClass}
            />

            <Selection
              wraperSelect={style.wraperSelect}
              label="Category"
              placeholder="Select"
              options={policyCategory}
              star=" *"
              onChange={() => {
                return
              }}
              name="categoryId"
              errorMessage={errors?.categoryId?.message}
              control={control}
            />
          </div>
          <div className={style.gridView}>
            <DatePicker
              label="Effective Date"
              control={control}
              errorMessage={errors?.effectiveDate?.message}
              name="effectiveDate"
              star=" *"
              placeholder="Select Date"
            />
            <Selection
              control={control}
              errorMessage={errors?.preparedBy?.message}
              wraperSelect={style.wraperSelect}
              label="Prepared By"
              placeholder="Select Any"
              options={employees}
              star=" *"
              name="preparedBy"
            />
          </div>
          <div className={style.gridView}>
            <Selection
              name="reviewers"
              errorMessage={errors?.reviewers?.message}
              control={control}
              wraperSelect={style.wraperSelect}
              label="Reviewed"
              placeholder="Select Any"
              options={employees}
              star=" *"
            />

            <Selection
              control={control}
              errorMessage={errors?.approvedBy?.message}
              wraperSelect={style.wraperSelect}
              label="Approved By"
              placeholder="Select Any"
              options={employees}
              star=" *"
              name="approvedBy"
            />
          </div>

          <div className={style.gridView}>
            <Selection
              control={control}
              errorMessage={errors?.appliesTo?.message}
              wraperSelect={style.wraperSelect}
              label="Applies to"
              placeholder="Select"
              options={employeesWithDep}
              star=" *"
              closeMenuOnSelect={false}
              isMulti={true}
              name="appliesTo"
              defaultValue={null}
              isSearchable={false}
              showNumber
            />
            <div>
              <div style={{ display: 'flex' }}>
                <p className={style.pdfHeading}>Attach Pdf </p>
              </div>
              <ProfileUpload
                name={'pdf'}
                register={register}
                type="application/pdf,application/vnd.ms-excel"
                id={'file'}
                errorMessage={errors?.pdf?.message}
                selectedFileName={selectedFileName}
                setSelectedFileName={setSelectedFileName}
              />
            </div>
          </div>
          <div className={style.gridView1}>
            <TextArea
              label="Description"
              placeholder="Enter Description"
              register={register}
              name="description"
              errorMessage={errors?.description?.message}
              row={3}
            />
          </div>
        </form>
      </Modal>
      <PdfViewModal
        openPolicyPdfView={openPolicyPdfView}
        setOpenViewPdfPolicy={setOpenViewPdfPolicy}
        pdf={sampleBase64pdf}
      />
    </>
  )
}

export default Policy
