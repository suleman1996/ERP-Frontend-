import DeletePopup from 'new-components/delete-modal';
import Button from 'new-components/button';

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
