import Input from 'components/input';
import Button from 'components/button';

import { usePayrollInfo, banksData } from './helper';

import style from '../add-employee.module.scss';
import arrowRight from 'assets/employee-page/arrow-right.svg';
import arrowLeft from 'assets/employee-page/arrow-left.svg';

interface Props {
  handleBack?: () => void;
  setFormData: any;
  formData: any;
  employeeId: string;
}

const PayrollInformation = ({ handleBack, setFormData, formData, employeeId }: Props) => {
  const { isLoading, errors, register, handleSubmit, onSubmit } = usePayrollInfo({
    setFormData,
    formData,
    employeeId,
  });

  return (
    <div className={style.padding}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.companyForm}>
        <div className={style.grid3}>
          <Input
            name="basicSalary"
            label="Basic Salary"
            type="number"
            star="*"
            inputRef={register}
            error={errors?.basicSalary}
            errorMessage={errors?.basicSalary?.message}
            placeholder="Basic Salary"
          />

          <Input
            name="houseRentAllowance"
            label="House Rent Allowance"
            type="text"
            inputRef={register}
            error={errors?.houseRentAllowance}
            errorMessage={errors?.houseRentAllowance?.message}
            placeholder="House Rent Allowance"
          />
          <Input
            name="conveyanceAllowance"
            label="Conveyance Allowance"
            type="text"
            inputRef={register}
            error={errors?.conveyanceAllowance}
            errorMessage={errors?.conveyanceAllowance?.message}
            placeholder="Conveyance Allowance"
          />

          <Input
            name="medicalAllowance"
            label="Medical Allowance"
            type="text"
            inputRef={register}
            error={errors?.medicalAllowance}
            errorMessage={errors?.medicalAllowance?.message}
            placeholder="Medical Allowance"
          />
          <Input
            name="spacialAllowance"
            label="Special Allowance"
            type="text"
            inputRef={register}
            error={errors?.spacialAllowance}
            errorMessage={errors?.spacialAllowance?.message}
            placeholder="Special Allowance"
          />
          <Input
            name="bankName"
            label="Bank Name"
            type="text"
            star="*"
            list="banks"
            inputRef={register}
            error={errors?.bankName}
            errorMessage={errors?.bankName?.message}
            placeholder="Bank Name"
          />
          <datalist id="banks">
            {banksData.map((bankName, index) => {
              return <option className={style.dataListOptions} key={index} value={`${bankName}`} />;
            })}
          </datalist>
          <Input
            name="accountHolderName"
            label="Account Holder Name"
            type="text"
            star="*"
            inputRef={register}
            error={errors?.accountHolderName}
            errorMessage={errors?.accountHolderName?.message}
            placeholder="Account Holder Name"
          />
          <Input
            name="accountNumber"
            label="Account Number"
            type="number"
            star="*"
            inputRef={register}
            error={errors?.accountNumber}
            errorMessage={errors?.accountNumber?.message}
            placeholder="Account Number"
          />
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
            <span>Finish</span>
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

export default PayrollInformation;
