import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

import Modal from 'new-components/modal';
import TextField from 'new-components/textfield';
import Select from 'new-components/select';
import TimePicker from 'new-components/time-picker';

import { referenceOptions, conditionOptions, colorOptions } from './helper';

import tick from 'new-assets/tick.svg';
import style from './profile-settings.module.scss';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

interface Data {
  value: string;
  description: string;
}

const AddProfileTag = ({ open, setOpen }: Props) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <Modal
        open={open}
        title="Add Tag"
        handleClose={() => setOpen(false)}
        handleClick={() => setOpen(false)}
        text="Done"
        iconEnd={tick}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.grid}>
            <TextField
              name="name"
              label="Name"
              type="text"
              register={register}
              errorMessage={errors?.name?.message}
              placeholder="Name"
            />
            <Select
              label="Reference"
              name={'reference'}
              errorMessage={errors?.reference?.message}
              register={register}
            >
              <option value="">Select Reference</option>
              <>
                {referenceOptions &&
                  referenceOptions.map(({ value, description }: Data) => (
                    <option key={value} value={value}>
                      {description}
                    </option>
                  ))}
              </>
            </Select>
            <Select
              label="Condition"
              name={'condition'}
              errorMessage={errors?.condition?.message}
              register={register}
            >
              <option value="">Select Condition</option>
              <>
                {conditionOptions &&
                  conditionOptions.map(({ value, description }: Data) => (
                    <option key={value} value={value}>
                      {description}
                    </option>
                  ))}
              </>
            </Select>
            <Select
              label="Color"
              name={'color'}
              errorMessage={errors?.color?.message}
              register={register}
            >
              <option value="">Select Color</option>
              <>
                {colorOptions &&
                  colorOptions.map(({ value, description }: Data) => (
                    <option key={value} value={value}>
                      {description}
                    </option>
                  ))}
              </>
            </Select>
            <TimePicker
              label="Time"
              name={'time'}
              register={register}
              errorMessage={errors?.time?.message}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddProfileTag;
