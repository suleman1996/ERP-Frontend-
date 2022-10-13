import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Modal from 'new-components/modal';
import ProfileUpload from 'new-components/profile-upload';
import TextField from 'new-components/textfield';

import EmployeeService from 'services/employee-service';

import tick from 'new-assets/tick.svg';
import style from './document.module.scss';
import { useParams } from 'react-router';
import { convertBase64Image } from 'main-helper';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  docId?: any;
  setDocId?: any;
  getAllDocuments?: () => void;
}

const AddDocument = ({ open, setOpen, docId, setDocId, getAllDocuments }: Props) => {
  const { id } = useParams();
  const { register, handleSubmit, errors, control, reset } = useForm();
  const [selectedFileName, setSelectedFileName] = useState('');
  console.log('selectedFileName', selectedFileName?.split('.')[0]);

  const onSubmit = async (data: any) => {
    const userDoc = {
      ...data,
      employeeId: id,
      file: data.frontPic && data.frontPic.length && (await convertBase64Image(data.frontPic[0])),
      documentName: data?.name,
    };
    if (docId) {
      const res = await EmployeeService.updateDocument(userDoc, docId);
      if (res.status === 200) {
        setOpen(false);
        getAllDocuments && getAllDocuments();
      }
    } else {
      const res = await EmployeeService.addDocument(userDoc);
      if (res.status === 200) {
        setOpen(false);
        getAllDocuments && getAllDocuments();
      }
    }
  };

  const getDocById = async () => {
    const res = await EmployeeService.getByIdDocument(docId);
    reset({
      name: res?.data?.name,
      category: res?.data?.category,
    });
    setSelectedFileName(res?.data?.fileFor);
  };

  useEffect(() => {
    docId && getDocById();
  }, [docId]);

  return (
    <>
      <Modal
        open={open}
        title="Add Document"
        handleClose={() => setOpen(false)}
        // handleClick={() => setOpen(false)}
        text="Done"
        type="submit"
        iconEnd={tick}
        form="addDoc"
      >
        <form id="addDoc" onSubmit={handleSubmit(onSubmit)}>
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
              <label className={style.label}>Document</label>
              <ProfileUpload
                name={'frontPic'}
                register={register}
                id={'frontPic'}
                errorMessage={errors?.frontPic?.message}
                selectedFileName={selectedFileName}
                setSelectedFileName={setSelectedFileName}
              />
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
