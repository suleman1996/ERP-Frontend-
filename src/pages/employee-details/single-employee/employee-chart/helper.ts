import { useEffect, useState } from 'react';

export const useEmployeeChart = ({ chartData }: any) => {
  const [donutSeries, setDonutSeries] = useState([0, 0, 0, 0]);
  const [donutOption] = useState<any>(options);

  useEffect(() => {
    if (chartData && Object.keys(chartData)?.length > 0) {
      const { present, absent, holidays, vacations }: any = {
        ...chartData,
      };
      const tempArr = [];
      tempArr.push(
        present?.percentage,
        absent?.percentage,
        holidays?.percentage,
        vacations?.percentage,
      );
      setDonutSeries([...tempArr]);
    }
  }, [chartData]);
  return { donutSeries, donutOption };
};

const options = {
  chart: {
    type: 'donut',
  },
  plotOptions: {
    pie: {
      donut: {
        size: '80%',
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: [2, 2, 2, 2],
  },
  legend: {
    show: false,
  },
  colors: ['#57B993', '#F55E5E', '#ffbd08', '#31A6FF'],
  responsive: [
    {
      breakpoint: 600,
      options: {
        plotOptions: {
          pie: {
            donut: {
              size: '78%',
            },
          },
        },
      },
    },
  ],
};
