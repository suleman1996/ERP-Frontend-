import React, { useState } from 'react';

import Modal from 'components/modal';

export default {
  title: 'Modal',
  component: Modal,
  argTypes: { handleClick: { action: 'Please Click Me' } },
};

const Template = (args: any) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Modal
        {...args}
        handleClose={() => setOpen(!open)}
        open={open}
        openModal={() => setOpen(true)}
      />
    </>
  );
};

export const Modall: any = Template.bind({});
Modall.args = {
  title: 'Hey Man',
  text: 'Next',
  type: 'button',
  children: 'Hey are you okay?',
  modalButtonText: 'Open',
};
