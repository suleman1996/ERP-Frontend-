import StepBar from 'components/step-bar';

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
