import ApplicationApprovalCard from 'components/application-approval-card';
import style from './pending-approval.module.scss';

const PendingApproval = () => {
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

export default PendingApproval;
