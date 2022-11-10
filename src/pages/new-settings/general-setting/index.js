import AccordianSwitch from 'components/accordian';
import CardContainer from 'components/card-container';
import React, { useState } from 'react';

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
  return (
    <CardContainer className={style.card}>
      {totalAccordian?.map(({ id, title }) => {
        return (
          <AccordianSwitch
            title={title ? title : 'Profile'}
            handleEdit={(id) => alert(id)}
            btnText={`Add ${title}`}
            id={id}
            RowsData={
              title === 'Advance Tags'
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
  { name: '1', id: 1, title: 'Department' },
  { name: '1', id: 2, title: 'Designation' },
  { name: '1', id: 3, title: 'Employee ID Series' },
  { name: '1', id: 4, title: 'Gender' },
  { name: '1', id: 5, title: 'Advance Tags' },
  { name: '1', id: 6, title: 'Leave Type' },
  { name: '1', id: 7, title: 'Allowence Types' },
  { name: '1', id: 8, title: 'Documents Category' },
];
