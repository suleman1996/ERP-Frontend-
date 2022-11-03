import DeletePopup from 'components/delete-modal';
import Button from 'components/button';

export default {
  title: 'DeletePopup',
  component: DeletePopup,
  Button,
  argTypes: { handleDelete: { action: 'Please Click Me' } },
};

const Template = (args: any) => <DeletePopup {...args} />;

export const Deletepopup: any = Template.bind({});
Deletepopup.args = {
  open: false,
  btnLoader: false,
  h1color: 'red',
  h2color: 'blue',
};
