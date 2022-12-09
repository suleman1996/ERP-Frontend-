import Selection from 'components/selection'
import { useForm } from 'react-hook-form'

const SelectionSet = () => {
  const { control } = useForm()

  return (
    <div>
      {' '}
      <Selection
        placeholder="Select"
        options={options1}
        name="department"
        control={control}
      />
    </div>
  )
}

export default SelectionSet

export const columns = [
  {
    key: 'name',
    name: 'Name',
    width: '100px',
    alignText: 'center',
  },
  {
    key: 'id',
    name: 'ID',
    width: '100px',
    alignText: 'center',
  },
  {
    key: 'designation',
    name: 'Designation',
    width: '100px',
    alignText: 'center',
  },
  {
    key: 'level',
    name: 'Level',
    width: '100px',
    alignText: 'center',
  },
]

export const rows = [
  {
    name: 'Saad Baig',
    id: '#SPX001',
    designation: 'Team Lead',
    level: <SelectionSet />,
  },
  {
    name: 'Saad Baig',
    id: '#SPX001',
    designation: 'Team Lead',
    level: <SelectionSet />,
  },
  {
    name: 'Saad Baig',
    id: '#SPX001',
    designation: 'Team Lead',
    level: <SelectionSet />,
  },
  {
    name: 'Saad Baig',
    id: '#SPX001',
    designation: 'Team Lead',
    level: <SelectionSet />,
  },
  {
    name: 'Saad Baig',
    id: '#SPX001',
    designation: 'Team Lead',
    level: <SelectionSet />,
  },
]

export const columns1 = [
  {
    key: 'name',
    name: 'Name',
    width: '200px',
    alignText: 'center',
  },

  {
    key: 'designation',
    name: 'Designation',
    width: '200px',
    alignText: 'center',
  },
  {
    key: 'level',
    name: 'Level',
    width: '200px',
    alignText: 'center',
  },
]

export const rows1 = [
  {
    name: <SelectionSet />,
    designation: 'Team Lead',
    level: 'hh',
  },
  {
    name: <SelectionSet />,
    designation: 'Team Lead',
    level: 'hh',
  },
  {
    name: <SelectionSet />,
    designation: 'Team Lead',
    level: 'hh',
  },
  {
    name: <SelectionSet />,
    designation: 'Team Lead',
    level: 'hh',
  },
  {
    name: <SelectionSet />,
    designation: 'Team Lead',
    level: 'hh',
  },
]

export const options = [
  {
    value: 'Department',
    label: 'Department',
  },
  {
    value: 'HR',
    label: 'HR',
  },
]

const options1 = [
  {
    value: 'Department',
    label: 'Department',
  },
  {
    value: 'HR',
    label: 'HR',
  },
]
