import { useEffect, useState } from 'react';

import profileUploadIcon from 'new-assets/profileUploadImg.svg';
import style from './profile-upload.module.scss';

interface Props {
  id?: string;
  type?: string;
  name?: string;
  defaultFileName?: any;
  setFileName?: (value: string) => any;
  register?: any;
  errorMessage?: string;
}

const ProfileUpload = ({
  name,
  errorMessage,
  register,
  id,
  type,
  defaultFileName,
  setFileName,
}: Props) => {
  const [selectedFileName, setSelectedFileName] = useState(defaultFileName || '');

  useEffect(() => {
    selectedFileName && setFileName && setFileName(selectedFileName);
  }, [selectedFileName]);

  useEffect(() => {
    setSelectedFileName(defaultFileName);
  }, [defaultFileName]);

  return (
    <div>
      <div
        className={style.wraper}
        style={{ border: errorMessage ? '1.2px solid #ff5050' : ' 1.2px solid #e2e2ea' }}
      >
        <input
          type={'file'}
          name={name}
          onChange={(e) => setSelectedFileName(e.target.value.split('').splice(12, 100).join(''))}
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
