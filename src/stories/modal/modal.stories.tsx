import Button from 'components/button';
import Modal from 'components/modal';
import React, { useState } from 'react';

import style from './modal.stories.module.scss';

export default {
  title: 'Modal',
  component: Modal,
  argTypes: { handleClick: { action: 'Please Click Me' } },
};

const Template = (args: any) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button handleClick={() => setOpen(true)} text="open" />
      <Modal {...args} handleClose={() => setOpen(false)} open={open} className={style.modal} />
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
