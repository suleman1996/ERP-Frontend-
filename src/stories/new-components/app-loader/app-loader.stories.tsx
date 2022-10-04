import AppLoader from 'new-components/app-loader';

// import style from './app-loader.stories.module.scss';

export default {
  title: 'AppLoader',
  component: AppLoader,
};

const Template = (args) => <AppLoader {...args} />;

export const Apploader = Template.bind({});
Apploader.args = {};
