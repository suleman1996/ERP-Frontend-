import CardContainer from 'new-components/card-container';
import Table from 'new-components/table';
import Button from 'new-components/button';

import { rows, columns, rows1, columns1, rows2, columns2 } from './helper';

import printIcon from 'new-assets/print.svg';
import style from './attendance.module.scss';

const Attendance = () => {
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
        <Button text="Print File" iconEnd={printIcon} />
      </div>
    </>
  );
};

export default Attendance;
