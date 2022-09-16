import { useEffect, useState } from 'react';
import moment from 'moment';

export const useAttendance = ({ attendanceData }: any) => {
  const [tableRow, setTableRow] = useState<any>([]);

  useEffect(() => {
    if (attendanceData?.length) {
      const temp = [...attendanceData];
      temp.forEach((ele: any) => {
        ele.date = moment(ele.date).format('DD/MM/YYYY');
      });
      setTableRow([...temp]);
    }
  }, [attendanceData]);

  return { tableRow };
};

export const columns = [
  { key: 'date', name: 'Date' },
  { key: 'loginTime', name: 'Login Time' },
  { key: 'logoutTime', name: 'Logout Time' },
  { key: 'totalHours', name: 'Total Hours' },
  { key: 'status', name: 'Status' },
];
