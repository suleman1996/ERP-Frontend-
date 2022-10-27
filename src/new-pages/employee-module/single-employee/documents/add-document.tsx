import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Modal from 'new-components/modal';
import ProfileUpload from 'new-components/profile-upload';
import TextField from 'new-components/textfield';

import EmployeeService from 'services/employee-service';
import { setErrors } from './../../../../helper/index';

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
  const { register, handleSubmit, errors, control, reset, setError } = useForm();
  const [selectedFileName, setSelectedFileName] = useState('');
  const [loader, setLoader] = useState(false);

  const onSubmit = async (data: any) => {
    // setLoader(true);
    try {
      console.log('selectedFileName', selectedFileName);

      const userDoc = {
        ...data,
        employeeId: id,
        ...(data.file &&
          data.file.length && {
            file: docId ? selectedFileName : await convertBase64Image(data.file[0]),
          }),
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
    } catch (err) {
      console.log(err);
      if (err?.response?.data?.error) {
        setErrors(err?.response?.data?.error, setError);
      }
    }
  };

  const getDocById = async () => {
    const res = await EmployeeService.getByIdDocument(docId);
    reset({
      documentName: res?.data?.name,
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
        title={`${docId ? 'Edit' : 'Add'} Document`}
        handleClose={() => setOpen(false)}
        // handleClick={() => setOpen(false)}
        text="Done"
        loader={loader}
        type="submit"
        iconEnd={tick}
        form="addDoc"
      >
        <form id="addDoc" onSubmit={handleSubmit(onSubmit)}>
          <div className={style.grid}>
            <TextField
              name="documentName"
              label="Name"
              type="text"
              register={register}
              errorMessage={errors?.documentName?.message}
              placeholder="Name"
            />
            <div>
              <label className={style.label}>Document</label>
              <ProfileUpload
                name={'file'}
                register={register}
                id={'frontPic'}
                errorMessage={errors?.file?.message}
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
