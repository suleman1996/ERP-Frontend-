import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { addSlabColumns, taxRow } from './tax-helper';
import Modal from 'components/modal';
import MobileButton from 'components/button/mobile-button';

import style from '../tax.module.scss';
import back from 'assets/employee-page/Group 1996.png';
import TaxService from 'services/tax-service';
import tickIcon from 'assets/mobile-view/tickIcon.svg';
import Select from 'new-components/select';
import TextField from 'new-components/textfield';
import Button from 'new-components/button';
import Table from 'new-components/table';

import editIcon from 'new-assets/table-edit.svg';
import deleteIcon from 'new-assets/table-delete.svg';
import DatePicker from 'new-components/date-picker';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  getTaxSlabsData: () => void;
  updateId: string;
}

const AddAttendance = ({ open, setOpen, getTaxSlabsData, updateId }: Props) => {
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState<any>({ check: false, index: null });
  const [slabs, setSlab] = useState<any>([]);
  const [categories, setCategories] = useState();

  const { register, handleSubmit, errors, reset, control } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  const onSubmit = async (data: any) => {
    console.log('data', data);

    if (update.check) {
      let newSlab = [...slabs];
      newSlab[update.index] = { ...newSlab[update.index], ...data };
      setSlab(newSlab);
      setUpdate({ check: false, index: null });
    } else {
      setSlab([...slabs, data]);
    }
    reset({});
  };

  const handleEditSlab = (index: number) => {
    setUpdate({ check: true, index: index });
    const data = slabs?.find((slab: any, ind: number) => {
      return ind === index;
    });

    reset({ ...data });
  };

  const handleDeleteSlab = (index: any) => {
    slabs?.splice(index, 1);
    setSlab([...slabs]);
  };

  const handleSave = async () => {
    const data = {
      financialYearStart: '2022-07-01',
      financialYearEnd: '2023-06-30',
      groupName: 'USA Income Tax On Salary',
      category: 'Local',
      slabs: [
        {
          lower: 0,
          upper: 600000,
          fixTax: 0,
          taxRate: 0,
          lessLimit: 0,
        },
        {
          lower: 600001,
          upper: 1200000,
          fixTax: 0,
          taxRate: 2.5,
          lessLimit: 600000,
        },
        {
          lower: 1200001,
          upper: 2400000,
          fixTax: 15000,
          taxRate: 12.5,
          lessLimit: 1200000,
        },
      ],
    };
    const res = await TaxService.AddTaxSlab(data);
    console.log('res', res);
  };

  const getCatefories = async () => {
    const res = await TaxService.getAllCategories();
    setCategories(res?.data?.policyCategory);
  };

  useEffect(() => {
    getCatefories();
  }, []);

  return (
    <>
      <Modal open={open} className={style.modalWrapper} handleClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.modal}>
            {/* <NavLinks links={[{ title: 'Add Tax-Slab', left: '50px' }]} /> */}
            <h1>Add Tax Group</h1>
            <img
              src={back}
              alt=""
              className={style.img}
              style={{ cursor: 'pointer' }}
              onClick={() => setOpen(false)}
            />
          </div>

          <div className={style.add}>
            <TextField
              name="taxGroupName"
              label="Tax Group Name"
              // type="number"
              placeholder="Tax Group Name"
              register={register}
              errorMessage={errors?.taxGroupName?.message}
            />
            <div className={style.twoGrid}>
              <Select
                label="Category"
                star={' *'}
                name={'category'}
                errorMessage={errors?.category?.message}
                register={register}
              >
                <option value="">Select</option>
                <>
                  {categories &&
                    categories?.map((ele: any) => (
                      <option key={ele.name} value={ele?._id}>
                        {ele.name}
                      </option>
                    ))}
                </>
              </Select>
              <DatePicker
                label="Date of Birth "
                placeholder="MM/DD/YYYY"
                name="dob"
                id="1"
                control={control}
                errorMessage={errors?.dob?.message}
                maxDate={new Date()}
                star={'*'}
                monthYear={true}
              />
            </div>
            <div className={style.fiveGrid}>
              <TextField
                name="lower"
                label="Lower"
                type="number"
                placeholder="Lower"
                register={register}
                errorMessage={errors?.lower?.message}
              />
              <TextField
                name="upper"
                label="Upper"
                type="number"
                placeholder="upper"
                register={register}
                errorMessage={errors?.upper?.message}
              />
              <TextField
                name="fixTax"
                label="Fix Tax"
                type="number"
                placeholder="Fix Tax"
                register={register}
                errorMessage={errors?.fixTax?.message}
              />
              <TextField
                name="taxRate"
                label="Tax Rate"
                type="number"
                placeholder="Tax Rate"
                register={register}
                errorMessage={errors?.taxRate?.message}
              />
              <TextField
                name="lessLimit"
                label="Less Limit"
                type="number"
                placeholder="less limit"
                register={register}
                errorMessage={errors?.lessLimit?.message}
              />
            </div>
          </div>

          <div className={style.webBtnDiv}>
            <Button text={'Add Slab'} btnClass={style.btn} type="submit" />
          </div>

          <div className={style.mobileBtnDiv}>
            <MobileButton
              mobileIcon={tickIcon}
              btnClass={style.mobileBtn}
              type="submit"
              isLoading={loading}
            />
          </div>
        </form>

        <div style={{ padding: '0 10px' }}>
          <Table
            columns={addSlabColumns}
            minWidth={'fit-content !important'}
            rows={
              slabs &&
              slabs.map((item: any, index: number) => {
                return {
                  ...item,
                  sr: index + 1,
                  Actions: (
                    <div style={{ display: 'flex' }}>
                      <div style={{ marginRight: '10px' }}>
                        <img src={editIcon} width={30} onClick={() => handleEditSlab(index)} />
                      </div>
                      <div style={{ marginRight: '10px' }}>
                        <img src={deleteIcon} width={30} onClick={() => handleDeleteSlab(index)} />
                      </div>
                    </div>
                  ),
                };
              })
            }
            // handleDelete={(id: string) => setSingleId(id)}
            minWidth="1280px"
            tableHeight={style.taxSlabTableHeight}
            handleEdit={(id: string) => {
              setOpen(true);
              // setSingleId(id);
            }}
            // handleModalOpen={() => setDeleteModalOpen(true)}
          />
        </div>

        <div className={style.webBtnDiv}>
          <Button
            text={'Save'}
            btnClass={style.btn}
            type="button"
            isLoading={loading}
            handleClick={handleSave}
            disabled={slabs?.length <= 0}
          />
        </div>
      </Modal>
    </>
  );
};

export default AddAttendance;

const schema = yup.object().shape({
  taxGroupName: yup.string().required('Tax group name is required'),
  // .lessThan(yup.ref('upper'), 'Lower must be less than upper amount'),
  financialYear: yup.number().typeError('Financial year is required'),
  fixTax: yup.string().required('Fix Tax is required'),
  category: yup.string().required('Category  is required'),
  lower: yup.string().required('Lower is required'),
  upper: yup.string().required('Upper is required'),
  taxRate: yup
    .number()
    .typeError('Tax Rate is required')
    .max(50, 'Tax Rate must be less than or equal to 50'),
  lessLimit: yup.string().required('Less Limit is required'),
});
