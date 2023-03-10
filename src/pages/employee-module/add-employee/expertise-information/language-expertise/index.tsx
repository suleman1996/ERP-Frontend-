import { Dispatch, SetStateAction } from 'react'

import Button from 'components/button'
import TextField from 'components/textfield'
import Table from 'components/table'
import ProfileUpload from 'components/profile-upload'
import SkillLevel from 'components/skill-level'
import Selection from 'components/selection'

import { columns, useLanguage, languageArray } from './helper'

import tick from 'assets/tick.svg'
import style from './language.module.scss'

interface Props {
  formData: any
  setFormData: any
  employeeId: string
  setLanguage: Dispatch<SetStateAction<Language[] | []>>
}

export interface Language {
  skills?: string
  language?: string
  rate?: string
  year?: number
  letter?: string
  file: string
}

const LanguageExpertise = ({
  formData,
  setFormData,
  employeeId,
  setLanguage,
}: Props) => {
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
  })

  return (
    <>
      <form onSubmit={handleSubmit(handleAddEduction)}>
        <div className={style.grid}>
          <Selection
            name={'language'}
            star={' *'}
            control={control}
            value={watch('language')}
            errorMessage={errors?.language?.message}
            options={languageArray.map((item) => {
              return { label: item, value: item }
            })}
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
              experince: `${education.experince} years`,
            }))}
            columns={columns}
            minWidth="800px"
            handleEducation={handleEducation}
            handleDeleteIndex={handleDeleteIndex}
          />
        </div>
      </form>
    </>
  )
}

export default LanguageExpertise
