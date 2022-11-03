import AccordianSwitch from 'new-components/accordian';
import CustomSelect from 'new-components/custom-select';
import DatePicker from 'new-components/date-picker';
// import MonthYearPicker from 'new-components/range-month-picker';
import { useForm } from 'react-hook-form';

const DashBoard = () => {
  const { control } = useForm();

  return (
    <>
      <AccordianSwitch />
    </>
  );
};

export default DashBoard;
