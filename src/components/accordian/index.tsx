import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import Selection from 'components/selection'
import Switch from 'components/switch'
import DeletePopup from 'components/delete-modal'
import Table from 'components/table'
import CardContainer from 'components/card-container'
import Button from 'components/button'
import Tags from 'components/tags'
import Modal from 'components/modal'
import Input from 'components/textfield'

import SettingsService from 'services/settings-service'

import statusIcon from 'assets/status.svg'
import arrow from 'assets/arrowup.svg'
import style from './accordian.module.scss'

const AccordianSwitch = ({
  title,
  bodyData,
  id,
  openAccordian,
  setOpenAccordian,
  switchBtn,
  ColumnsData,
  RowsData,
  accordianContainer,
  btnText,
  getAllDepartments,
  departmentRows,
  designationRows,
  getAllDesignations,
  titleClass,
}: any) => {
  const [checkAll, setCheckAll] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deletePopUp, setDeletePopUp] = useState(false)
  const [departmentModal, setDepartmentModal] = useState(false)
  const [designationModal, setDesignationModal] = useState(false)
  const [idSeriesModal, setIdSeriesModal] = useState(false)
  const [advanceTagModal, setAdvanceTagModal] = useState(false)
  const [leaveTypeModal, setLeaveTypeModal] = useState(false)
  const [genderModal, setGenderModal] = useState(false)
  const [allowenceTypeModal, setAllowenceTypeModal] = useState(false)
  const [documentModal, setDocumenModal] = useState(false)
  const [arrowRotate, setArrowRotate] = useState(false)
  const [depId, setDepId] = useState()

  const { register, handleSubmit, errors, control, reset } = useForm({
    resolver: yupResolver(
      title === 'Department' ? departmentSchema : designationSchema
    ),
  })

  const handleClickBtn = () => {
    if (title === 'Department') {
      setDepartmentModal(true)
    } else if (title === 'Designation') {
      setDesignationModal(true)
    } else if (title === 'Employee ID Series') {
      setIdSeriesModal(true)
    } else if (title === 'Advance Tags') {
      setAdvanceTagModal(true)
    } else if (title === 'Leave Type') {
      setLeaveTypeModal(true)
    } else if (title === 'Gender') {
      setGenderModal(true)
    } else if (title === 'Allowance Types') {
      setAllowenceTypeModal(true)
    } else if (title === 'Documents Category') {
      setDocumenModal(true)
    }
  }

  const departmentSubmit = async (data: any) => {
    if (depId) {
      setLoading(true)
      const res = await SettingsService.updateDepartment(data, depId)
      if (res.status === 200) {
        setDepartmentModal(false)
        reset({})
        getAllDepartments()
        setLoading(false)
      }
      setLoading(false)
    } else {
      setLoading(true)
      const res = await SettingsService.addDepartment(data)
      if (res.status === 200) {
        setDepartmentModal(false)
        reset({})
        getAllDepartments()
        setLoading(false)
      }
    }
  }

  const handleEdit = (id: string | number) => {
    if (title === 'Department') {
      setDepartmentModal(true)
      setDepId(id)
      reset({ ...departmentRows?.find((item) => item._id === id) })
    } else if (title === 'Designation') {
      setDesignationModal(true)
      setDepId(id)
      const data = designationRows?.find((item) => item._id === id)
      reset({
        ...data,
        departmentId: {
          label: data?.departmentSettingId?.name,
          value: data?.departmentSettingId?._id,
        },
      })
    }
  }

  const handleDelete = async () => {
    if (title === 'Department') {
      setLoading(true)
      const res = await SettingsService.deleteDepartment(depId)
      if (res.status === 200) {
        setDeletePopUp(false)
        getAllDepartments()
        setDeletePopUp(false)
      }
      setDeletePopUp(false)
    } else if (title === 'Designation') {
      const res = await SettingsService.deleteDesignation(depId)
      if (res.status === 200) {
        getAllDesignations()
        setDeletePopUp(false)
      }
    }
  }

  const designationSubmit = async (data: any) => {
    const newData = {
      name: data?.name,
      departmentId: data?.departmentId?.value,
    }
    if (depId) {
      const res = await SettingsService.updateDesignation(newData, depId)
      if (res.status === 200) {
        setDesignationModal(false)
        getAllDesignations()
        reset({})
      }
    } else {
      const res = await SettingsService.addDesignation(newData)
      if (res.status === 200) {
        setDesignationModal(false)
        getAllDesignations()
        reset({})
      }
    }
  }

  return (
    <div className={style.mainCard}>
      <div
        className={`${style.container} ${accordianContainer} `}
        onClick={() => {
          setOpenAccordian((prev) => (prev === id ? -1 : id))
          setArrowRotate(!arrowRotate)
        }}
        style={{ marginTop: !switchBtn && '10px' }}
      >
        <div className={style.switchHeader}>
          <span className={titleClass}>{title}</span>
          {switchBtn && (
            <Switch
              switchContainer={style.switchContainer}
              name={'parent'}
              control={control}
              onChange={() => setCheckAll(!checkAll)}
            />
          )}
        </div>
        <img
          src={arrow}
          style={{
            transform: !arrowRotate && 'rotate(180deg)',
            transition: 'all 0.5s ease-out',
            marginRight: '8px',
          }}
        />
      </div>

      {openAccordian === id &&
        (switchBtn ? (
          bodyData?.map((data: any, index: any) => {
            return <Comp name={data?.name} checkAll={checkAll} key={index} />
          })
        ) : (
          <>
            <CardContainer className={style.card}>
              <div style={{ paddingBottom: '15px' }}>
                <Table
                  tableHeaderClass={style.tableHeaderClass}
                  columns={
                    ColumnsData &&
                    ColumnsData?.map((item: any) => ({
                      ...item,
                      name:
                        item.name !== 'Status' ? (
                          item.name
                        ) : (
                          <div>
                            {' '}
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                              }}
                            >
                              <span style={{ marginRight: '5px' }}>Status</span>
                              <div className={style.tooltip}>
                                <img
                                  className={style.tooltip}
                                  src={statusIcon}
                                  style={{ marginTop: '5px' }}
                                />
                                <span className={style.tooltiptext}>
                                  If you want to hide any option from the
                                  dropdowns, you can hide it by doing Inactive
                                  it
                                </span>
                              </div>
                            </div>
                          </div>
                        ),
                    }))
                  }
                  rows={RowsData.map((row) => ({
                    ...row,
                    image: <div className={style.image}></div>,
                    tagCategory: (
                      <Tags
                        text={row?.tagCategory}
                        boxColor={'#FACCCC'}
                        textColor={'#e92424'}
                      />
                    ),
                    status: (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          transition: 'all 0.5s',
                        }}
                      >
                        <Switch
                          title={'Active'}
                          name={'active'}
                          control={control}
                        />
                      </div>
                    ),
                  }))}
                  headingText={style.headingText}
                  rowText={style.rowText}
                  minWidth="700px"
                  handleDelete={(id) => {
                    setDepId(id)
                    setDeletePopUp(true)
                  }}
                  handleEdit={(id) => handleEdit(id)}
                />
                <div className={style.btnDiv}>
                  <Button text={btnText} handleClick={handleClickBtn} />
                </div>
                <DeletePopup
                  open={deletePopUp}
                  setOpen={setDeletePopUp}
                  handleDelete={handleDelete}
                />
              </div>
            </CardContainer>
          </>
        ))}

      <Modal
        open={departmentModal}
        handleClose={() => {
          setDepartmentModal(false)
          setDepId('')
        }}
        title={'Add New Department'}
      >
        <form onSubmit={handleSubmit(departmentSubmit)}>
          <div className={style.modalContainer}>
            <Input
              name={'name'}
              label="Department Name"
              placeholder="Enter Department Name"
              register={register}
              errorMessage={errors?.name?.message}
              containerClass={style.containerClass}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '15px',
            }}
          >
            <Button text="Add Department" type="submit" isLoading={loading} />
          </div>
        </form>
      </Modal>

      <Modal
        open={designationModal}
        handleClose={() => {
          setDesignationModal(false)
          setDepId('')
        }}
        title={'Add New Designation'}
      >
        <form onSubmit={handleSubmit(designationSubmit)}>
          <div className={style.modalContainer}>
            <Input
              name={'name'}
              label="Designation Name"
              placeholder="Enter Designation Name"
              containerClass={style.containerClass}
              register={register}
              errorMessage={errors?.name?.message}
            />
            <Selection
              label="Department Name"
              name={'departmentId'}
              control={control}
              options={departmentRows?.map((item) => {
                return { label: item?.name, value: item?._id }
              })}
              errorMessage={errors?.departmentId?.message}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '15px',
            }}
          >
            <Button text="Add Designation" />
          </div>
        </form>
      </Modal>

      <Modal
        open={idSeriesModal}
        handleClose={() => setIdSeriesModal(false)}
        title={'Add New Department'}
      >
        <div>
          <Input
            label="Employee ID Series"
            placeholder="SPX"
            containerClass={style.containerClass}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '15px',
          }}
        >
          <Button text="Add Series " />
        </div>
      </Modal>

      <Modal
        open={advanceTagModal}
        handleClose={() => setAdvanceTagModal(false)}
        title={'Add Attendance Tag'}
      >
        <div className={style.modalContainer} style={{ marginBottom: '10px' }}>
          <Input
            label="Tag Name"
            placeholder="Enter Tag Name"
            containerClass={style.containerClass}
          />
          <div>
            <span>Category</span>
            <div style={{ display: 'flex', marginTop: '10px' }}>
              <Button
                text="Good"
                btnClass={style.btnClass}
                className={style.btnText}
              />
              <Button
                text="Bad"
                btnClass={style.btnClassRed}
                className={style.btnTextRed}
              />
              <Button
                text="Neutral"
                btnClass={style.btnClassPruple}
                className={style.btnTextpurple}
              />
            </div>
          </div>
        </div>
        <div className={style.fiveGrid}></div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '15px',
          }}
        >
          <Button text="Add Tag" />
        </div>
      </Modal>

      <Modal
        open={leaveTypeModal}
        handleClose={() => setLeaveTypeModal(false)}
        title={'Add New Leave'}
      >
        <div className={style.modalContainer}>
          <Input
            label="Leave Type"
            placeholder="Enter Leave Type"
            containerClass={style.containerClass}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '15px',
          }}
        >
          <Button text="Add Leave" />
        </div>
      </Modal>

      <Modal
        open={genderModal}
        handleClose={() => setGenderModal(false)}
        title={'Add New Gender'}
      >
        <div>
          <Input
            label="Gender"
            placeholder="Enter gender"
            containerClass={style.containerClass}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '15px',
          }}
        >
          <Button text="Add Gender " />
        </div>
      </Modal>

      <Modal
        open={allowenceTypeModal}
        handleClose={() => setAllowenceTypeModal(false)}
        title={'Add New Allowance'}
      >
        <div>
          <Input
            label="Allowence"
            placeholder="Enter allowence"
            containerClass={style.containerClass}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '15px',
          }}
        >
          <Button text="Add Allowence " />
        </div>
      </Modal>

      <Modal
        open={documentModal}
        handleClose={() => setDocumenModal(false)}
        title={'Add New Document'}
      >
        <div>
          <Input
            label="Document"
            placeholder="Enter document"
            containerClass={style.containerClass}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '15px',
          }}
        >
          <Button text="Add Document " />
        </div>
      </Modal>
    </div>
  )
}

const Comp = ({ name, checkAll }: any) => {
  const [checked, setChecked] = useState(false)

  const { control } = useForm()

  useEffect(() => {
    setChecked(checkAll)
  }, [checkAll])

  return (
    <div className={style.body}>
      <div className={style.bodySwitch}>
        <span>{name}</span>
        <Switch
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          name={'switch'}
          control={control}
        />
      </div>
    </div>
  )
}

export default AccordianSwitch

export const departmentSchema = yup.object().shape({
  name: yup.string().required('Department name  is a required field'),
})

export const designationSchema = yup.object().shape({
  name: yup.string().required('Designation name  is a required field'),
  departmentId: yup.object().required('Department name  is a required field'),
})
