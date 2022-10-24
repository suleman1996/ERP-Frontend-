import Card from 'components/card';
import Input from 'components/input';
import Button from 'components/button';
import Select from 'new-components/select';

import { Props, useEmployeeFilter } from './helper';

import style from '../employee.module.scss';
import cross from 'assets/employee-page/Path 307.svg';

const EmployeeFilter = ({ setOpen, setEmployees, open, setCount, getData }: Props) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    cancelHandler,
    departments,
    designation,
    departmentChangeHandler,
  } = useEmployeeFilter({
    setOpen,
    setEmployees,
    setCount,
    getData,
  });

  return (
    <form
      className={style.card1}
      onSubmit={handleSubmit(onSubmit)}
      style={{
        visibility: open ? 'visible' : 'hidden',
        opacity: open ? '1' : '0',
        zIndex: open ? 1 : -1,
        height: open ? 'auto' : '75px',
      }}
    >
      <Card className={style.employeeFilterCard}>
        <div className={style.img1}>
          <img style={{ cursor: 'pointer' }} src={cross} alt="" onClick={() => cancelHandler()} />
        </div>
        <div className={style.grid1}>
          <Input
            name="name"
            label="Search By All"
            containerClass={style.order2}
            inputClass={style.input}
            type="text"
            placeholder="Search by All"
            inputRef={register}
          />
          {/* <Input
            name="employeeId"
            containerClass={style.order2}
            inputClass={style.input}
            type="text"
            placeholder="Search by Employee ID"
            inputRef={register}
          /> */}
          <Select
            label="Department"
            // errorMessage={errors?.departmentId?.message}
            register={register}
            name="department"
            onChange={departmentChangeHandler}
          >
            <option value="">Department</option>
            <>
              {departments &&
                departments.map((data: any) => (
                  <option key={data?._id} value={data._id}>
                    {data.name}
                  </option>
                ))}
            </>
          </Select>

          <Select
            label="Designation"
            star={' *'}
            register={register}
            name="designation"
            // errorMessage={errors?.designationId?.message}
          >
            <option value="">Designation</option>
            <>
              {designation &&
                designation.map((data: any) => (
                  <option key={data?._id} value={data?._id}>
                    {data.name}
                  </option>
                ))}
            </>
          </Select>
          {/* <Select
            name="department"
            selectClass={style.select1}
            className={style.selectContainer}
            placeHolder="Select Department"
            options={options}
            inputRef={register}
          /> */}
          <Button text="Search" btnClass={style.btn} />
        </div>
      </Card>
    </form>
  );
};

export default EmployeeFilter;
