import React, { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Modal from 'new-components/modal';
import ProfileUpload from 'new-components/profile-upload';
import TextField from 'new-components/textfield';

import tick from 'new-assets/tick.svg';
import style from './document.module.scss';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AddDocument = ({ open, setOpen }: Props) => {
  const { register, handleSubmit, errors, control } = useForm();

  const onSubmit = (data: any) => {};

  return (
    <>
      <Modal
        open={open}
        title="Add Document"
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
            <div>
              <label style={{ marginTop: '10px' }} className={style.label}>
                Add Document
              </label>
              <ProfileUpload />
            </div>
            <TextField
              name="category"
              label="Category"
              type="text"
              register={register}
              errorMessage={errors?.category?.message}
              placeholder="Category"
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddDocument;
