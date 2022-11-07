import AccordianSwitch from 'components/accordian';
import CustomSelect from 'components/custom-select';
import DatePicker from 'components/date-picker';
import { useState } from 'react';
// import MonthYearPicker from 'new-components/range-month-picker';
import { useForm } from 'react-hook-form';

const DashBoard = () => {
  const { control } = useForm();
  const [openAccordian, setOpenAccordian] = useState(-1);

  return (
    <>
      {totalAccordian?.map((data) => {
        return (
          <AccordianSwitch
            title={'Profile'}
            bodyData={addProfileData}
            id={data?.id}
            openAccordian={openAccordian}
            setOpenAccordian={setOpenAccordian}
          />
        );
      })}
    </>
  );
};

export default DashBoard;

const addProfileData = [
  { name: 'Add Employee' },
  { name: 'Edit Employee' },
  { name: 'View Employee' },
  { name: 'Delete Employee' },
  { name: 'CV View' },
  { name: 'Profile View' },
];

const totalAccordian = [
  { name: '1', id: 1 },
  { name: '1', id: 2 },
  { name: '1', id: 3 },
];
