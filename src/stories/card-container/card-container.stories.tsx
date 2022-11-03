import CardContainer from 'components/card-container';

export default {
  title: 'CardContainer',
  component: CardContainer,
};

const Template = (args: any) => <CardContainer {...args} />;

export const Cardcontainer: any = Template.bind({});
Cardcontainer.args = {
  backgroundColor: 'red',
  children: '',
};
