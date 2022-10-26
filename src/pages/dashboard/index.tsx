import CustomSelect from 'components/custom-select';
import DatePicker from 'new-components/date-picker';
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
      <CustomSelect name="custom" />
    </>
  );
};

export default DashBoard;
