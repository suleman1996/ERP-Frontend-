import ApplicationApprovalCard from 'components/application-approval-card';
import style from './approval.module.scss';

const ApplicationApproval = () => {
  return (
    <div className={style.container}>
      <div className={style.cardsWrapper}>
        <ApplicationApprovalCard />
        <ApplicationApprovalCard />
        <ApplicationApprovalCard />
        <ApplicationApprovalCard />
        <ApplicationApprovalCard />
        <ApplicationApprovalCard />
        <ApplicationApprovalCard />
        <ApplicationApprovalCard />
        <ApplicationApprovalCard />
        <ApplicationApprovalCard />
        <ApplicationApprovalCard />
        <ApplicationApprovalCard />
        <ApplicationApprovalCard />
        <ApplicationApprovalCard />
        <ApplicationApprovalCard />
        <ApplicationApprovalCard />
        <ApplicationApprovalCard />
      </div>
    </div>
  );
};

export default ApplicationApproval;
