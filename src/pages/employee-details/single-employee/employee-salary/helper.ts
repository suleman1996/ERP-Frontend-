import { useEffect, useState } from 'react';
import moment from 'moment';

import sortIcon from 'assets/logo1.svg';

export const useEmployeeSalary = ({ employeeData }: any) => {
  const [tableRow, setTableRow] = useState<any[]>([]);
  const { payrollDetail, salaryData } = employeeData;

  useEffect(() => {
    if (salaryData?.length) {
      const temp = [...salaryData];
      temp.forEach((ele: any) => {
        ele.date = moment(ele.date).format('DD/MM/YYYY');
      });
      setTableRow([...temp]);
    }
  }, [salaryData]);
  return { payrollDetail, tableRow };
};

export const columnsSalary = [
  { key: 'date', name: 'Date', icon: sortIcon },
  { key: 'designation', name: 'Designation', icon: sortIcon },
  { key: 'basic', name: 'Basic', icon: sortIcon },
  { key: 'allowance', name: 'Allowance', icon: sortIcon },
  { key: 'total', name: 'Total', icon: sortIcon },
  { key: 'remark', name: 'Remark', icon: sortIcon },
];
