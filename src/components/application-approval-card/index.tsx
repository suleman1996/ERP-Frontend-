import style from './application-approval-card.module.scss';
import image from 'assets/imgs/person.png';
import Button from 'components/button';
interface props {
  className?: string;
}

const ApplicationApprovalCard = ({ className }: props) => {
  return (
    <div className={`${className} ${style.applicationCard}`}>
      <div className={style.headBorder}>
        <p className={style.heading}>Sick Leave Request</p>
        <div>
          <img src={image} alt="" />
          <span>#SPX001 on 09 July, 2020</span>
        </div>
      </div>
      <div className={style.middle}>
        <p>2 Days</p>
        <p className={style.dates}>09 July, 2020 - 09 July, 2020</p>
        <div className={style.progressBar}>
          <div></div>
        </div>
        <p className={style.leaveCount}>10 Sick Leaves Remaining</p>
      </div>
      <div className={style.last}>
        <p className={style.reason}>Reason</p>
        <p className={style.reasonDesc}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit <a href="">view more</a>
        </p>
      </div>
      <div className={style.lineBorder}></div>
      <div className={style.buttonTab}>
        <Button
          text="Approve"
          type="button"
          btnClass={style.approve}
          className={style.approveText}
        />
        <Button text="Reject" type="button" btnClass={style.reject} className={style.rejectText} />
        <Button text="Update" type="button" btnClass={style.update} className={style.updateText} />
      </div>
    </div>
  );
};

export default ApplicationApprovalCard;
