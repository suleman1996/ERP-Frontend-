import EmployeeProfileCard from 'my-components/employe-profile-card';

import image from 'assets/img2.svg';
import logo from 'assets/img1.svg';
import logo2 from 'assets/logo10.svg';

export default {
  title: 'EmployeeProfileCard',
  component: EmployeeProfileCard,
  argTypes: {
    handleClick: { action: 'Please Click Me' },
    img: {
      options: [image, logo, logo2],
      control: { type: 'select' },
    },
  },
};

const Template = (args: any) => <EmployeeProfileCard {...args} />;

export const Employeeprofilecard: any = Template.bind({});
Employeeprofilecard.args = {
  img: image,
  name: 'Anya',
  designation: 'modal',
  department: 'fashion',
  phone: '0322-0001010',
  id: '1',
  fontSize: 26,
  designationColor: '',
  desigFont: 20,
  fontSizeForm: 12,
  fontWeightForm: 233,
};
