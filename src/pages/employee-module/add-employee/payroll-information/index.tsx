import Button from 'components/button'
import TextField from 'components/textfield'
import Radio from 'components/radio'
import Selection from 'components/selection'

import { usePayrollDetail, payrollType, payType, roster } from './helper'
import { useEmployeeForms } from '../context'

import tick from 'assets/tick.svg'
import confirmGreen from 'assets/icons/confirmGreen.svg'
import Modal from 'components/modal'
import arrowLeft from 'assets/backBtn.svg'
import arrowRight from 'assets/arrowBtnRight.svg'
import style from './payroll.module.scss'
import { useState } from 'react'

const PayrollInformation = () => {
  const { employeeDocId, handleBack, employeeId }: any = useEmployeeForms()
  const [open, setOpen] = useState(false)
  const [openSecondary, setOpenSecondary] = useState(false)

  const {
    onSubmit,
    register,
    handleSubmit,
    errors,
    allowence,
    btnLoader,
    control,
    clearErrors,
  } = usePayrollDetail({
    employeeId,
    employeeDocId,
  })

  return (
    <>
      <div className={style.mainForm}>
        <form
          onSubmit={(e) => {
            clearErrors()
            handleSubmit(onSubmit)(e)
          }}
        >
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
            <Selection
              label="Pay Type"
              name={'payrollDetails.payType'}
              star={' *'}
              errorMessage={errors?.payrollDetails?.payType?.message}
              control={control}
              options={payType.map((item) => {
                return { label: item?.value, value: item?.value }
              })}
            />
            <Selection
              label="Payroll Type"
              name={'payrollDetails.payRollType'}
              star={' *'}
              errorMessage={errors?.payrollDetails?.payRollType?.message}
              control={control}
              options={payrollType.map((item) => {
                return { label: item?.value, value: item?.value }
              })}
            />
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
            <Selection
              label="Roaster"
              star={' *'}
              name={'payrollDetails.roaster'}
              errorMessage={errors?.payrollDetails?.roaster?.message}
              control={control}
              options={roster.map((item) => {
                return { label: item?.value, value: item?.value }
              })}
            />
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
      <Modal
        title="Confirmation"
        open={open}
        iconEnd={undefined}
        handleClose={() => {
          setOpen(false)
        }}
      >
        <div className={style.confirmationWrappr}>
          <div className={style.imgDiv}>
            <img src={confirmGreen} height={80} width={80} />
          </div>
          <p className={style.upperText}>Congratulations!</p>
          <p className={style.lowerText}>
            Employee with this ID “SPX001” has been created.{' '}
          </p>
          <div className={style.btnDiv}>
            <Button text="Back to home" btnClass={style.btn} />
            <Button
              text="Add As User"
              handleClick={() => {
                setOpenSecondary(true)
                setOpen(false)
              }}
            />
          </div>
        </div>
      </Modal>
      <Modal
        title="Add As User"
        open={openSecondary}
        iconEnd={undefined}
        handleClose={() => {
          setOpenSecondary(false)
        }}
      >
        <div className={style.secondaryUpper}>
          <Selection
            label="Role"
            // options={recurrenceTypes}
            name="recurrence"
            control={control}
            placeholder="Select"
            isMulti={true}
          />
        </div>
        <div className={style.secondaryBtnDiv}>
          <Button text="Add" iconEnd={tick} />
        </div>
        <div className={style.secondaryfooterDiv}>
          <p>
            User name and password is sent to the provided email of employee.
          </p>
        </div>
      </Modal>
      <Button
        text="temp"
        iconEnd={arrowRight}
        // type="submit"
        // isLoading={btnLoader}
        handleClick={() => {
          setOpen(true)
        }}
      />
    </>
  )
}

export default PayrollInformation
