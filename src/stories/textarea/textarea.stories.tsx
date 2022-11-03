import TextArea from 'components/textarea';

import style from './textarea.stories.module.scss';

export default {
  title: 'TextArea',
  component: TextArea,
  argTypes: {
    onChange: { action: 'Please Click Me' },
  },
};

const Template = (args: any) => {
  return (
    <>
      <TextArea {...args} />
    </>
  );
};

export const TextAreaa: any = Template.bind({});
TextAreaa.args = {
  label: 'Please Enter',
  placeholder: 'Type Something...',
  name: 'hello',
  isDisable: false,
  className: style.mainView,
};
