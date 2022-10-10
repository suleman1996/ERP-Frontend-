import ProfileUpload from 'new-components/profile-upload';

// import style from './timepicker.stories.module.scss';

export default {
  title: 'ProfileUpload',
  component: ProfileUpload,
  argTypes: {},
};

const Template = (args: any) => {
  return (
    <>
      <ProfileUpload {...args} />
    </>
  );
};
export const Profile_Upload: any = Template.bind({});
Profile_Upload.args = {
  errorMessage: '',
  onClick: () => alert('Please Attach'),
  id: '',
};
