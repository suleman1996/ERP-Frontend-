import { useRef } from 'react';
import CardContainer from 'components/card-container';
import Table from 'components/table';
import Button from 'components/button';
import { useReactToPrint } from 'react-to-print';

import { rows, columns, rows1, columns1, rows2, columns2 } from './helper';

import printIcon from 'assets/print.svg';
import style from './attendance.module.scss';

const Attendance = ({ user }: any) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <CardContainer className={style.card}>
        <p className={style.p}>Attendance Summary</p>
        <Table rows={rows} columns={columns} minWidth="750px" />
      </CardContainer>
      <CardContainer className={style.card}>
        <p className={style.p}>Tags Summary</p>
        <Table rows={rows1} columns={columns1} minWidth="850px" />
      </CardContainer>
      <CardContainer className={style.card}>
        <p className={style.p}>Leaves Summary</p>
        <Table rows={rows2} columns={columns2} minWidth="850px" />
      </CardContainer>
      <div className={style.btnContainer}>
        <Button text="Print File" iconEnd={printIcon} handleClick={() => handlePrint()} />
      </div>

      <div hidden>
        <div ref={componentRef}>
          <CardContainer className={style.printPages}>
            <p className={style.printPages}>Attendance Summary</p>
            <Table rows={rows} columns={columns} minWidth="750px" />
          </CardContainer>
          <CardContainer className={style.printPages}>
            <p className={style.p}>Tags Summary</p>
            <Table rows={rows1} columns={columns1} minWidth="850px" />
          </CardContainer>
          <CardContainer className={style.printPages}>
            <p className={style.p}>Leaves Summary</p>
            <Table rows={rows2} columns={columns2} minWidth="850px" />
          </CardContainer>
        </div>
      </div>
    </>
  );
};

export default Attendance;
