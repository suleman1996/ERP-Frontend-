import { useState } from 'react';
import { useForm } from 'react-hook-form';

import FiltersComponent from 'components/filters';
import ImageUpload from 'components/image-upload';
import NotificationPopup from 'components/notification-popup';
import FiltersComponentByDate from 'components/filters/filter-for-dates';
import TextField from 'components/textfield';
import Container from 'components/container';

const DashBoard = () => {
  const { control, register } = useForm();
  const [img, setImg] = useState<unknown>('');
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <TextField label="TextField" register={register} />
      <FiltersComponentByDate />
      <ImageUpload
        name={'profilePicture'}
        label={'Profile Picture'}
        img={img}
        setImg={setImg}
        btnText="Remove Photo"
      />

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
    </Container>
  );
};

export default DashBoard;
