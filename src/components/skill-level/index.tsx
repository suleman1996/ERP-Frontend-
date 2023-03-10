import { useController } from 'react-hook-form'

import style from './skill-level.module.scss'

interface Props {
  errors?: string
  control?: any
  name: string
  activeEdit?: number | string
  star?: string
  setToggle?: any
  toggle?: number
}

const SkillLevel = ({
  errors,
  control,
  name,
  activeEdit,
  star,
  setToggle,
  toggle,
}: Props) => {
  const { field } = useController({
    control,
    name,
  })

  return (
    <div className={style.skillLevel}>
      <label className={style.label}>
        Skill Level
        <b style={{ color: 'red' }}>{star}</b>
      </label>
      <div className={style.innerDiv}>
        {skills.map((ele, index) => (
          <div
            className={
              toggle === index || ele === activeEdit
                ? style.activeBorder
                : style.borderDiv
            }
            key={index}
            onClick={() => {
              field.onChange(ele)
              setToggle(index)
            }}
          >
            <p>{ele}</p>
          </div>
        ))}
      </div>
      {errors && <span className={style.errorMessage}>{errors}</span>}
    </div>
  )
}

export default SkillLevel

const skills = ['novice', 'intermediate', 'proficient', 'expert']
