import { useState } from 'react'

import Checkbox from 'components/checkbox'
import Button from 'components/button'
import Tags from 'components/tags'
import TimePicker from 'components/time-picker'
import { Colors } from 'pages/attendance/columns-data'
import Table from 'components/table'

import style from './get-attendance.module.scss'

interface Props {
  handleSave?: () => void
  handleFilter?: () => void
}

const AttendanceCard = ({ handleSave }: Props) => {
  const [checkmark, setCheckMark] = useState([])

  const handleCheckboxChange = (index: number) => {
    setCheckMark((prevState: any) =>
      prevState?.includes(index)
        ? prevState?.filter((e: any) => e !== index)
        : prevState
        ? [...prevState, index]
        : [index]
    )
  }

  return (
    <div className={style.wraper}>
      <div style={{ paddingBottom: '60px' }}>
        <Table
          columns={columns}
          rows={data.map((row, index) => ({
            ...row,
            check: (
              <div>
                <Checkbox
                  checked={checkmark?.includes(index)}
                  handleChange={() => handleCheckboxChange(index)}
                />
              </div>
            ),
            status: (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    borderRadius: 10,
                    background: Colors[row.status],
                    borderWidth: 1,
                    height: 10,
                    width: 10,
                    marginRight: 10,
                  }}
                />
                <span
                  style={{ color: Colors[row.status] }}
                  className={style.statusText}
                >
                  {row.status}
                </span>
              </div>
            ),
            checkIn: (
              <div>
                <TimePicker />
              </div>
            ),
            checkout: (
              <div>
                <TimePicker />
              </div>
            ),
            tags: (
              <Tags text={row.tags} boxColor="#7DA560" textColor="#E2E2EA" />
            ),
          }))}
          minWidth="450px"
          headingText={style.columnText}
        />
      </div>

      <div className={style.save}>
        <Button text="Save" handleClick={handleSave} />
      </div>
    </div>
  )
}

const columns = [
  {
    name: <Checkbox />,
    key: 'check',
    width: '100px',
  },
  { name: 'ID', key: 'id', width: '50px', alignText: 'center' },
  { name: 'Name', key: 'name', width: '50px', alignText: 'center' },
  {
    name: 'Designation',
    key: 'designation',
    width: '50px',
    alignText: 'center',
  },
  { name: 'Check in', key: 'checkIn', width: '50px', alignText: 'center' },
  { name: 'Checkout', key: 'checkout', width: '50px', alignText: 'center' },
  { name: 'Status', key: 'status', width: '50px' },
  { name: 'Tags', key: 'tags', width: '50px', alignText: 'center' },
]
export default AttendanceCard

const data = [
  {
    id: 'SPX001',
    name: 'Saad',
    designation: 'Director',
    checkIn: '10:00 AM',
    checkout: '07:00 PM',
    status: 'Present',
    tags: 'On Time',
  },
  {
    id: 'SPX001',
    name: 'Saad',
    designation: 'Director',
    checkIn: '10:00 AM',
    checkout: '07:00 PM',
    status: 'Present',
    tags: 'On Time',
  },
  {
    id: 'SPX001',
    name: 'Saad',
    designation: 'Director',
    checkIn: '10:00 AM',
    checkout: '07:00 PM',
    status: 'Present',
    tags: 'On Time',
  },
  {
    id: 'SPX001',
    name: 'Saad',
    designation: 'Director',
    checkIn: '10:00 AM',
    checkout: '07:00 PM',
    status: 'Present',
    tags: 'On Time',
  },
  {
    id: 'SPX001',
    name: 'Saad',
    designation: 'Director',
    checkIn: '10:00 AM',
    checkout: '07:00 PM',
    status: 'Present',
    tags: 'On Time',
  },
]
