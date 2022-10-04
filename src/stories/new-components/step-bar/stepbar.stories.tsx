import StepBar from 'new-components/stepbar';

// import style from './timepicker.stories.module.scss';

export default {
  title: 'StepBar',
  component: StepBar,
  argTypes: {},
};

const Template = (args: any) => {
  return (
    <>
      <StepBar {...args} />
    </>
  );
};

export const StepBarr = Template.bind({});
StepBarr.args = {
  controlWidth: '10',
  activeTab: 'Personal',
};
