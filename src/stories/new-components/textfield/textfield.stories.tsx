import TextField from 'new-components/textfield';
import image from 'assets/logo3.png';

import style from './textfield.stories.module.scss';

export default {
  title: 'TextField',
  component: TextField,
  argTypes: {
    onClick: { action: 'Please Click Me' },
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

export const TextFieldd = Template.bind({});
TextFieldd.args = {
  label: 'TextField',
  placeholder: 'Write something',
  icon: image,
  isDisable: false,
  readOnly: false,
  id: '12',
  className: style.mainView,
};
