import Tags from 'my-components/tags';

import style from './tags.stories.module.scss';

export default {
  title: 'Tags',
  component: Tags,
  argTypes: {
    onChange: { action: 'Please Click Me' },
  },
};

const Template = (args: any) => {
  return (
    <>
      <Tags {...args} />
    </>
  );
};

const options = ['tag1', 'tag2', 'tag3', 'tag4'];

export const Tagss: any = Template.bind({});
Tagss.args = {
  tagsTextArr: options,
  textStyle: style.text,
};
