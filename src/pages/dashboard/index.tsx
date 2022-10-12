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
import CustomTimePicker from './../../components/custom-time-picker/index';
import CountryInput from 'components/country-input';

import { rows, columns, selectCountryOptions } from './helper';

import done from 'new-assets/done.svg';
import style from './dashboard.module.scss';
import flagImg from 'new-assets/flag/pakFlag.svg';
import WeekDay from 'new-components/week-day';

const DashBoard = () => {
  const { control, register } = useForm();

  const [open, setOpen] = useState(false);

  return (
    <>
      <h1>dashboard</h1>
    </>
  );
};

export default DashBoard;

export const selectOptions = [
  {
    value: 'SPX',
    description: 'SPX',
  },
  {
    value: 'SPX',
    description: 'YYY',
  },
  {
    value: 'SPX',
    description: 'ZZZ',
  },
];

const tagsArr = ['non-pay-leave', 'Half-leave'];
