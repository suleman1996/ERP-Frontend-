import { useEffect } from 'react';

import Card from 'components/card';
import Input from 'components/input';
import Button from 'components/button';
import Select from 'components/select';
import TextField from 'components/textfield';

import { Props, useEmployeeFilter } from './helper';

import style from '../employee-profile.module.scss';
import cross from 'assets/employee-page/Path 307.svg';


interface Props {
  setOpen?: any;
  setEmployees?: any;
  open?: any;
  getData: any;
  getEmployeesData: () => void;
}

const EmployeeFilter = ({ setOpen, setEmployees, open, getEmployeesData }: Props) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    cancelHandler,
    departments,
    designation,
    departmentChangeHandler,
    loading,
  } = useEmployeeFilter({
    setOpen,
    setEmployees,
  });

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
          <Select
            label="Department"
            register={register}
            name="department"
            onChange={departmentChangeHandler}
          >
            <option value="">Department</option>
            <>
              {departments &&
                departments.map((data: any, index: any) => (
                  <option key={data?._id} id={data?._id} value={index}>
                    {data.name}
                  </option>
                ))}
            </>
          </Select>

          <Select label="Designation" star={' *'} register={register} name="designation">
            <option value="">Designation</option>
            <>
              {designation &&
                designation.map((data: any) => (
                  <option key={data?._id} value={data?.name}>
                    {data.name}
                  </option>
                ))}
            </>
          </Select>
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
  );
};

export default EmployeeFilter;
