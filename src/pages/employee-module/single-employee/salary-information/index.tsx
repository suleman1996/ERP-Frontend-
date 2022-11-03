import CardContainer from 'components/card-container';
import Table from 'components/table';

import { rows, columns } from './helper';
import EmployeeService from 'services/employee-service';

import style from './salary.module.scss';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

const SalaryInformation = () => {
  const { id } = useParams();
  const [user, setUser] = useState<any>();
  const SalaryInformationDetails = [
    {
      title: 'Basic Salary:',
      subtitle: user?.basicSalary,
    },
    {
      title: 'Bank Name:',
      subtitle: user?.bankName ? user?.bankName : 'Not Available',
    },
    {
      title: 'Account Holder Name:',
      subtitle: user?.accountTitle,
    },
    {
      title: 'Account Number:',
      subtitle: user?.accountNumber,
    },
  ];

  const getSalaryInfo = async () => {
    const res = await EmployeeService.getSalary(id);
    setUser(res?.data);
  };

  useEffect(() => {
    getSalaryInfo();
  }, []);

  return (
    <>
      <CardContainer>
        <div className={style.main}>
          <p className={style.p}>Salary Basics</p>
          <CardContainer>
            {SalaryInformationDetails.map((ele, index) => (
              <div className={style.innerContent} key={index}>
                <div className={style.left}>
                  <p>{ele.title}</p>
                </div>
                <div className={style.right}>
                  <p>{ele.subtitle}</p>
                </div>
              </div>
            ))}
          </CardContainer>
        </div>
      </CardContainer>
      <CardContainer className={style.card}>
        <p className={style.p}>Salary Information</p>
        <Table rows={user?.salarySummary} columns={columns} minWidth="800px" />
      </CardContainer>
    </>
  );
};

export default SalaryInformation;
