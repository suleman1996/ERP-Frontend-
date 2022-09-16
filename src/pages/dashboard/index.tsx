import { useState } from 'react';
import { useForm } from 'react-hook-form';

import DatePicker from 'new-components/date-picker';
import Button from 'new-components/button';
import Checkbox from 'new-components/checkbox';
import DeleteModal from 'new-components/delete-modal';
import Pagination from 'new-components/pagination';
import Radio from 'new-components/radio';
import SearchSelect from 'new-components/search-select';
import Select from 'new-components/select';
import Table from 'new-components/table';
import Tags from 'new-components/tags';
import TextArea from 'new-components/textarea';
import TextField from 'new-components/textfield';
import TimePicker from 'new-components/time-picker';
import ImageUpload from 'new-components/image-upload';
import ProfileUpload from 'new-components/profile-upload';
import ProfileView from 'new-pages/employee-module/employee-profile/profile-view';

import { rows, columns } from './helper';

import done from 'new-assets/done.svg';
import style from './dashboard.module.scss';

const DashBoard = () => {
  const { control } = useForm();

  const [open, setOpen] = useState(false);

  return (
    <>
      <DatePicker label="Date" name="date" id="1" placeholder="Date" control={control} />
      <div style={{ marginTop: '20px' }}>
        <ImageUpload />
      </div>
      <div style={{ marginTop: '20px' }}>
        <Button text="Done" handleClick={() => setOpen(true)} iconEnd={done} />
      </div>
      <div style={{ marginTop: '20px' }}>
        <Checkbox label="Checkbox" />
      </div>
      <div style={{ marginTop: '20px' }}>
        <ProfileUpload />
      </div>
      <div style={{ marginTop: '20px' }}>
        <Pagination />
      </div>
      <div style={{ marginTop: '20px' }}>
        <Radio label="radio" />
      </div>
      <div style={{ marginTop: '20px' }}></div>
      <div style={{ marginTop: '20px' }}>
        <TimePicker label="Time Picker" />
      </div>
      <div style={{ marginTop: '20px' }}>
        <Select label="Options">
          <option value="">Status</option>
          <>
            {selectOptions &&
              selectOptions.map((ele) => (
                <>
                  <option key={ele.value} value={ele.value}>
                    {ele.description}
                  </option>
                </>
              ))}
          </>
        </Select>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Tags tagsTextArr={tagsArr} />
      </div>
      <div style={{ marginTop: '20px' }}>
        <TextArea label="TextArea" />
      </div>
      <div style={{ marginTop: '20px' }}>
        <TextField label="TextField" />
      </div>
      <div style={{ marginTop: '20px' }}>
        <Table rows={rows} columns={columns} minWidth="1100px" />
      </div>
    </>
  );
};

export default DashBoard;

export const selectOptions = [
  {
    value: 'hr',
    description: 'Hr',
  },
  {
    value: 'employee',
    description: 'Employee',
  },
  {
    value: 'admin',
    description: 'Admin',
  },
];

const tagsArr = ['non-pay-leave', 'Half-leave'];
