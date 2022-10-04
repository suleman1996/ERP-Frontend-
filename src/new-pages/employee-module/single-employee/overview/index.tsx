import moment from 'moment';

import CardContainer from 'new-components/card-container';
import Table from 'new-components/table';

import { columns } from './helper';

import over from 'new-assets/overview.svg';
import style from './overview.module.scss';

const Overview = ({ user }: any) => {
  const overviewDetails = [
    {
      title: 'Employee ID:',
      subtitle: user?.personalInformation?.employeeId,
      img: over,
    },
    {
      title: 'Name:',
      subtitle: `${user?.personalInformation?.firstName} ${user?.personalInformation?.lastName}`,
      img: over,
    },
    {
      title: 'Email:',
      subtitle: `${user?.personalInformation?.email}`,
    },
    {
      title: 'Date of birth:',
      subtitle: `${moment(user?.personalInformation?.dob).format('MM-DD-YYYY')}`,
    },
    {
      title: 'Gender:',
      subtitle: `${user?.personalInformation?.gender}`,
    },
    {
      title: 'Phone No:',
      subtitle: `${user?.personalInformation?.phoneNumber}`,
    },
    {
      title: 'Current Address:',
      subtitle: `${user?.addressInformation?.currentAddress?.address}`,
    },
    {
      title: 'Permanent Address:',
      subtitle: `${user?.addressInformation?.permanentAddress?.address}`,
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
                  {ele.img && <img src={ele.img} alt="" />}
                </div>
              </div>
            ))}
          </CardContainer>
        </div>
      </CardContainer>
      <CardContainer className={style.card}>
        <Table rows={user?.educationDetails} columns={columns} minWidth="800px" />
      </CardContainer>
    </>
  );
};

export default Overview;
