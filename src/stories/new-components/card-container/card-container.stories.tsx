import CardContainer from 'new-components/card-container';

import style from './card-container.stories.module.scss';

export default {
  title: 'CardContainer',
  component: CardContainer,
};

const Template = (args) => <CardContainer {...args} />;

export const Cardcontainer = Template.bind({});
Cardcontainer.args = {
  className: style.containerClass,
  children: 'hello',
};
