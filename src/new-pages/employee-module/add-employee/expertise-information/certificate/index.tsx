import { Dispatch, SetStateAction } from 'react';

import Button from 'new-components/button';
import TextField from 'new-components/textfield';
import Table from 'new-components/table';
import ProfileUpload from 'new-components/profile-upload';
import Select from 'new-components/select';
import SkillLevel from 'new-components/skill-level';

import { columns, selectRates, useCerificate } from './helper';

import tick from 'new-assets/tick.svg';
import style from './certificate.module.scss';

interface Props {
  formData: any;
  setFormData: any;
  employeeId: string;
  setCertificate: Dispatch<SetStateAction<Certificate[] | []>>;
}

export interface Certificate {
  certificateName?: string;
  skillLevel?: string;
  skills?: string;
  name?: string;
  platform?: string;
  year?: number;
  letter?: string;
  file: string;
}

const Certificate = ({ formData, setFormData, employeeId, setCertificate }: Props) => {
  const {
    handleSubmit,
    register,
    errors,
    educations,
    handleAddEduction,
    handleEducation,
    control,
    activeEdit,
    handleDeleteIndex,
  } = useCerificate({
    formData,
    setFormData,
    employeeId,
    setCertificate,
  });

  return (
    <>
      <form onSubmit={handleSubmit(handleAddEduction)}>
        <div className={style.grid}>
          <TextField
            name="certificateName"
            label="Name"
            type="text"
            register={register}
            errorMessage={errors?.certificateName?.message}
            placeholder="Name"
          />
          <TextField
            label="Platform"
            name="platform"
            type="text"
            register={register}
            errorMessage={errors?.platform?.message}
            placeholder="Platform"
          />
          <TextField
            name="year"
            label="Year"
            register={register}
            errorMessage={errors?.year?.message}
            placeholder="Year"
          />
          <div>
            <label className={style.label}>Attach File</label>
            <ProfileUpload
              name={'file'}
              register={register}
              id={'letter'}
              errorMessage={errors?.file?.message}
              type={'application/pdf'}
            />
          </div>
        </div>
        <SkillLevel
          errors={errors?.skills?.message}
          control={control}
          name="skills"
          activeEdit={activeEdit}
        />
        <div className={style.btnContainer}>
          <p></p>
          <Button type="submit" text="Add" iconEnd={tick} />
        </div>
        <div style={{ marginTop: '30px' }}>
          <Table
            rows={educations}
            columns={columns}
            minWidth="800px"
            handleEducation={handleEducation}
            handleDeleteIndex={handleDeleteIndex}
          />
        </div>
      </form>
    </>
  );
};

export default Certificate;

const skills = ['Novice', 'Intermediate', 'Proficient', 'Expert'];
