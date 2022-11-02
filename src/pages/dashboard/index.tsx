import CustomSelect from 'new-components/custom-select';
import DatePicker from 'new-components/date-picker';
// import MonthYearPicker from 'new-components/range-month-picker';
import { useForm } from 'react-hook-form';

const DashBoard = () => {
  const { control } = useForm();

  return (
    <>
      <DatePicker
        label="Search Date Time Picker"
        name="date"
        showTimeInput={true}
        control={control}
      />
      <CustomSelect name="custom" label="Search Select" />
      {/* <MonthYearPicker label="Month Year Range Picker" control={control} /> */}
    </>
  );
};

export default DashBoard;
