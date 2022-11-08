import AccordianSwitch from 'components/accordian';
import CardContainer from 'components/card-container';
import React, { useState } from 'react';

import { ColumnsData, RowsData } from './helper';

import style from './general.module.scss';

const GeneralSetting = () => {
  const [openAccordian, setOpenAccordian] = useState(-1);
  return (
    <CardContainer className={style.card}>
      {totalAccordian?.map((data) => {
        return (
          <AccordianSwitch
            title={data.title ? data.title : 'Profile'}
            bodyData={addProfileData}
            id={data?.id}
            RowsData={RowsData}
            ColumnsData={ColumnsData}
            openAccordian={openAccordian}
            setOpenAccordian={setOpenAccordian}
          />
        );
      })}
    </CardContainer>
  );
};

export default GeneralSetting;

const addProfileData = [
  { name: 'Add Employee' },
  { name: 'Edit Employee' },
  { name: 'View Employee' },
  { name: 'Delete Employee' },
  { name: 'CV View' },
  { name: 'Profile View' },
];

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
