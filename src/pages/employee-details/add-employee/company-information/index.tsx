import DatePicker from 'components/date-picker';
import Input from 'components/input';
import Select from 'components/select';
import Button from 'components/button';
import Checkbox from 'components/checkbox';

import style from '../add-employee.module.scss';
import arrowRight from 'assets/employee-page/arrow-right.svg';
import arrowLeft from 'assets/employee-page/arrow-left.svg';
import { useCompanyInfo } from './hepler';

interface Props {
  handleBack?: () => void;
  handleNext?: () => void;
  setFormData: any;
  formData: any;
  employeeId: string;
}

const CompanyInformation = ({
  handleBack,
  handleNext,
  setFormData,
  formData,
  employeeId,
}: Props) => {
  const { isLoading, prob, options, errors, control, register, handleSubmit, onSubmit } =
    useCompanyInfo({ handleNext, setFormData, formData, employeeId });

  return (
    <div className={style.padding}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.companyForm}>
        <div className={style.grid3}>
          <DatePicker
            label="Joining Date "
            star="*"
            name="joiningDate"
            id="3"
            placeholder="Joining Date"
            control={control}
            error={errors?.joiningDate}
          />
          <Select
            label="Department "
            star="*"
            name="department"
            options={options}
            error={errors?.department}
            errorMessage={errors?.department?.message}
            placeHolder="Select Department"
            inputRef={register}
          />
          <Input
            name="designation"
            label="Designation "
            type="text"
            star="*"
            inputRef={register}
            error={errors?.designation}
            errorMessage={errors?.designation?.message}
            placeholder="Designation"
          />
          <Input
            name="annualLeaves"
            label="Annual Leaves "
            type="number"
            star="*"
            inputRef={register}
            error={errors?.annualLeaves}
            errorMessage={errors?.annualLeaves?.message}
            placeholder="Annual Leaves"
          />
          <Input
            name="medicalLeaves"
            label="Medical Leaves "
            type="number"
            star="*"
            inputRef={register}
            error={errors?.medicalLeaves}
            errorMessage={errors?.medicalLeaves?.message}
            placeholder="Medical Leaves"
          />
          <Input
            name="casualLeaves"
            label="Casual Leaves "
            type="number"
            star="*"
            inputRef={register}
            error={errors?.medicalLeaves}
            errorMessage={errors?.casualLeaves?.message}
            placeholder="Casual Leaves"
          />
          <div className={style.note}>
            <label>Note</label>
            <textarea placeholder="Note" name="note" rows={8} ref={register}></textarea>
          </div>
          <Input
            name="loginTime"
            label="Login Time "
            type="time"
            star="*"
            inputRef={register}
            error={errors?.loginTime}
            errorMessage={errors?.loginTime?.message}
            placeholder="Login Time"
          />
          <Input
            name="logoutTime"
            label="Logout Time "
            type="time"
            star="*"
            inputRef={register}
            error={errors?.logoutTime}
            errorMessage={errors?.logoutTime?.message}
            placeholder="Logout Time"
          />
          <div className={style.checkbox}>
            <Checkbox label="Probation " name="probation" inputRef={register} id="probation" />
          </div>
          {prob && (
            <DatePicker
              label="Probation End Date "
              star="*"
              name="probationEndDate"
              id="2"
              placeholder="Probation End Date"
              control={control}
              error={errors?.probationEndDate}
            />
          )}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px',
          }}
        >
          <div className={style.btnContainer}>
            <Button handleClick={handleBack} btnClass={style.button2} icon={arrowLeft} />
            <span>Back</span>
          </div>

          <div className={style.btnContainer}>
            <span>Next</span>
            <Button
              type="submit"
              btnClass={style.button1}
              icon={arrowRight}
              isLoading={isLoading}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CompanyInformation;
