import { useEffect, useState } from 'react';
import moment from 'moment';

interface Education {
  degree: string;
  institute: string;
  startDate: string;
  endDate: string;
  percentageCgpa: string;
}

export const useEmployeeOverview = ({ educationDetails }: any) => {
  const [educationData, setEducationData] = useState<Education[] | []>([]);

  const convertAmPm = (t: string) => {
    let time = t;
    let hours = Number(time?.split(':')[0]);
    let min = time?.split(':')[1];
    let AmPm = 'am';
    if (hours > 12) {
      hours = hours - 12;
      AmPm = 'pm';
    } else if (hours === 12) {
      AmPm = 'pm';
    } else if (hours === 0) {
      AmPm = 'am';
    }
    if (AmPm === 'am') {
      time = `${time} AM`;
    } else {
      time = `${hours < 10 ? '0' + hours : hours}:${min} PM`;
    }
    return time;
  };

  useEffect(() => {
    if (educationDetails?.length > 0) {
      const temp = [...educationDetails];
      for (let i = 0; i < temp.length; i++) {
        temp[i]['no'] = i + 1;
        for (const k in temp[i]) {
          if (k === 'startDate' || k === 'endDate' || k === '_id') {
            delete temp[i][k];
          }
        }
      }
      setEducationData([...temp]);
    }
  }, [educationDetails]);

  return { educationData, moment, convertAmPm };
};

export const overviewColumns = [
  { key: 'no', name: 'No' },
  { key: 'degree', name: 'Degree' },
  { key: 'institute', name: 'Institute' },
  { key: 'percentageCgpa', name: 'Percentage/CGPA' },
];
