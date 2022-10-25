/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import profileUploadIcon from 'new-assets/profileUploadImg.svg';
import style from './profile-upload.module.scss';
import { convertBase64Image } from 'main-helper';
import { createNotification } from 'common/create-notification';

interface Props {
  id?: string;
  type?: string;
  name?: string;
  defaultFileName?: any;
  setFileName?: (value: string) => any;
  register?: any;
  errorMessage?: string;
  selectedFileName?: any;
  setSelectedFileName?: (value: string) => any;
}

const ProfileUpload = ({
  name,
  errorMessage,
  register,
  id,
  type,
  defaultFileName,
  setFileName,
  selectedFileName,
  setSelectedFileName,
}: Props) => {
  useEffect(() => {
    selectedFileName && setFileName && setFileName(selectedFileName);
  }, [selectedFileName]);

  const checkFileType = (event: any) => {
    var fileInput = document.getElementById(id);

    var filePath = fileInput?.value;

    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.pdf)$/i;

    if (!allowedExtensions.exec(filePath)) {
      alert('Invalid file type');
      fileInput.value = '';
      setSelectedFileName('');
      return false;
    }

    if (event?.target?.files?.[0]?.size <= 2048000) {
    } else {
      createNotification('error', 'Error', 'The image maximum size is 3MB');
      setSelectedFileName('');
    }
  };

  console.log('selectedFileName', selectedFileName);

  return (
    <div>
      <div
        className={style.wraper}
        style={{ border: errorMessage ? '1.2px solid #ff5050' : ' 1.2px solid #e2e2ea' }}
      >
        <input
          type={'file'}
          name={name}
          onChange={(e) => {
            setSelectedFileName &&
              e.target.value &&
              setSelectedFileName(e.target.value.split('').splice(12, 100).join(''));
            checkFileType(e);
          }}
          accept={type ? type : 'image/png '}
          ref={register}
          hidden
          id={id}
          data-testid={id}
        />
        <label htmlFor={id} className={style.labelTag}>
          {selectedFileName ? `${selectedFileName}` : 'Attach Transcript'}
          <img src={profileUploadIcon} alt="" className={style.fileIcon} />
        </label>
      </div>
      {errorMessage && (
        <span style={{ color: ' rgb(255, 80, 80)' }} className={style.errorMessage}>
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default ProfileUpload;
