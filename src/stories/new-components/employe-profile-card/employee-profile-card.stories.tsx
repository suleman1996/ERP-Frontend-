import EmployeeProfileCard from 'new-components/employee-profile-card';
import image from 'assets/logo3.png';
// import style from './delete-modal.stories.module.scss';

export default {
  title: 'EmployeeProfileCard',
  component: EmployeeProfileCard,
  argTypes: { handleClick: { action: 'Please Click Me' } },
};

const Template = (args: any) => <EmployeeProfileCard {...args} />;

export const Employeeprofilecard = Template.bind({});
Employeeprofilecard.args = {
  img: image,
  name: 'Anya',
  designation: 'modal',
  department: 'fashion',
  phone: '0322-0001010',
  id: '1',
  mainstyle: {},
};
