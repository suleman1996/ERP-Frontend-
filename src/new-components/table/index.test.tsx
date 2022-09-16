import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Table from '.';

test('initial button component testing', () => {
  render(<Table rows={dataRows} columns={columns} />);

  const deleteIcon = screen.getAllByTestId('delete-element')[0] as HTMLElement;

  expect(deleteIcon).toHaveAttribute('src', 'table-delete.svg');
  expect(deleteIcon).toHaveAttribute('alt', 'deleteIcon');
  expect(deleteIcon).toBeInTheDocument();

  const editIcon = screen.getAllByTestId('edit-element')[0] as HTMLElement;
  expect(editIcon).toHaveAttribute('src', 'table-edit.svg');
  expect(editIcon).toHaveAttribute('alt', 'editIcon');
  expect(editIcon).toBeInTheDocument();
});

export const dataRows = [
  {
    complete: 100,
    designation: 'Backend Developer',
    employeeId: 'SPX001',
    id: '61651687d0cae33002503198',
    image: '/9j/4AAQSkZJRgABAQEA3ADcAAD/2wBDAAMCAgMCAgMDAwMEA',
    name: 'Asad Baig',
    name2: 'Asad Baig || SPX001',
    status: 'Active',
    userName: 'asad123',
  },
  {
    complete: 100,
    designation: 'FrontEnd Developer',
    employeeId: 'SPX002',
    id: '61651687d0cae33002533198',
    image: '/9j/4AAQSkZJRgABAQEA3ADcAAD/2wBDAAMCAgMCAgMDAwMEA',
    name: 'Salman Butt',
    name2: 'Salman Butt || SPX002',
    status: 'Inactive',
    userName: 'salman123',
  },
  {
    complete: 100,
    designation: 'Backend Developer',
    employeeId: 'SPX001',
    id: '61651687d0cae33002503198',
    image: '/9j/4AAQSkZJRgABAQEA3ADcAAD/2wBDAAMCAgMCAgMDAwMEA',
    name: 'Asad Baig',
    name2: 'Asad Baig || SPX001',
    status: 'Active',
    userName: 'asad123',
  },
  {
    complete: 100,
    designation: 'FrontEnd Developer',
    employeeId: 'SPX002',
    id: '61651687d0cae33002533198',
    image: '/9j/4AAQSkZJRgABAQEA3ADcAAD/2wBDAAMCAgMCAgMDAwMEA',
    name: 'Salman Butt',
    name2: 'Salman Butt || SPX002',
    status: 'Inactive',
    userName: 'salman123',
  },
  {
    complete: 100,
    designation: 'Backend Developer',
    employeeId: 'SPX001',
    id: '61651687d0cae33002503198',
    image: '/9j/4AAQSkZJRgABAQEA3ADcAAD/2wBDAAMCAgMCAgMDAwMEA',
    name: 'Asad Baig',
    name2: 'Asad Baig || SPX001',
    status: 'Active',
    userName: 'asad123',
  },
  {
    complete: 100,
    designation: 'FrontEnd Developer',
    employeeId: 'SPX002',
    id: '61651687d0cae33002533198',
    image: '/9j/4AAQSkZJRgABAQEA3ADcAAD/2wBDAAMCAgMCAgMDAwMEA',
    name: 'Salman Butt',
    name2: 'Salman Butt || SPX002',
    status: 'Inactive',
    userName: 'salman123',
  },
];

const columns = [
  { key: 'employeeId', name: 'Employee ID' },
  { key: 'name', name: 'Name' },
  { key: 'designation', name: 'Designation' },
  { key: 'status', name: 'Status' },
  { key: 'actions', name: 'Actions' },
];
