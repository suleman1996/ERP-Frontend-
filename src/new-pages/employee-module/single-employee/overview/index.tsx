import CardContainer from 'new-components/card-container';
import Table from 'new-components/table';

import { rows, columns } from './helper';

import over from 'new-assets/overview.svg';
import style from './overview.module.scss';

const Overview = () => {
  return (
    <>
      <CardContainer>
        <div className={style.main}>
          <p className={style.p}>Personal Details</p>
          <CardContainer>
            {overviewDetails.map((ele, index) => (
              <div className={style.innerContent} key={index}>
                <div className={style.left}>
                  <p>{ele.title}</p>
                </div>
                <div className={style.right}>
                  <p>{ele.subtitle}</p>
                  {ele.img && <img src={ele.img} alt="" />}
                </div>
              </div>
            ))}
          </CardContainer>
        </div>
      </CardContainer>
      <CardContainer className={style.card}>
        <Table rows={rows} columns={columns} minWidth="800px" />
      </CardContainer>
    </>
  );
};

export default Overview;

const overviewDetails = [
  {
    title: 'Employee ID:',
    subtitle: 'SPX001',
    img: over,
  },
  {
    title: 'Name:',
    subtitle: 'John Wicked',
    img: over,
  },
  {
    title: 'Email:',
    subtitle: 'johnwicked@gmail.com',
  },
  {
    title: 'Date of birth:',
    subtitle: '02-12-2000',
  },
  {
    title: 'Gender:',
    subtitle: 'Male',
  },
  {
    title: 'Phone No:',
    subtitle: '+92 347 7690346',
  },
  {
    title: 'Current Address:',
    subtitle: 'Wapda Town, House no 98, Lahore',
  },
  {
    title: 'Permanent Address:',
    subtitle: 'Wapda Town, House no 98, Lahore',
  },
];
