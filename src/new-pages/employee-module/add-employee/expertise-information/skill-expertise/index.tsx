import { Dispatch, SetStateAction } from 'react';

import Button from 'new-components/button';
import TextField from 'new-components/textfield';
import Table from 'new-components/table';
import ProfileUpload from 'new-components/profile-upload';
import SkillLevel from 'new-components/skill-level';

import { columns, useSkill } from './helper';

import tick from 'new-assets/tick.svg';
import style from './skill.module.scss';

export interface Skill {
  skillLevel: string;
  skills: string;
  experince: number;
  year?: number;
  letter?: string;
  file: string;
  _id?: string | number;
}

interface Props {
  formData: any;
  setFormData: any;
  employeeId: string;
  setSkillData: Dispatch<SetStateAction<Skill[] | []>>;
  skillData: any;
}

const SkillExpertise = ({ formData, setFormData, employeeId, setSkillData, skillData }: Props) => {
  const {
    handleSubmit,
    register,
    errors,
    educations,
    control,
    handleAddEduction,
    handleEducation,
    activeEdit,
    handleDeleteIndex,
    toggle,
    setToggle,
    selectedFileName,
    setSelectedFileName,
  } = useSkill({
    formData,
    setFormData,
    employeeId,
    setSkillData,
    skillData,
  });

  return (
    <>
      <form onSubmit={handleSubmit(handleAddEduction)}>
        <div className={style.grid}>
          <TextField
            name="skillName"
            label="Skill"
            type="text"
            star={' *'}
            register={register}
            errorMessage={errors?.skillName?.message}
            placeholder="Skill"
          />
          <TextField
            name="experince"
            label="Experience"
            star={' *'}
            max={'9999'}
            type="number"
            register={register}
            errorMessage={errors?.experince?.message}
            placeholder="Experience"
          />
          <TextField
            name="year"
            label="Year"
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

export default SkillExpertise;

const skills = ['Novice', 'Intermediate', 'Proficient', 'Expert'];
