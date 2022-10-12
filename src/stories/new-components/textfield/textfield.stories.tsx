import TextField from 'my-components/textfield';
import image from 'assets/logo3.png';

import style from './textfield.stories.module.scss';

export default {
  title: 'TextField',
  component: TextField,
  argTypes: {
    onChange: { action: 'yes I am Changing' },
  },
};

const Template = (args: any) => {
  return (
    <>
      <TextField {...args} />
    </>
  );
};

export const TextFieldd: any = Template.bind({});
TextFieldd.args = {
  label: 'TextField',
  placeholder: 'Write something',
  icon: image,
  isDisable: false,
  readOnly: false,
  id: '12',
  className: style.mainView,
  onClick: () => alert('Please Dont Touch'),
};
