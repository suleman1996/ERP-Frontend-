import Input from 'components/input';
import Select from 'components/select';
import Button from 'components/button';
import Profile from 'components/profile';
import MobileButton from 'components/button/mobile-button';

import { Employee } from 'interfaces/employee';
import { useAddEmployee } from './manage-accounts-helper';

import editIcon from 'assets/edit.svg';
import checkIcon from 'assets/check.svg';
import cross from 'assets/employee-page/Path 306.svg';
import tickIcon from 'assets/mobile-view/tickIcon.svg';
import style from './manage-accounts.module.scss';

interface Props {
  editForm: boolean;
  employees: Employee[];
  getEmployeesData: () => void;
}

const AddEmployee = ({ editForm, employees, getEmployeesData }: Props) => {
  const {
    img,
    errors,
    isLoading,
    employeeIds,
    emailReadOnly,
    setImg,
    navigate,
    register,
    onSubmit,
    handleSubmit,
    setEmailReadOnly,
  } = useAddEmployee({ getEmployeesData });

  return (
    <div className={style.main}>
      <div className={style.imgDiv}>
        <img src={cross} alt="" className={style.img} onClick={() => navigate('/settings')} />
      </div>
      <Profile setImg={setImg} img={img} />
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.grid}>
          <Select
            label="Employee ID"
            name="employeeId"
            options={employeeIds}
            inputRef={register}
            placeHolder="Select Employee Id"
            error={errors?.employeeId}
            errorMessage={errors?.employeeId?.message}
            disabled={editForm ? true : false}
          />
          <Input
            name="email"
            label="Email"
            type="text"
            placeholder="john@gmail.com"
            inputRef={register}
            icon={editForm ? editIcon : ''}
            onClick={() => {
              setEmailReadOnly((prev) => !prev);
            }}
            readOnly={emailReadOnly}
            error={errors?.email}
            errorMessage={errors?.email?.message}
          />
          <Input
            name="password"
            label="New Password"
            type="password"
            placeholder="******"
            inputRef={register}
            error={errors?.password}
            errorMessage={errors?.password?.message}
          />
          <Input
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            placeholder="******"
            inputRef={register}
            error={errors?.confirmPassword}
            errorMessage={errors?.confirmPassword?.message}
          />
          <Select
            name="account"
            label="Account"
            options={options}
            placeHolder="Select Account"
            inputRef={register}
            error={errors?.account}
            errorMessage={errors?.account?.message}
          />
        </div>
        <div className={style.btnDiv}>
          <Button
            type={'submit'}
            text={'Save Changes'}
            icon={checkIcon}
            isLoading={isLoading}
            btnClass={style.button}
          />
        </div>
        <div className={style.mobileBtnDiv}>
          <MobileButton
            mobileIcon={tickIcon}
            btnClass={style.mobileBtn}
            type="submit"
            isLoading={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;

const options = ['Human Resource', 'Admin', 'Employee'];
