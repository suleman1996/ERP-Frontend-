import Button from 'components/button';

import style from './request.module.scss';

import TextField from 'components/textfield';
import { Control, useForm } from 'react-hook-form';

import DatePicker from 'components/date-picker';

import Selection from 'components/selection';

const RenderPolicySearchView = ({
  // control,
  policyCategory,
}: {
  control: Control;
  policyCategory: any;
}) => {
  const { handleSubmit, control, register } = useForm({
    mode: 'all',
  });

  const handleSearch = async (data: any) => {
    try {
      console.log('Search data ', data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={(e) => {
        handleSubmit(handleSearch)(e);
      }}
      id="SearchPolicy"
    >
      <div className={style.policySearchView}>
        <TextField register={register} placeholder="Job Title" name="jobTitle" />
        {/* <DropDownSelect /> */}
        <Selection
          wraperSelect={style.wraperSelect}
          // label="Category"
          placeholder="Category"
          options={policyCategory}
          star=" *"
          onChange={(item) => console.log(item)}
          name="categoryId"
          // errorMessage={errors?.categoryId?.message}
          control={control}
          // isDisabled={editPoplicy?.bool}
        />

        <DatePicker placeholder="Effective Date" control={control} name="Date" />

        <Button form="SearchPolicy" text="Search" btnClass={style.btnClass} type="submit" />
      </div>
    </form>
  );
};

export default RenderPolicySearchView;
