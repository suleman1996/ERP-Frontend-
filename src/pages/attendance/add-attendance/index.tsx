/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'react-hook-form';

import Container from 'components/container';
import Selection from 'components/selection';
import Input from 'components/input';
import DatePicker from 'components/date-picker';
import AttendanceCard from 'components/get-attendance-card';
import Button from 'components/button';

import { departments } from '../columns-data';

import style from './add-attendance.module.scss';

export interface AttendanceInt {}

const AddAttendance = () => {
  const { control } = useForm();

  return (
    <>
      <Container>
        <div className={style.gridView}>
          <Selection
            options={departments}
            placeholder="Departments"
            control={control}
            name="departments"
          />
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
