import AccordianSwitch from 'components/accordian';
import FiltersComponent from 'components/filters';
import FiltersComponentByDate from 'components/filters/filter-for-dates';
import ImageUpload from 'components/image-upload';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const DashBoard = () => {
  const { control } = useForm();
  const [openAccordian, setOpenAccordian] = useState(-1);
  const [img, setImg] = useState<unknown>('');

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
