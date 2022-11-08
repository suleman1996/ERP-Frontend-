import style from './accordian.module.scss';

import arrow from 'assets/arrowup.svg';
import { useEffect, useState } from 'react';
import Switch from 'components/switch';
import DeletePopup from 'components/delete-modal';
import Table from 'components/table';
import CardContainer from 'components/card-container';
import Button from 'components/button';

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
}: any) => {
  const [checkAll, setCheckAll] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);

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
                />
                <div className={style.btnDiv}>
                  <Button text="Add New Department" type="submit" btnClass={style.btnClass} />
                </div>
                <DeletePopup open={deletePopUp} setOpen={setDeletePopUp} handleDelete={undefined} />
              </div>
            </CardContainer>
          </>
        ))}
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
