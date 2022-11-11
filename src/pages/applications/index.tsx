import CardContainer from '../../components/card-container';
import style from './applications.module.scss';
import filterIcon from 'assets/filterIcon.svg';
import filterIconDull from 'assets/icons/filter-icon-dull.svg';
import { useState } from 'react';
import ApplicationApproval from './approval';
import Modal from 'components/modal';
import TextField from 'components/textfield';
import Selection from 'components/selection';
import DatePicker from 'components/date-picker';
import ProfileUpload from 'components/profile-upload';
import TextArea from 'components/textarea';
import { useForm } from 'react-hook-form';
import MyLeaves from './my-leaves';

const Applications = () => {
  const [active, setActive] = useState(true);
  const [createApplicationModal, setCreateApplicationModal] = useState(true);
  const { control, register, errors, setError, clearErrors, handleSubmit, reset } = useForm({
    mode: 'all',
  });
  return (
    <>
      <CardContainer className={style.cardContainer}>
        <div className={style.headContainer}>
          <p className={active ? style.active : ''}>My Leaves</p>
          <p>Approvals</p>
          <p>Leave Balance</p>
        </div>
        {/* <ApplicationApproval /> */}
        <MyLeaves />
      </CardContainer>
    </>
  );
};

export default Applications;
