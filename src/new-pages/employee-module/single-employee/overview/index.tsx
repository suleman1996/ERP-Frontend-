import moment from 'moment';

import CardContainer from 'new-components/card-container';
import Table from 'new-components/table';

import { columns } from './helper';
import EmployeeService from 'services/employee-service';

import over from 'new-assets/overview.svg';
import style from './overview.module.scss';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

const Overview = ({ user }: any) => {
  console.log('user', user);
  const [copy, setCopy] = useState('');
  const overviewDetails = [
    {
      title: 'Employee ID:',
      subtitle: user?.employeeId,
      img: over,
    },
    {
      title: 'Name:',
      subtitle: user?.fullName,
      img: over,
    },
    {
      title: 'Email:',
      subtitle: user?.email,
    },
    {
      title: 'Date of birth:',
      subtitle: `${moment(user?.dob).format('Do MMMM YYYY')}`,
    },
    {
      title: 'Gender:',
      subtitle: user?.gender[0]?.gender?.name,
    },
    {
      title: 'Phone No:',
      subtitle: `+${user?.phone}`,
    },
    {
      title: 'Current Address:',
      subtitle: user?.addresses?.currentAddress?.address,
    },
    {
      title: 'Permanent Address:',
      subtitle: user?.addresses?.permanentAddress?.address,
    },
  ];

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
                  {ele.img && (
                    <img
                      src={ele.img}
                      alt=""
                      onClick={() => {
                        ele.title.includes('Employee ')
                          ? navigator.clipboard.writeText(user?.employeeId)
                          : navigator.clipboard.writeText(user?.fullName);
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </CardContainer>
        </div>
      </CardContainer>
      <CardContainer className={style.card}>
        <Table
          rows={
            user?.education.length > 0 &&
            user.education.map((education: any, index: any) => ({
              ...education,
              ...(education?.endDate
                ? {
                    endDate: moment(education.endDate).format('Do MMMM YYYY') || '---',
                  }
                : { endDate: 'On Going' }),

              startDate: moment(education.startDate).format('Do MMMM YYYY'),
              no: index + 1,
            }))
          }
          columns={columns}
          minWidth="800px"
        />
      </CardContainer>
      {console.log('user', user?.education)}
    </>
  );
};

export default Overview;
