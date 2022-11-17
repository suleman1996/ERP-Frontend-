import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import SettingsService from 'services/settings-service';

import style from './accordian.module.scss';

import arrow from 'assets/arrowup.svg';
import { useEffect, useState } from 'react';
import Switch from 'components/switch';
import DeletePopup from 'components/delete-modal';
import Table from 'components/table';
import CardContainer from 'components/card-container';
import Button from 'components/button';
import Tags from 'components/tags';
import Modal from 'components/modal';
import Input from 'components/input';
import Select from 'components/select';
import statusIcon from 'assets/status.svg';

const AccordianSwitch = ({
  title,
  bodyData,
  id,
  openAccordian,
  setOpenAccordian,
  switchBtn,
  ColumnsData,
  RowsData,
  accordianContainer,
  btnText,
  getAllDepartments,
  departmentRows,
  designationRows,
  getAllDesignations,
  titleClass,
}: any) => {
  const [checkAll, setCheckAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [departmentModal, setDepartmentModal] = useState(false);
  const [designationModal, setDesignationModal] = useState(false);
  const [idSeriesModal, setIdSeriesModal] = useState(false);
  const [advanceTagModal, setAdvanceTagModal] = useState(false);
  const [leaveTypeModal, setLeaveTypeModal] = useState(false);
  const [genderModal, setGenderModal] = useState(false);
  const [allowenceTypeModal, setAllowenceTypeModal] = useState(false);
  const [documentModal, setDocumenModal] = useState(false);
  const [depId, setDepId] = useState();

  const { register, handleSubmit, errors, control, reset, watch } = useForm({
    resolver: yupResolver(title === 'Department' ? departmentSchema : designationSchema),
  });

  const handleClickBtn = () => {
    if (title === 'Department') {
      setDepartmentModal(true);
    } else if (title === 'Designation') {
      setDesignationModal(true);
    } else if (title === 'Employee ID Series') {
      setIdSeriesModal(true);
    } else if (title === 'Advance Tags') {
      setAdvanceTagModal(true);
    } else if (title === 'Leave Type') {
      setLeaveTypeModal(true);
    } else if (title === 'Gender') {
      setGenderModal(true);
    } else if (title === 'Allowance Types') {
      setAllowenceTypeModal(true);
    } else if (title === 'Documents Category') {
      setDocumenModal(true);
    }
  };

  const departmentSubmit = async (data: any) => {
    if (depId) {
      setLoading(true);
      const res = await SettingsService.updateDepartment(data, depId);
      if (res.status === 200) {
        setDepartmentModal(false);
        reset({});
        getAllDepartments();
        setLoading(false);
      }
      setLoading(false);
    } else {
      setLoading(true);
      const res = await SettingsService.addDepartment(data);
      if (res.status === 200) {
        setDepartmentModal(false);
        reset({});
        getAllDepartments();
        setLoading(false);
      }
    }
  };

  const handleEdit = (id: string | number) => {
    if (title === 'Department') {
      setDepartmentModal(true);
      setDepId(id);
      reset({ ...departmentRows?.find((item) => item._id === id) });
    } else if (title === 'Designation') {
      setDesignationModal(true);
      setDepId(id);
      let data = designationRows?.find((item) => item._id === id);

      reset({
        ...data,
        departmentId: data?.departmentSettingId?._id,
      });
    }
  };

  const handleDelete = async (id) => {
    if (title === 'Department') {
      setLoading(true);
      const res = await SettingsService.deleteDepartment(depId);
      if (res.status === 200) {
        setDeletePopUp(false);
        getAllDepartments();
        setDeletePopUp(false);
      }
      setDeletePopUp(false);
    } else if (title === 'Designation') {
      const res = await SettingsService.deleteDesignation(depId);
      if (res.status === 200) {
        getAllDesignations();
        setDeletePopUp(false);
      }
    }
  };

  ///////designation////////////

  const designationSubmit = async (data: any) => {
    if (depId) {
      const res = await SettingsService.updateDesignation(data, depId);
      if (res.status === 200) {
        setDesignationModal(false);
        getAllDesignations();
        reset({});
      }
    } else {
      const res = await SettingsService.addDesignation(data);
      if (res.status === 200) {
        setDesignationModal(false);
        getAllDesignations();
        reset({});
      }
    }
  };

  return (
    <>
      <div
        className={`${style.container} ${accordianContainer} `}
        onClick={() => setOpenAccordian((prev) => (prev === id ? -1 : id))}
        style={{ marginTop: !switchBtn && '10px' }}
      >
        <div className={style.switchHeader}>
          <span className={titleClass}>{title}</span>
          {switchBtn && (
            <Switch
              switchContainer={style.switchContainer}
              name={'parent'}
              control={control}
              onChange={() => setCheckAll(!checkAll)}
            />
          )}
        </div>
        <img
          src={arrow}
          style={{ transform: openAccordian && 'rotate(180deg)', transition: 'all 0.5s ease-out' }}
        />
      </div>

      {openAccordian === id &&
        (switchBtn ? (
          bodyData?.map((data: any) => {
            return <Comp name={data?.name} checkAll={checkAll} />;
          })
        ) : (
          <>
            <CardContainer className={style.card}>
              <div style={{ paddingBottom: '60px' }}>
                <Table
                  tableHeaderClass={style.tableHeaderClass}
                  columns={
                    ColumnsData &&
                    ColumnsData?.map((item: any) => ({
                      ...item,
                      name:
                        item.name !== 'Status' ? (
                          item.name
                        ) : (
                          <div>
                            {' '}
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <span style={{ marginRight: '5px' }}>Status</span>
                              <div className={style.tooltip}>
                                <img className={style.tooltip} src={statusIcon} />
                                <span className={style.tooltiptext}>
                                  If you want to hide any option from the dropdowns, you can hide it
                                  by doing Inactive it
                                </span>
                              </div>
                            </div>
                          </div>
                        ),
                    }))
                  }
                  rows={RowsData.map((row) => ({
                    ...row,
                    image: <div className={style.image}></div>,
                    tagCategory: (
                      <Tags text={row?.tagCategory} boxColor={'#FACCCC'} textColor={'#e92424'} />
                    ),
                    status: (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Switch title={'Active'} name={'active'} control={control} />
                      </div>
                    ),
                  }))}
                  headingText={style.headingText}
                  rowText={style.rowText}
                  minWidth="700px"
                  // headingText={style.columnText}
                  handleDelete={(id) => {
                    setDepId(id);
                    setDeletePopUp(true);
                  }}
                  handleEdit={(id) => handleEdit(id)}
                />
                <div className={style.btnDiv}>
                  <Button text={btnText} handleClick={handleClickBtn} />
                </div>
                <DeletePopup
                  open={deletePopUp}
                  setOpen={setDeletePopUp}
                  handleDelete={handleDelete}
                />
              </div>
            </CardContainer>
          </>
        ))}

      {/* //////////////////  Department  /////////////////// */}

      <Modal
        open={departmentModal}
        handleClose={() => {
          setDepartmentModal(false);
          setDepId('');
        }}
        title={'Add New Department'}
      >
        <form onSubmit={handleSubmit(departmentSubmit)}>
          <div className={style.modalContainer}>
            <Input
              name={'name'}
              label="Department Name"
              placeholder="Enter Department Name"
              register={register}
              errorMessage={errors?.name?.message}
              containerClass={style.containerClass}
            />
            <Select
              label="Department Parent"
              name={'employeeId'}
              selectContainer={style.selectContainer}
              wraperSelect={style.wraperSelect}
            >
              <>
                <option value={''}>Select Department Parent</option>
                {series &&
                  series.map((ele: any) => (
                    <>
                      <option key={ele.name} value={ele?.name}>
                        {ele.name}
                      </option>
                    </>
                  ))}
              </>
            </Select>
            <Select
              label="Department Head"
              name={'employeeId'}
              selectContainer={style.selectContainer}
              wraperSelect={style.wraperSelect}
            >
              <>
                <option value={''}>Select Department Head</option>
                {series &&
                  series.map((ele: any) => (
                    <>
                      <option key={ele.name} value={ele?.name}>
                        {ele.name}
                      </option>
                    </>
                  ))}
              </>
            </Select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
            <Button text="Add Department" type="submit" isLoading={loading} />
          </div>
        </form>
      </Modal>

      {/* ////////////// Designation  //////////////// */}

      <Modal
        open={designationModal}
        handleClose={() => {
          setDesignationModal(false);
          setDepId('');
        }}
        title={'Add New Designation'}
      >
        <form onSubmit={handleSubmit(designationSubmit)}>
          <div className={style.modalContainer}>
            <Input
              name={'name'}
              label="Designation Name"
              placeholder="Enter Designation Name"
              containerClass={style.containerClass}
              register={register}
              errorMessage={errors?.name?.message}
            />
            <Select
              label="Department Name"
              name={'departmentId'}
              selectContainer={style.selectContainer}
              wraperSelect={style.wraperSelect}
              register={register}
              errorMessage={errors?.departmentId?.message}
            >
              <>
                <option value={''}>Select Department Parent</option>
                {departmentRows &&
                  departmentRows.map((ele: any) => (
                    <>
                      <option key={ele.name} value={ele?._id}>
                        {ele.name}
                      </option>
                    </>
                  ))}
              </>
            </Select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
            <Button text="Add Designation" />
          </div>
        </form>
      </Modal>

      {/* /////Employee ID Series  ///// */}
      <Modal
        open={idSeriesModal}
        handleClose={() => setIdSeriesModal(false)}
        title={'Add New Department'}
      >
        <div>
          <Input
            label="Employee ID Series"
            placeholder="SPX"
            containerClass={style.containerClass}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
          <Button text="Add Series " />
        </div>
      </Modal>

      {/* ////////////// Advance Tags  //////////////// */}

      <Modal
        open={advanceTagModal}
        handleClose={() => setAdvanceTagModal(false)}
        title={'Add Attendance Tag'}
      >
        <div className={style.modalContainer} style={{ marginBottom: '10px' }}>
          <Input
            label="Tag Name"
            placeholder="Enter Tag Name"
            containerClass={style.containerClass}
          />
          <div>
            <span>Category</span>
            <div style={{ display: 'flex', marginTop: '10px' }}>
              <Button text="Good" btnClass={style.btnClass} className={style.btnText} />
              <Button text="Bad" btnClass={style.btnClassRed} className={style.btnTextRed} />
              <Button
                text="Neutral"
                btnClass={style.btnClassPruple}
                className={style.btnTextpurple}
              />
            </div>
          </div>
        </div>
        <div className={style.fiveGrid}>
          <Select
            label="Designation Name"
            name={'employeeId'}
            selectContainer={style.selectContainer}
            wraperSelect={style.wraperSelect}
          >
            <>
              <option value={''}>Select</option>
              {series &&
                series.map((ele: any) => (
                  <>
                    <option key={ele.name} value={ele?.name}>
                      {ele.name}
                    </option>
                  </>
                ))}
            </>
          </Select>
          <Select
            label="Designation Name"
            name={'employeeId'}
            selectContainer={style.selectContainer}
            wraperSelect={style.wraperSelect}
          >
            <>
              <option value={''}>Select</option>
              {series &&
                series.map((ele: any) => (
                  <>
                    <option key={ele.name} value={ele?.name}>
                      {ele.name}
                    </option>
                  </>
                ))}
            </>
          </Select>
          <Select
            label="Designation Name"
            name={'employeeId'}
            selectContainer={style.selectContainer}
            wraperSelect={style.wraperSelect}
          >
            <>
              <option value={''}>Select</option>
              {series &&
                series.map((ele: any) => (
                  <>
                    <option key={ele.name} value={ele?.name}>
                      {ele.name}
                    </option>
                  </>
                ))}
            </>
          </Select>
          <Select
            label="Designation Name"
            name={'employeeId'}
            selectContainer={style.selectContainer}
            wraperSelect={style.wraperSelect}
          >
            <>
              <option value={''}>Select</option>
              {series &&
                series.map((ele: any) => (
                  <>
                    <option key={ele.name} value={ele?.name}>
                      {ele.name}
                    </option>
                  </>
                ))}
            </>
          </Select>
          <Select
            label="Designation Name"
            name={'employeeId'}
            selectContainer={style.selectContainer}
            wraperSelect={style.wraperSelect}
          >
            <>
              <option value={''}>Select</option>
              {series &&
                series.map((ele: any) => (
                  <>
                    <option key={ele.name} value={ele?.name}>
                      {ele.name}
                    </option>
                  </>
                ))}
            </>
          </Select>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
          <Button text="Add Tag" />
        </div>
      </Modal>

      {/* //////////////////  leave tye  /////////////////// */}

      <Modal
        open={leaveTypeModal}
        handleClose={() => setLeaveTypeModal(false)}
        title={'Add New Leave'}
      >
        <div className={style.modalContainer}>
          <Input
            label="Leave Type"
            placeholder="Enter Leave Type"
            containerClass={style.containerClass}
          />
          <Select
            label="Balance"
            name={'employeeId'}
            selectContainer={style.selectContainer}
            wraperSelect={style.wraperSelect}
          >
            <>
              <option value={''}>Select</option>
              {series &&
                series.map((ele: any) => (
                  <>
                    <option key={ele.name} value={ele?.name}>
                      {ele.name}
                    </option>
                  </>
                ))}
            </>
          </Select>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
          <Button text="Add Leave" />
        </div>
      </Modal>

      {/* ///// Gender  ///// */}
      <Modal open={genderModal} handleClose={() => setGenderModal(false)} title={'Add New Gender'}>
        <div>
          <Input label="Gender" placeholder="Enter gender" containerClass={style.containerClass} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
          <Button text="Add Gender " />
        </div>
      </Modal>

      {/* ///// Allowence Type  ///// */}
      <Modal
        open={allowenceTypeModal}
        handleClose={() => setAllowenceTypeModal(false)}
        title={'Add New Allowance'}
      >
        <div>
          <Input
            label="Allowence"
            placeholder="Enter allowence"
            containerClass={style.containerClass}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
          <Button text="Add Allowence " />
        </div>
      </Modal>

      {/* ///// Document Category  ///// */}
      <Modal
        open={documentModal}
        handleClose={() => setDocumenModal(false)}
        title={'Add New Document'}
      >
        <div>
          <Input
            label="Document"
            placeholder="Enter document"
            containerClass={style.containerClass}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
          <Button text="Add Document " />
        </div>
      </Modal>
    </>
  );
};

const Comp = ({ name, checkAll }: any) => {
  const [checked, setChecked] = useState(false);

  const { control } = useForm();

  useEffect(() => {
    setChecked(checkAll);
  }, [checkAll]);

  return (
    <div className={style.body}>
      <div className={style.bodySwitch}>
        <span>{name}</span>
        <Switch
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          name={'switch'}
          control={control}
        />
      </div>
    </div>
  );
};

export default AccordianSwitch;

const series = [
  { name: 'sdasd', value: 'adad' },
  { name: 'sdasd', value: 'adad' },
  { name: 'sdasd', value: 'adad' },
];

export const departmentSchema = yup.object().shape({
  name: yup.string().required('Department name  is a required field'),
});

export const designationSchema = yup.object().shape({
  name: yup.string().required('Designation name  is a required field'),
  departmentId: yup.string().required('Department name  is a required field'),
});
