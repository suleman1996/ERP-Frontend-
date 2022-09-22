import Button from 'new-components/button';
import TextField from 'new-components/textfield';
import Select from 'new-components/select';
import Radio from 'new-components/radio';

import { selectCountry, schema, usePayrollDetail, payrollType, payType, roster } from './helper';

import tick from 'new-assets/tick.svg';
import arrowLeft from 'new-assets/backBtn.svg';
import style from './payroll.module.scss';

interface Props {
  handleBack: (data?: string) => void;
  employeeId?: string;
}

const PayrollInformation = ({ handleBack, employeeId }: Props) => {
  const { onSubmit, register, handleSubmit, errors, control } = usePayrollDetail({ employeeId });

  return (
    <div className={style.mainForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.grid}>
          <TextField
            name="basicSalary"
            label="Basic Salary"
            type="number"
            star={' *'}
            register={register}
            errorMessage={errors?.basicSalary?.message}
            placeholder="Basic Salary"
          />
          <TextField
            name="houseRent"
            label="House Rent"
            star={' *'}
            type="number"
            register={register}
            errorMessage={errors?.houseRent?.message}
            placeholder="House Rent"
          />
          <TextField
            name="conveyanceAllowance"
            label="Conveyance Allowance"
            star={' *'}
            type="number"
            register={register}
            errorMessage={errors?.conveyanceAllowance?.message}
            placeholder="Conveyance Allowance"
          />
          <TextField
            name="medicalAllowance"
            label="Medical Allowance"
            star={' *'}
            type="number"
            register={register}
            errorMessage={errors?.medicalAllowance?.message}
            placeholder="Medical Allowance"
          />
          <TextField
            name="specialAllowance"
            label="Special Allowance"
            star={' *'}
            type="number"
            register={register}
            errorMessage={errors?.specialAllowance?.message}
            placeholder="Special Allowance"
          />
          <TextField
            name="bankName"
            label="Bank Name"
            star={' *'}
            type="text"
            register={register}
            errorMessage={errors?.bankName?.message}
            placeholder="Bank Name"
          />
          <TextField
            name="accountHolderName"
            label="Account Holder Name"
            star={' *'}
            type="text"
            register={register}
            errorMessage={errors?.accountHolderName?.message}
            placeholder="Account Holder Name"
          />
          <TextField
            name="accountNumber"
            label="Account Number"
            star={' *'}
            type="number"
            register={register}
            errorMessage={errors?.accountNumber?.message}
            placeholder="Account Number"
          />
          <Select
            label="Pay Type"
            name={'paytype'}
            star={' *'}
            errorMessage={errors?.paytype?.message}
            register={register}
          >
            <option value="">Pay Type</option>
            <>
              {payType &&
                payType.map((ele: any) => (
                  <option key={ele.value} value={ele.value}>
                    {ele.description}
                  </option>
                ))}
            </>
          </Select>
          <Select
            label="Payroll Type"
            name={'payrolltype'}
            star={' *'}
            errorMessage={errors?.payrolltype?.message}
            register={register}
          >
            <option value="">Attendance</option>
            <>
              {payrollType &&
                payrollType.map((ele: any) => (
                  <option key={ele.value} value={ele.value}>
                    {ele.description}
                  </option>
                ))}
            </>
          </Select>
          <div className={style.flexClass}>
            <label className={style.label}>
              Overtime Applicable <b style={{ color: 'red' }}>{' *'}</b>{' '}
            </label>
            <div className={style.flexClassInner}>
              <Radio name="yes" label="Yes " radioValue={'yes'} radioRef={register} />
              <div className={style.sec}>
                <Radio name="yes" label="No " radioValue={'no'} radioRef={register} />
              </div>
            </div>
          </div>
          <Select
            label="Roaster"
            name={'roaster'}
            errorMessage={errors?.roaster?.message}
            register={register}
          >
            <option value="">Select</option>
            <>
              {roster &&
                roster.map((ele: any) => (
                  <option key={ele.value} value={ele.value}>
                    {ele.description}
                  </option>
                ))}
            </>
          </Select>
        </div>

        <div className={style.btnContainer}>
          <Button
            text="Back"
            type="button"
            btnClass={style.btn}
            iconStart={arrowLeft}
            handleClick={() => handleBack('Expertise')}
          />
          <Button text="Done" iconEnd={tick} type={'submit'} />
        </div>
      </form>
    </div>
  );
};

export default PayrollInformation;
