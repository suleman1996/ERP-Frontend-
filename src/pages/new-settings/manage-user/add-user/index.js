import Switch from 'components/switch'
import Button from 'components/button'
import Input from 'components/textfield'
import Selection from 'components/selection'

import { AddUserHelper } from './add-user-helper'

import cam from 'assets/whiteCam.svg'
import style from './add-user.module.scss'

const AddUser = ({
  setNewUser,
  customRoles,
  allIDs,
  setEditIndex,
  singleUser,
  getAllUsers,
  setBtnHideShow,
}) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    control,
    onSubmit,
    imgBlob,
    errors,
    btnLoader,
    btnToggle,
    setBtnToggle,
    handleChange,
  } = AddUserHelper({
    setNewUser,
    singleUser,
    setEditIndex,
    getAllUsers,
    setBtnHideShow,
  })

  return (
    <>
      <form
        onSubmit={(e) => {
          clearErrors()
          handleSubmit(onSubmit)(e)
        }}
      >
        <div className={style.addParent}>
          <div style={{ margin: '35px 50px 0px 25px' }}>
            <label htmlFor="imgUpload">
              <div className={style.imgParentDiv}>
                <img
                  src={imgBlob ? imgBlob : cam}
                  style={{
                    width: imgBlob ? '100%' : '30%',
                    height: imgBlob ? '100%' : '30%',
                    borderRadius: imgBlob ? '50%' : '0px',
                  }}
                />
              </div>
            </label>
            <input
              id={'imgUpload'}
              type={'file'}
              hidden
              accept="image/*"
              onChange={async (e) => handleChange(e)}
            />
          </div>
          <div className={style.wraper}>
            <Input
              label="Name"
              name={'name'}
              errorMessage={errors?.name?.message}
              register={register}
              placeholder={'Enter user name'}
              containerClass={style.containerClassInput}
            />
            <Input
              label="Email"
              name={'email'}
              errorMessage={errors?.email?.message}
              placeholder={'Enter email'}
              register={register}
              containerClass={style.containerClassInput}
            />
            <Selection
              label="Role"
              name={'roleId'}
              errorMessage={errors?.roleId?.message}
              control={control}
              options={customRoles?.map((item) => {
                return { label: item?.name, value: item?._id }
              })}
            />

            <Selection
              name={'employeeId'}
              errorMessage={errors?.employeeId?.message}
              control={control}
              options={allIDs?.map((item) => {
                return { label: item?.employeeId, value: item?.empoyeeId }
              })}
              label="ID"
              isSearchable
            />
            <div className={style.customLabel}>
              <label>Status</label>
              <div>
                <Switch
                  title={btnToggle ? 'Active' : 'Inactive'}
                  handleClick={(e) => {
                    setBtnToggle(e.target.checked)
                  }}
                  name={'status'}
                  control={control}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={style.btns}>
          <Button
            text="Cancel"
            type="button"
            btnClass={style.cancelBtn}
            className={style.btnText}
            handleClick={() => {
              setNewUser(false)
              setBtnHideShow && setBtnHideShow(false)
              setEditIndex && setEditIndex(-1)
            }}
          />
          <Button
            text="Add"
            type="submit"
            btnClass={style.addBtn}
            isLoading={btnLoader}
          />
        </div>
      </form>
    </>
  )
}

export default AddUser
