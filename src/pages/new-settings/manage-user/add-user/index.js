import Switch from 'components/switch'
import Select from 'components/select'
import Button from 'components/button'
import Input from 'components/textfield'
import SearchSelect from 'components/select-and-search-select'

import { convertBase64Image } from 'main-helper'
import { AddUserHelper } from './add-user-helper'
import { createNotification } from 'common/create-notification'

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
    setImgBlob,
    errors,
    setBase64,
    btnLoader,
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
              accept="image/png, image/gif, image/jpeg"
              onChange={async (e) => {
                const url = URL.createObjectURL(e.target.files[0])
                const base64 = await convertBase64Image(e.target.files[0])
                console.log('file size ', e.target.files[0].size / 1024 / 1024)
                if (e.target.files[0].size / 1024 / 1024 > 3) {
                  setBase64('')
                  setImgBlob('')
                  createNotification(
                    'error',
                    'Error',
                    'File size shoulde be equal or less than 3mb'
                  )
                } else {
                  setBase64(base64)
                  setImgBlob(url)
                }
              }}
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
              register={register}
              placeholder={'Enter email'}
              containerClass={style.containerClassInput}
            />
            <Select
              label="Role"
              name={'roleId'}
              errorMessage={errors?.roleId?.message}
              register={register}
            >
              <option value="">Select</option>
              <>
                {customRoles &&
                  customRoles?.map((ele) => (
                    <option key={ele.name} value={ele?._id}>
                      {ele.name}
                    </option>
                  ))}
              </>
            </Select>
            <SearchSelect
              name={'employeeId'}
              errorMessage={errors?.employeeId?.message}
              control={control}
              options={allIDs?.map(({ employeeId }) => employeeId)}
              label="ID"
            />
            <div className={style.customLabel}>
              <label>Status</label>
              <div>
                <Switch title={'Active'} name={'status'} control={control} />
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
              setBtnHideShow(false)
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
