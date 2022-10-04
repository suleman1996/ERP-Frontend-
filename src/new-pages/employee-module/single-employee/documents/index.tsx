import CardContainer from 'new-components/card-container';
import Table from 'new-components/table';

import { rows, columns } from './helper';

import style from './document.module.scss';

const Documents = ({ user }: any) => {
  return (
    <>
      <CardContainer className={style.card}>
        <p className={style.p}>All Documents</p>
        <Table rows={rows} columns={columns} minWidth="750px" />
      </CardContainer>
    </>
  );
};

export default Documents;
