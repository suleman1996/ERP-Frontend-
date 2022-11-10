import Button from 'components/button';

import style from './request.module.scss';

import TextField from 'components/textfield';
import { Control, useForm } from 'react-hook-form';

import DatePicker from 'components/date-picker';

import Selection from 'components/select';

const RenderPolicySearchView = ({ control, options }: { control: Control; options: any }) => (
  <div className={style.policySearchView}>
    <TextField placeholder="Job Title" />
    {/* <DropDownSelect /> */}
    <Selection
      wraperSelect={style.wraperSelect}
      // label="Reviewed By"
      placeholder="Job Status"
      selectContainer={style.selectContainer}
      options={options}
      star=" *"
      onChange={(item) => console.log(item)}
    />

    <DatePicker control={control} name="Date" />

    <Button text="Search" btnClass={style.btnClass} />
  </div>
);

export default RenderPolicySearchView;
