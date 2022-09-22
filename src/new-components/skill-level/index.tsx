import React, { useState } from 'react';
import { useController } from 'react-hook-form';

import style from './skill-level.module.scss';

interface Props {
  errors?: string;
  control?: any;
  name: string;
  activeEdit?: number | string;
  star?: string;
}

const SkillLevel = ({ errors, control, name, activeEdit, star }: Props) => {
  const [toggle, setToggle] = useState<number>();
  const { field } = useController({
    control,
    name,
  });

  return (
    <div className={style.skillLevel}>
      <label className={style.label} style={{ color: errors ? '#ff5050' : '#2d2d32' }}>
        Skill Level
        <b style={{ color: 'red' }}>{star}</b>
      </label>
      <div className={style.innerDiv}>
        {skills.map((ele, index) => (
          <div
            className={
              toggle === index || index === activeEdit ? style.activeBorder : style.borderDiv
            }
            key={index}
            onClick={() => {
              field.onChange(ele);
              setToggle(index);
            }}
          >
            <p>{ele}</p>
          </div>
        ))}
      </div>
      {errors && <span className={style.errorMessage}>{errors}</span>}
    </div>
  );
};

export default SkillLevel;

const skills = ['novice', 'intermediate', 'proficient', 'expert'];
