import Button from 'components/button'
import TextField from 'components/textfield'
import Select from 'components/select'
import Radio from 'components/radio'

import { usePayrollDetail, payrollType, payType, roster } from './helper'

import tick from 'assets/tick.svg'
import arrowLeft from 'assets/backBtn.svg'
import style from './payroll.module.scss'
import { useEmployeeForms } from '../context'

const PayrollInformation = () => {
  const { employeeDocId, handleBack, employeeId }: any = useEmployeeForms()

  const { onSubmit, register, handleSubmit, errors, allowence, btnLoader } =
    usePayrollDetail({
      employeeId,
      employeeDocId,
    })
  return (
    <div className={style.mainForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.grid}>
          <TextField
            name="payrollDetails.basicSalary"
            label="Basic Salary"
            type="number"
            min={'0'}
            star={' *'}
            register={register}
            errorMessage={errors?.payrollDetails?.basicSalary?.message}
            placeholder="Basic Salary"
          />
          <TextField
            name="houseRent"
            min={'0'}
            label="House Rent"
            type="number"
            register={register}
            errorMessage={errors?.payrollDetails?.houseRent?.message}
            placeholder="House Rent"
          />
          {allowence.length > 0 &&
            allowence?.map((data: any, index) => {
              return (
                <div key={index}>
                  <TextField
                    name={data.name}
                    label={`${data.name} Allowence`}
                    min={'0'}
                    type="number"
                    register={register}
                    errorMessage={errors?.data?.name.message}
                    placeholder={data.name}
                  />
                </div>
              )
            })}
          <TextField
            name="bankName"
            label="Bank Name"
            type="text"
            register={register}
            errorMessage={errors?.bankName?.message}
            placeholder="Bank Name"
          />
          <TextField
            name="accountHolderName"
            label="Account Holder Name"
            type="text"
            register={register}
            errorMessage={errors?.accountHolderName?.message}
            placeholder="Account Holder Name"
          />
          <TextField
            name="accountNumber"
            label="Account Number"
            min={'0'}
            type="number"
            register={register}
            errorMessage={errors?.accountNumber?.message}
            placeholder="Account Number"
          />
          <Select
            label="Pay Type"
            name={'payrollDetails.payType'}
            star={' *'}
            errorMessage={errors?.payrollDetails?.payType?.message}
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
            name={'payrollDetails.payRollType'}
            star={' *'}
            errorMessage={errors?.payrollDetails?.payRollType?.message}
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
              <Radio
                name="payrollDetails.overtimeApplicable"
                label="Yes "
                radioValue={'yes'}
                radioRef={register}
              />
              <div className={style.sec}>
                <Radio
                  name="payrollDetails.overtimeApplicable"
                  label="No "
                  radioValue={'no'}
                  radioRef={register}
                />
              </div>
            </div>
            {errors?.payrollDetails?.overtimeApplicable?.message && (
              <p
                style={{ fontSize: '10px', color: 'red', lineHeight: '10px' }}
                className={style.errorMessage}
              >
                {errors?.payrollDetails?.overtimeApplicable?.message}
              </p>
            )}
          </div>
          <Select
            label="Roaster"
            star={' *'}
            name={'payrollDetails.roaster'}
            errorMessage={errors?.payrollDetails?.roaster?.message}
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
          <Button
            text="Done"
            iconEnd={tick}
            type={'submit'}
            isLoading={btnLoader}
          />
        </div>
      </form>
    </div>
  )
}

export default PayrollInformation
