import { useState, useCallback, Dispatch, SetStateAction } from 'react';
import { useDropzone } from 'react-dropzone';

import { convertBase64Image } from 'main-helper';
import { createNotification } from 'common/create-notification';

import profileIcon from 'new-assets/profileIcon.svg';
import camIcon from 'new-assets/camlogo.svg';
import style from './image-upload.module.scss';

interface Props {
  setImg?: Dispatch<SetStateAction<unknown>>;
  img?: unknown;
  name?: string;
  register?: any;
  errorMessage?: string;
}

const ImageUpload = ({ img, setImg, name, register, errorMessage }: Props) => {
  const handleFileChange = async (event: React.ChangeEvent<any>) => {
    if (event?.target?.files?.[0]?.size <= 2048000) {
      const data = await convertBase64Image(event?.target?.files?.[0]);
      setImg && setImg(data);
    } else {
      createNotification('error', 'Error', 'The image maximum size is 2MB');
    }
  };

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImg && setImg(reader.result);
      };

      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
    },
  });

  return (
    <>
      <label>Profile Picture</label>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={style.wraper} data-testid={'wraper'}>
          <div className={style.imgSection}>
            <img
              alt=""
              src={img ? `${img}` : `${profileIcon}`}
              className={`${img ? style.profileImg : ''}   `}
            />
          </div>
          <div className={style.camIcon}>
            <img src={camIcon} alt="" />
          </div>
          <div>
            <p className={style.heading}>
              Drop your file here or <span className={style.selectFile}> Select a file</span>
            </p>
            <p className={style.para}>
              Only <span>JPEG, JPG or PNG</span> Files are allowed upto 3 MB in size
            </p>
          </div>
        </div>
      </div>
      <div className={style.smallImg}>
        <input id={'img'} ref={register} name={name} type={'file'} onChange={handleFileChange} />
      </div>
    </>
  );
};

export default ImageUpload;
