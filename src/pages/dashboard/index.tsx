import { useState } from 'react';
import { useForm } from 'react-hook-form';

import FiltersComponent from 'components/filters';
import ImageUpload from 'components/image-upload';
import FiltersComponentByDate from 'components/filters/filter-for-dates';
import TextField from 'components/textfield';
import Container from 'components/container';
import TextArea from 'components/textarea';
import ProfileUpload from 'components/profile-upload';
import TimePicker from 'components/time-picker';
import Tags from 'components/tags';
import Button from 'components/button';
import Table from 'components/table';

import { rows, columns, recurrenceTypes, languageArray } from './helper';
import Switch from 'components/switch';
import SkillLevel from 'components/skill-level';
import Selection from 'components/selection';
import MonthYearPicker from 'components/range-month-picker';
import DatePicker from 'components/date-picker';
import Radio from 'components/radio';
import ProgressBar from 'components/progress-bar';
import SearchSelect from 'components/search-select';
import Checkbox from 'components/checkbox';
import Pagination from 'components/pagination';
import CountryInput from 'components/country-input';
import CustomTimePicker from 'components/custom-time-picker';

const DashBoard = () => {
  const { control, register, watch } = useForm();
  const [img, setImg] = useState<unknown>('');
  const [open, setOpen] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<any>();
  const [setTags] = useState<any>();
  const [stepBarActive, setStepBarActive] = useState(['Personal']);
  const [active, setActive] = useState<number>(0);
  const [toggle, setToggle] = useState<number>(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState();
  const [page, setPage] = useState(1);

  return (
    <Container>
      <div style={{ marginTop: '10px' }}>
        <Button text="Button" />
      </div>
      <div style={{ marginTop: '10px' }}>
        <TextField label="TextField" register={register} placeholder="TextField" name="textField" />
      </div>
      <div style={{ marginTop: '10px' }}>
        <TextArea label="TextArea" register={register} placeholder="TextArea" name="textArea" />
      </div>
      <div style={{ marginTop: '10px' }}>
        <DatePicker control={control} label="Date Picker" name="datePicker" />
      </div>
      <div style={{ marginTop: '10px' }}>
        <SearchSelect
          name={'searchSelect'}
          control={control}
          value={watch('searchSelectWithicons')}
          options={languageArray}
          label="Custom Search Select "
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <SearchSelect
          name={'searchSelectWithicons'}
          control={control}
          value={watch('searchSelectWithicons')}
          options={languageArray}
          label="Search Select With Icons"
          icons="true"
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Selection
          label="Recurrence"
          options={recurrenceTypes}
          name="recurrence"
          control={control}
          placeholder="Select"
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Checkbox label="Checkbox" name="checkbox" />
      </div>
      <div style={{ marginTop: '10px' }}>
        <MonthYearPicker
          control={control}
          label={'Month Year Picker'}
          name={'financialYearStart'}
          watch={watch}
          max={watch().financialYearEnd}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <ProfileUpload
          label="Upload File"
          register={register}
          name="uploadProfile"
          id="file"
          type="application/pdf,application/vnd.ms-excel"
          selectedFileName={selectedFileName}
          setSelectedFileName={setSelectedFileName}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <TimePicker
          label="Time Picker"
          register={register}
          placeholder="Time Picker"
          name="timePicker"
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Tags text="Red Tag" />
        <div style={{ marginTop: '10px' }}>
          <Tags text="Green Tag" boxColor="#B6E593" textColor="#7DA560" />
        </div>
      </div>
      <div style={{ marginTop: '10px' }}>
        <Radio name="radio" label="Radio" />
      </div>
      <div style={{ marginTop: '10px' }}>
        <ProgressBar value={20} />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Pagination
          setCount={setPageSize}
          count={pageSize}
          totalCount={totalCount}
          setPage={setPage}
          page={page}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <CountryInput
          name={'Country Input'}
          placeholder={'Enter phone number'}
          control={control}
          label="Country Input"
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <CustomTimePicker name={'employmentInfo.workingHours'} control={control} type="text" />
      </div>
      <div style={{ marginTop: '10px' }}>
        <ImageUpload
          name={'profilePicture'}
          label={'Profile Picture'}
          img={img}
          setImg={setImg}
          btnText="Remove Photo"
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <FiltersComponentByDate />
      </div>
      <div style={{ marginTop: '10px' }}>
        <FiltersComponent />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Table columns={columns} rows={rows} minWidth="1100px" />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Switch label="Switch" control={control} title="Active" name="switch" />
      </div>
      <div style={{ marginTop: '10px' }}>
        <SkillLevel name="skillLevel" control={control} toggle={toggle} setToggle={setToggle} />
      </div>
    </Container>
  );
};

export default DashBoard;
