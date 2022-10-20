/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'react-hook-form';

import Container from 'new-components/container';
import Selection from 'my-components/select';
import Input from 'new-components/input';
import DatePicker from 'new-components/date-picker';
import AttendanceCard from 'new-components/get-attendance-card';
import Button from 'new-components/button';

import { departments } from '../columns-data';

import style from './add-attendance.module.scss';

export interface AttendanceInt {}

const AddAttendance = () => {
  const { control } = useForm();

  return (
    <>
      <Container>
        <div className={style.gridView}>
          <Selection options={departments} placeholder="Departments" />
          <Input placeholder="Name" />
          <Input placeholder="Employee ID" />
          <div>
            <DatePicker control={control} name="name" />
          </div>
          <div>
            <Button text="Get Attendance" handleClick={() => undefined} />
          </div>
        </div>

        <AttendanceCard handleSave={() => alert('Save')} />
      </Container>
    </>
  );
};
export default AddAttendance;
