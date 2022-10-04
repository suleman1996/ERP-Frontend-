import TimePicker from 'new-components/time-picker';

import style from './timepicker.stories.module.scss';

export default {
  title: 'TimePicker',
  component: TimePicker,
  argTypes: {
    onClick: { action: 'Please Click Me' },
  },
};

const Template = (args: any) => {
  return (
    <>
      <TimePicker {...args} />
    </>
  );
};

export const TimePickerr = Template.bind({});
TimePickerr.args = {
  label: 'Time Picker',
  placeholder: '00/00/00',
  errorMessage: 'errorMessage',
  mainClass: style.mainClass,
};
