import AccordianSwitch from 'components/accordian';
import CustomSelect from 'components/custom-select';
import DatePicker from 'components/date-picker';
import NotificationPopup from 'components/notification-popup';
import { useState } from 'react';
// import MonthYearPicker from 'new-components/range-month-picker';
import { useForm } from 'react-hook-form';

const DashBoard = () => {
  const { control } = useForm();
  const [openAccordian, setOpenAccordian] = useState(-1);
  const [open, setOpen] = useState(false);

  return (
    <div style={{ height: '100vh' }}>
      <button onClick={() => setOpen(!open)}>click</button>
      <NotificationPopup
        open={open}
        plainText={'Please verify your email. Didn’t receive an email? '}
        hyperlink={' Resend confirmation'}
        handleClick={() => alert('click')}
      />
    </div>
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
