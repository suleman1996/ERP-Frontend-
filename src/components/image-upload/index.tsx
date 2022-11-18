import { useState, useCallback, Dispatch, SetStateAction } from 'react';
import { useDropzone } from 'react-dropzone';

import { convertBase64Image } from 'main-helper';
import { createNotification } from 'common/create-notification';

import profileIcon from 'assets/profileIcon.svg';
import camIcon from 'assets/camlogo.svg';
import style from './image-upload.module.scss';
import Button from 'components/button';

interface Props {
  setImg?: Dispatch<SetStateAction<unknown>>;
  img?: unknown;
  name?: string;
  register?: any;
  errorMessage?: string;
  label?: string;
  accountSetting?: boolean;
  btnText?: string;
}

const ImageUpload = ({
  img,
  setImg,
  name,
  register,
  errorMessage,
  label,
  accountSetting,
  btnText,
}: Props) => {
  const handleFileChange = async (event: React.ChangeEvent<any>) => {
    if (event?.target?.files?.[0]?.size <= 2048000) {
      const data = await convertBase64Image(event?.target?.files?.[0]);
      setImg && setImg(data);
    } else {
      createNotification('error', 'Error', 'The image maximum size is 2MB');
    }
  };

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    rejectedFiles.forEach((file: any) => {
      file.errors.forEach((err: any) => {
        if (err.code === 'file-too-large') {
          createNotification('error', 'Error', 'The image maximum size should be 3MB');
        }
        if (err.code === 'file-invalid-type') {
          createNotification('error', 'Error', 'Invalid File Type');
        }
      });
    });
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImg && setImg(reader.result);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    maxSize: 3072000,
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg'],
    },
  });

  return (
    <>
      <label>{label}</label>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
      </div>
      <div className={style.wraper} data-testid={'wraper'}>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div className={style.imgSection}>
            <img
              alt=""
              src={img ? `${img}` : `${profileIcon}`}
              className={`${img ? style.profileImg : ''}   `}
            />
            <div className={style.camIcon}>
              <img src={camIcon} alt="" />
            </div>
          </div>
        </div>
        <div style={{ marginLeft: '30px' }}>
          {!accountSetting ? (
            <p className={style.heading}>
              Drop your file here or
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <span className={style.selectFile}> Select a file</span>
              </div>
            </p>
          ) : (
            <p className={style.newText}>File should be smaller than 3MB</p>
          )}

          {!accountSetting ? (
            <p className={style.para}>
              Only <span>JPEG, JPG or PNG</span> Files are allowed upto 3 MB in size
            </p>
          ) : (
            <p className={style.para}>
              Only <span className={style.span1}>JPEG, JPG or PNG</span> Files are allowed upto 3 MB
              in size.It will us recognize you.
            </p>
          )}
          {btnText && <Button text={btnText} />}
        </div>
      </div>
      <div className={style.smallImg}>
        <input id={'img'} ref={register} name={name} type={'file'} onChange={handleFileChange} />
      </div>
    </>
  );
};

export default ImageUpload;
