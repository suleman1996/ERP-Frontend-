import ImageUpload from 'components/image-upload';
import { useState } from 'react';

export default {
  title: 'ImageUpload',
  component: ImageUpload,
  argTypes: {},
};

const Template = (args: any) => {
  const [img, setImg] = useState<unknown>('');

  return (
    <>
      <ImageUpload
        {...args}
        name={'profilePicture'}
        label={'Image Upload'}
        img={img}
        setImg={setImg}
        btnText="Remove Photo"
      />
    </>
  );
};
export const Image_Upload: any = Template.bind({});
Image_Upload.args = {
  errorMessage: '',
  onClick: () => alert('Please Attach'),
  id: '',
};
