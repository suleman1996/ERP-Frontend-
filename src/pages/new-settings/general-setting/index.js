import { useEffect, useState } from 'react'

import AccordianSwitch from 'components/accordian'
import CardContainer from 'components/card-container'

import SettingsService from 'services/settings-service'

import {
  departmentColumn,
  designationColumn,
  employeeIdColumn,
  genderColumn,
  genderRows,
  tagsColumn,
  tagsRows,
  leaveColumn,
  leaveRows,
  allowenceColumn,
  allowenceRows,
  documentsColumn,
} from './helper'

import style from './general.module.scss'

const GeneralSetting = () => {
  const [openAccordian, setOpenAccordian] = useState(-1)
  const [departmentRows, setDepartmentRows] = useState([])
  const [designationRows, setDesignationRow] = useState([])
  const [policyRow, setPolicyRows] = useState([])

  useEffect(() => {
    getAllDepartments()
    getAllDesignations()
    getAllPolicies()
  }, [])

  const getAllDepartments = async () => {
    const res = await SettingsService.getDepartments()
    setDepartmentRows(res?.data?.department)
  }

  const getAllDesignations = async () => {
    const res = await SettingsService.getDesignation()
    if (res.status === 200) {
      setDesignationRow(res?.data?.desiginations)
    }
  }

  const getAllPolicies = async () => {
    const res = await SettingsService.getAllPolicies()
    if (res?.status === 200) {
      setPolicyRows(res?.data?.policyCategory)
    }
  }

  return (
    <CardContainer className={style.card}>
      {totalAccordian?.map(({ id, title, btnText }, index) => {
        return (
          <AccordianSwitch
            key={index}
            title={title ? title : 'Profile'}
            titleClass={style.titleClass}
            btnText={btnText}
            id={id}
            getAllPolicies={getAllPolicies}
            getAllDepartments={getAllDepartments}
            getAllDesignations={getAllDesignations}
            departmentRows={departmentRows}
            designationRows={designationRows}
            policyRow={policyRow}
            RowsData={
              title === 'Designation'
                ? designationRows?.map((item) => {
                    return {
                      name: item.name,
                      department: item?.departmentSettingId?.name,
                      _id: item?._id,
                    }
                  })
                : title === 'Advance Tags'
                ? tagsRows
                : title === 'Leave Type'
                ? leaveRows
                : title === 'Gender'
                ? genderRows
                : title === 'Allowance Types'
                ? allowenceRows
                : title === 'Policy Category'
                ? policyRow
                : departmentRows
            }
            ColumnsData={
              title === 'Department'
                ? departmentColumn
                : title === 'Designation'
                ? designationColumn
                : title === 'Employee ID Series'
                ? employeeIdColumn
                : title === 'Gender'
                ? genderColumn
                : title === 'Attendance Tags'
                ? tagsColumn
                : title === 'Leave Type'
                ? leaveColumn
                : title === 'Allowance Types'
                ? allowenceColumn
                : title === 'Policy Category'
                ? documentsColumn
                : ''
            }
            openAccordian={openAccordian}
            setOpenAccordian={setOpenAccordian}
          />
        )
      })}
    </CardContainer>
  )
}

export default GeneralSetting

const totalAccordian = [
  { id: 1, title: 'Department', btnText: 'Add New Department' },
  { id: 2, title: 'Designation', btnText: 'Add New Designation' },
  { id: 3, title: 'Employee ID Series', btnText: 'Add New ID Series' },
  { id: 4, title: 'Gender', btnText: 'Add New Gender' },
  { id: 5, title: 'Attendance Tags', btnText: 'Add New Tag' },
  { id: 6, title: 'Leave Type', btnText: 'Add New Leave' },
  { id: 7, title: 'Allowance Types', btnText: 'Add New Allowance' },
  { id: 8, title: 'Policy Category', btnText: 'Add New Policy' },
]
