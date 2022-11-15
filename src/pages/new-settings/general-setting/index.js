import { useEffect, useState } from 'react';

import AccordianSwitch from 'components/accordian';
import CardContainer from 'components/card-container';

import SettingsService from 'services/settings-service';

import {
  departmentColumn,
  departmentRows,
  designationColumn,
  employeeIdColumn,
  employeeIdRows,
  genderColumn,
  genderRows,
  tagsColumn,
  tagsRows,
  leaveColumn,
  leaveRows,
  allowenceColumn,
  allowenceRows,
  documentsColumn,
  documentsRows,
} from './helper';

import style from './general.module.scss';

const GeneralSetting = () => {
  const [openAccordian, setOpenAccordian] = useState(-1);
  const [departmentRows, setDepartmentRows] = useState([]);
  const [designationRows, setDesignationRow] = useState([]);

  const getAllDepartments = async () => {
    const res = await SettingsService.getDepartments();
    setDepartmentRows(res?.data?.department);
  };

  useEffect(() => {
    getAllDepartments();
  }, []);

  const getAllDesignations = async () => {
    const res = await SettingsService.getDesignation();
    if (res.status === 200) {
      setDesignationRow(res?.data?.desiginations);
    }
  };

  useEffect(() => {
    getAllDesignations();
  }, []);

  return (
    <CardContainer className={style.card}>
      {totalAccordian?.map(({ id, title }) => {
        return (
          <AccordianSwitch
            title={title ? title : 'Profile'}
            btnText={`Add ${title}`}
            id={id}
            getAllDepartments={getAllDepartments}
            getAllDesignations={getAllDesignations}
            departmentRows={departmentRows}
            designationRows={designationRows}
            RowsData={
              title === 'Designation'
                ? designationRows?.map((item) => {
                    return {
                      name: item.name,
                      department: item?.departmentSettingId?.name,
                      _id: item?._id,
                    };
                  })
                : title === 'Advance Tags'
                ? tagsRows
                : title === 'Leave Type'
                ? leaveRows
                : title === 'Gender'
                ? genderRows
                : title === 'Allowence Types'
                ? allowenceRows
                : title === 'Documents Category'
                ? documentsRows
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
                : title === 'Advance Tags'
                ? tagsColumn
                : title === 'Leave Type'
                ? leaveColumn
                : title === 'Allowence Types'
                ? allowenceColumn
                : title === 'Documents Category'
                ? documentsColumn
                : ''
            }
            openAccordian={openAccordian}
            setOpenAccordian={setOpenAccordian}
          />
        );
      })}
    </CardContainer>
  );
};

export default GeneralSetting;

const totalAccordian = [
  { id: 1, title: 'Department' },
  { id: 2, title: 'Designation' },
  { id: 3, title: 'Employee ID Series' },
  { id: 4, title: 'Gender' },
  { id: 5, title: 'Advance Tags' },
  { id: 6, title: 'Leave Type' },
  { id: 7, title: 'Allowence Types' },
  { id: 8, title: 'Documents Category' },
];
