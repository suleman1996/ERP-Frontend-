import { Dispatch, SetStateAction } from "react";

import Button from "new-components/button";
import TextField from "new-components/textfield";
import Table from "new-components/table";
import ProfileUpload from "new-components/profile-upload";
import Select from "new-components/select";
import SkillLevel from "new-components/skill-level";
import SearchSelect from "new-components/search-select";

import { columns, selectRates, useLanguage, languageArray } from "./helper";

import tick from "new-assets/tick.svg";
import style from "./language.module.scss";

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
            name={"language"}
            register={register}
            control={control}
            errorMessage={errors?.language?.message}
            options={languageArray}
            label="Language"
          />
          <Select label="Rate" register={register} errorMessage={errors?.rate?.message} name="rate">
            <option value="">50 Percent</option>
            <>
              {selectRates &&
                selectRates.map((ele: any) => (
                  <option key={ele.value} value={ele.value}>
                    {ele.description}
                  </option>
                ))}
            </>
          </Select>
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
              name={"file"}
              register={register}
              id={"letter"}
              errorMessage={errors?.file?.message}
              type={"application/pdf"}
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
        <div style={{ marginTop: "30px" }}>
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

export default LanguageExpertise;

const skills = ["Novice", "Intermediate", "Proficient", "Expert"];
