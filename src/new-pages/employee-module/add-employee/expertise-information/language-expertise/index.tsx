import { Dispatch, SetStateAction } from 'react';

import Button from 'new-components/button';
import TextField from 'new-components/textfield';
import Table from 'new-components/table';
import ProfileUpload from 'new-components/profile-upload';
import Select from 'new-components/select';
import SkillLevel from 'new-components/skill-level';
import SearchSelect from 'new-components/search-select';

import { columns, selectRates, useLanguage, languageArray } from './helper';

import tick from 'new-assets/tick.svg';
import style from './language.module.scss';

interface Props {
  formData: any;
  setFormData: any;
  employeeId: string;
  setLanguage: Dispatch<SetStateAction<Language[] | []>>;
}

export interface Language {
  skills?: string;
  language?: string;
  rate?: string;
  year?: number;
  letter?: string;
  file: string;
}

const LanguageExpertise = ({ formData, setFormData, employeeId, setLanguage }: Props) => {
  const {
    handleSubmit,
    register,
    errors,
    educations,
    handleAddEduction,
    control,
    handleEducation,
    activeEdit,
    handleDeleteIndex,
    toggle,
    setToggle,
    watch,
    selectedFileName,
    setSelectedFileName,
  } = useLanguage({
    formData,
    setFormData,
    employeeId,
    setLanguage,
  });

  return (
    <>
      <form onSubmit={handleSubmit(handleAddEduction)}>
        <div className={style.grid}>
          <SearchSelect
            name={'language'}
            star={' *'}
            register={register}
            control={control}
            value={watch('language')}
            errorMessage={errors?.language?.message}
            options={languageArray}
            label="Language"
          />
          <TextField
            name="experince"
            label="Experince"
            star={' *'}
            register={register}
            errorMessage={errors?.experince?.message}
            placeholder="Experince"
          />
          <TextField
            name="year"
            label="Year"
            max={'9999'}
            type="number"
            star={' *'}
            register={register}
            errorMessage={errors?.year?.message}
            placeholder="Year"
          />

          <div>
            <label className={style.label}>Attach File</label>
            <ProfileUpload
              name={'file'}
              register={register}
              selectedFileName={selectedFileName}
              setSelectedFileName={setSelectedFileName}
              id={'letter'}
              errorMessage={errors?.file?.message}
              type={'application/pdf'}
            />
          </div>
        </div>
        <SkillLevel
          errors={errors?.skills?.message}
          control={control}
          star={' *'}
          name="skills"
          activeEdit={activeEdit}
          setToggle={setToggle}
          toggle={toggle}
        />
        <div className={style.btnContainer}>
          <p></p>
          <Button type="submit" text="Add" iconEnd={tick} />
        </div>
        <div style={{ marginTop: '30px' }}>
          <Table
            rows={educations.map((education) => ({
              ...education,
              experince: `${education.experince} year`,
            }))}
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

export default LanguageExpertise;

const skills = ['Novice', 'Intermediate', 'Proficient', 'Expert'];
