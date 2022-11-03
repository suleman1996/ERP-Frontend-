/* eslint-disable @typescript-eslint/no-unused-vars */
import SkillLevel from 'components/skill-level';
import { useForm } from 'react-hook-form';

import style from './select.stories.module.scss';

export default {
  title: 'SkillLevel',
  component: SkillLevel,
  argTypes: {
    onChange: { action: 'Please Click Me' },
  },
};

const Template = (args: any) => {
  const { control } = useForm();
  return (
    <>
      <SkillLevel {...args} control={control} />
    </>
  );
};

export const Skill_Level: any = Template.bind({});
Skill_Level.args = {
  name: 'Select',
  errors: '',
  activeEdit: '',
};
