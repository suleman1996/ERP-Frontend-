import Button from 'components/button';
import Input from 'components/input';

import cam from 'assets/whiteCam.svg';
import style from './add-user.module.scss';
import Switch from 'components/switch';
import Select from 'components/select';
import { AddUserHelper } from './addUser-helper';

const AddUser = ({ setNewUser }) => {
  const { register, handleSubmit, clearErrors, control, onSubmit, imgBlob, setImgBlob } =
    AddUserHelper();

  return (
    <>
      <form
        onSubmit={(e) => {
          clearErrors();
          handleSubmit(onSubmit)(e);
        }}
      >
        <div className={style.wraper}>
          <div>
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
              onChange={(e) => {
                const url = URL.createObjectURL(e.target.files[0]);
                console.log('e', url);
                setImgBlob(url);
              }}
            />
          </div>
          <Input
            label="Name"
            name={'name'}
            register={register}
            placeholder={'Enter user name'}
            containerClass={style.containerClassInput}
          />
          <Input
            label="Email"
            name={'email'}
            register={register}
            placeholder={'Enter email'}
            containerClass={style.containerClassInput}
          />
          <Select
            label="Role"
            name={'category'}
            //   errorMessage={errors?.category?.message}
            register={register}
          >
            <option value="">Select</option>
            <>
              {categories &&
                categories?.map((ele: any) => (
                  <option key={ele.name} value={ele?.value}>
                    {ele.name}
                  </option>
                ))}
            </>
          </Select>
          <Input
            label="ID"
            name={'id'}
            register={register}
            placeholder={'Enter id'}
            containerClass={style.containerClassInput}
          />
          <div className={style.customLabel}>
            <label>Status</label>
            <div>
              <Switch title={'Active'} name={'switch'} control={control} />
            </div>
          </div>
        </div>

        <div className={style.btns}>
          <Button
            text="Cancel"
            btnClass={style.cancelBtn}
            className={style.btnText}
            handleClick={() => setNewUser(false)}
          />
          <Button
            text="Add"
            type="submit"
            btnClass={style.addBtn}
            handleClick={() => setNewUser(false)}
          />
        </div>
      </form>
    </>
  );
};

export default AddUser;

const categories = [
  { name: 'Local', value: 'Local' },
  { name: 'Expat', value: 'Expat' },
  { name: 'Single Filers', value: 'Single Filers' },
  {
    name: 'Married Individuals filing joint returns',
    value: 'Married Individuals filing joint returns',
  },
  { name: 'For Heads of House Hold', value: 'For Heads of House Hold' },
];
