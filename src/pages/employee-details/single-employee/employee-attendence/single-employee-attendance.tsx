import { Dispatch, SetStateAction } from 'react';

import Pagination from 'components/pagination';
import NewTable from 'components/table/new-table';

import { useAttendance, columns } from './helper';

import style from '../single-employee.module.scss';

interface Props {
  attendanceData: [];
  setPage: Dispatch<SetStateAction<number>>;
  count: number;
  pageSize: number;
  page: number;
}

const SingleEmployeeAttendance = ({ attendanceData, setPage, count, pageSize, page }: Props) => {
  const { tableRow } = useAttendance({ attendanceData });

  return (
    <>
      <div className={style.attendanceTableDown}>
        <NewTable columns={columns} rows={tableRow} />
      </div>
      {count > pageSize && (
        <Pagination setPage={setPage} count={count} pageSize={pageSize} page={page} />
      )}
    </>
  );
};

export default SingleEmployeeAttendance;
