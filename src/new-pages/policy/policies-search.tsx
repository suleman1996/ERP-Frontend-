import Button from 'new-components/button';

import style from './request.module.scss';

import TextField from 'new-components/textfield';
import { Control, useForm } from 'react-hook-form';

import DatePicker from 'new-components/date-picker';

import Selection from 'my-components/select';

const RenderPolicySearchView = ({ control, options }: { control: Control; options: any }) => (
  <div className={style.policySearchView}>
    <TextField placeholder="Job Title" />
    {/* <DropDownSelect /> */}
    <Selection
      wraperSelect={style.wraperSelect}
      // label="Reviewed By"
      placeholder="Job Status"
      options={options}
      star=" *"
      onChange={(item) => console.log(item)}
    />
    <DatePicker control={control} name="gg" />
    <Button text="Search" />
  </div>
);

export default RenderPolicySearchView;
