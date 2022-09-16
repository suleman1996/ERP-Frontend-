import CardContainer from 'new-components/card-container';
import Table from 'new-components/table';

import { rows, columns } from './helper';

import style from './salary.module.scss';

const SalaryInformation = () => {
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
        <Table rows={rows} columns={columns} minWidth="800px" />
      </CardContainer>
    </>
  );
};

export default SalaryInformation;

const SalaryInformationDetails = [
  {
    title: 'Basic Salary:',
    subtitle: '234',
  },
  {
    title: 'Bank Name:',
    subtitle: 'John Wicked',
  },
  {
    title: 'Account Holder Name:',
    subtitle: 'johnwicked@gmail.com',
  },
  {
    title: 'Account Number:',
    subtitle: '02-12-2000',
  },
];
