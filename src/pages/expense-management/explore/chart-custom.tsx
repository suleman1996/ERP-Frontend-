/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import Chart from 'react-apexcharts';
import { options } from './explore-helper';

const ChartCustom = ({ donutSeries, dateRange, setDateRange, total }: any) => {
  const [donutOption, setDonutOption] = useState<any>(options(getChartSeriesData, total));
  function getChartSeriesData(config: any) {
    setDateRange({ ...dateRange, category: config?.dataPointIndex });
  }
  return (
    <div>
      <Chart type="treemap" series={donutSeries} options={donutOption} />
    </div>
  );
};

export default ChartCustom;
