import { useState } from 'react';
import { useForm } from 'react-hook-form';

import AccordianSwitch from 'components/accordian';
import FiltersComponent from 'components/filters';
import FiltersComponentByDate from 'components/filters/filter-for-dates';
import ImageUpload from 'components/image-upload';
import CustomSelect from 'components/custom-select';
import DatePicker from 'components/date-picker';
import NotificationPopup from 'components/notification-popup';

const DashBoard = () => {
  const { control } = useForm();
  const [openAccordian, setOpenAccordian] = useState(-1);
  const [img, setImg] = useState<unknown>('');
  const [open, setOpen] = useState(false);

  return (
    <>
      <ImageUpload
        name={'profilePicture'}
        label={'Profile Picture'}
        img={img}
        setImg={setImg}
        btnText="Remove Photo"
      />
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
      <FiltersComponent />
      <div style={{ height: '100vh' }}>
        <button onClick={() => setOpen(!open)}>click</button>
        <NotificationPopup
          open={open}
          plainText={'Please verify your email. Didn’t receive an email? '}
          hyperlink={' Resend confirmation'}
          handleClick={() => alert('click')}
        />
      </div>
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
