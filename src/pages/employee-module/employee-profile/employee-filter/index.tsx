import Button from 'components/button'
import TextField from 'components/textfield'
import Selection from 'components/selection'

import { useEmployeeFilter } from './helper'

import style from '../employee-profile.module.scss'

interface Props {
  setOpen?: any
  setEmployees?: any
  open?: any
  getData: any
  control: any
  getEmployeesData: () => void
}

const EmployeeFilter = ({ setOpen, setEmployees, open }: Props) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    departments,
    designation,
    departmentChangeHandler,
    loading,
    control,
  } = useEmployeeFilter({
    setOpen,
    setEmployees,
  })

  return (
    <form
      className={style.card1}
      onSubmit={handleSubmit(onSubmit)}
      style={{
        visibility: open ? 'visible' : 'hidden',
        opacity: open ? '1' : '0',
        height: open ? 'auto' : '0px',
      }}
    >
      <div className={style.flex}>
        <div className={style.grid1}>
          <TextField
            name="name"
            label="Search By All"
            type="text"
            placeholder="Search by All"
            register={register}
          />
          <Selection
            label="Department"
            control={control}
            name="department"
            changeHandler={departmentChangeHandler}
            options={departments?.map((item) => {
              return { label: item?.name, value: item?._id }
            })}
          />
          <Selection
            label="Designation"
            star={' *'}
            control={control}
            name="designation"
            options={designation?.map((item) => {
              return { label: item?.name, value: item?._id }
            })}
          />
          <div className={style.btn}>
            <label className={style.label}>Clear Filter</label>
            <Button text="Search" isLoading={loading} />
          </div>
        </div>
        <div className={style.btn1}>
          <label className={style.label}>Clear Filter</label>
          <Button text="Search" isLoading={loading} />
        </div>
      </div>
    </form>
  )
}

export default EmployeeFilter
