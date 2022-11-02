import Checkbox from 'new-components/checkbox';
import React from 'react';
import { useForm } from 'react-hook-form';

import style from './checkbox.stories.module.scss';

export default {
  title: 'Checkbox',
  component: Checkbox,
};

const Template = (args: any) => {
  const { register } = useForm();

  const [check, setCheck] = React.useState(false);
  return (
    <Checkbox
      {...args}
      handleChange={() => setCheck(!check)}
      checked={check}
      name="check"
      register={register}
      containerClass={style.containerClass}
    />
  );
};

export const CheckBox: any = Template.bind({});
CheckBox.args = {
  label: 'check me',
  containerClass: style.containerClass,
  textColor: '',
};
