import AppLoader from 'components/app-loader';

export default {
  title: 'AppLoader',
  component: AppLoader,
};

const Template = (args: any) => <AppLoader {...args} />;

export const Apploader: any = Template.bind({});
Apploader.args = {};
