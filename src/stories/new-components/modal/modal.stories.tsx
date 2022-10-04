import Modal from 'new-components/modal';
import React from 'react';
import eye from '../../../new-assets/add.svg';

import style from './modal.stories.module.scss';

export default {
  title: 'Modal',
  component: Modal,
  argTypes: { handleClick: { action: 'Please Click Me' } },
};

const Template = (args: any) => {
  return (
    <>
      <Modal {...args} handleClose={() => alert('Are you sure you close the modal')} />
    </>
  );
};

export const Modall = Template.bind({});
Modall.args = {
  open: false,
  title: 'Hey Man',
  text: 'Next',
  type: 'button',
  iconStart: eye,
  children: 'Hey are you okay?',
  btnClass: style.button,
  className: style.containerClass,
};
