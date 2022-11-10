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
  handleEdit,
  btnText,
}: any) => {
  const [checkAll, setCheckAll] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [departmentModal, setDepartmentModal] = useState(false);
  const [designationModal, setDesignationModal] = useState(false);
  const [idSeriesModal, setIdSeriesModal] = useState(false);
  const [advanceTagModal, setAdvanceTagModal] = useState(false);
  const [leaveTypeModal, setLeaveTypeModal] = useState(false);

  const handleClickBtn = () => {
    if (title === 'Department') {
      setDepartmentModal(true);
    } else if (title === 'Designation') {
      setDesignationModal(true);
    } else if (title === 'Employee ID Series') {
      setIdSeriesModal(true);
    } else if ((title = 'Advance Tags')) {
      setAdvanceTagModal(true);
    } else if (title === 'Leave Type') {
      setLeaveTypeModal(true);
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
          {title}
          {switchBtn && (
            <Switch
              switchContainer={style.switchContainer}
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
                  columns={ColumnsData}
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
                        <Switch title={'Active'} />
                      </div>
                    ),
                  }))}
                  minWidth="700px"
                  headingText={style.columnText}
                  handleDelete={(id) => console.log(id)}
                  handleModalOpen={() => setDeletePopUp(true)}
                  handleEdit={handleEdit && handleEdit}
                />
                <div className={style.btnDiv}>
                  <Button text={btnText} btnClass={style.btnClass} handleClick={handleClickBtn} />
                </div>
                <DeletePopup open={deletePopUp} setOpen={setDeletePopUp} handleDelete={undefined} />
              </div>
            </CardContainer>
          </>
        ))}

      {/* //////////////////  Department  /////////////////// */}

      <Modal
        open={departmentModal}
        handleClose={() => setDepartmentModal(false)}
        title={'Add New Department'}
      >
        <div className={style.modalContainer}>
          <Input
            label="Department Name"
            placeholder="Enter Department Name"
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
          <Button text="Add Department" />
        </div>
      </Modal>

      {/* ////////////// Designation  //////////////// */}

      <Modal
        open={designationModal}
        handleClose={() => setDesignationModal(false)}
        title={'Add New Designation'}
      >
        <div className={style.modalContainer}>
          <Input
            label="Department Name"
            placeholder="Enter Department Name"
            containerClass={style.containerClass}
          />
          <Select
            label="Designation Name"
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
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
          <Button text="Add Designation" />
        </div>
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

      {/* //////////////////  Department  /////////////////// */}

      <Modal
        open={leaveTypeModal}
        handleClose={() => setLeaveTypeModal(false)}
        title={'Add New Department'}
      >
        <div className={style.modalContainer}>
          <Input
            label="Department Name"
            placeholder="Enter Department Name"
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
          <Button text="Add Department" />
        </div>
      </Modal>
    </>
  );
};

const Comp = ({ name, checkAll }: any) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(checkAll);
  }, [checkAll]);

  return (
    <div className={style.body}>
      <div className={style.bodySwitch}>
        <span>{name}</span>
        <Switch checked={checked} onChange={(e) => setChecked(e.target.checked)} />
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
