import StepBar from 'my-components/step-bar';

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

export const StepBarr: any = Template.bind({});
StepBarr.args = {
  controlWidth: '10',
  activeTab: 'Personal,Address',
  setActive: () => alert('activeTab'),
};
