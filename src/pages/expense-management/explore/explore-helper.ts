import sortIcon from 'assets/logo1.svg';

export const columns = [
  {
    key: 'category',
    name: 'Category',
    icon: sortIcon,
    alignText: 'left',
    width: '200px',
  },
  {
    key: 'amount',
    name: 'Amount',
    toLocalString: (val: any) => (val !== '-' ? Number(val).toLocaleString() + '.00' : '-'),
    alignText: 'center',
    width: '200px',
  },
  {
    key: 'percentage',
    name: 'Percentage',
    toLocalString: (val: any) => (val !== '-' ? val + '%' : '-'),
    alignText: 'center',
    width: '200px',
  },
];

export const total = [
  {
    category: 'Total',
    price: '37700',
    percentage: '25%',
  },
];

export const rows = [
  {
    category: 'Office Rent',
    price: '37700',
    percentage: '7.1',
  },
  {
    category: 'Office Rent',
    price: '37700',
    percentage: '7.1',
  },
  {
    category: 'Office Rent',
    price: '37700',
    percentage: '7.1',
  },
  {
    category: 'Office Rent',
    price: '37700',
    percentage: '7.1',
  },
  {
    category: 'Office Rent',
    price: '37700',
    percentage: '7.1',
  },
  {
    category: 'Office Rent',
    price: '37700',
    percentage: '7.1',
  },
  {
    category: 'Office Rent',
    price: '37700',
    percentage: '7.1',
  },
  {
    category: 'Office Rent',
    price: '37700',
    percentage: '7.1',
  },
  {
    category: 'Office Rent',
    price: '37700',
    percentage: '7.1',
  },
  {
    category: 'Office Rent',
    price: '37700',
    percentage: '7.1',
  },
  {
    category: 'Office Rent',
    price: '37700',
    percentage: '7.1',
  },
  {
    category: 'Office Rent',
    price: '37700',
    percentage: '7.1',
  },
  {
    category: 'Office Rent',
    price: '37700',
    percentage: '7.1',
  },
  {
    category: 'Office Rent',
    price: '37700',
    percentage: '7.1',
  },
  {
    category: 'Office Rent',
    price: '37700',
    percentage: '7.1',
  },
  {
    category: 'Office Rent',
    price: '37700',
    percentage: '7.1',
  },
  {
    category: 'Office Rent',
    price: '37700',
    percentage: '7.1',
  },
];

export const options = (getChartSeriesData: any, total: number) => {
  const objOption = {
    legend: {
      show: false,
    },
    chart: {
      type: 'treemap',
      toolbar: {
        show: false,
      },
      events: {
        dataPointSelection: function (event: any, chartContex: any, config: any) {
          getChartSeriesData(config);
        },
      },
    },
    colors: [
      '#3B93A5',
      '#F7B844',
      '#ADD8C7',
      '#EC3C65',
      '#CDD7B6',
      '#C1F666',
      '#D43F97',
      '#1E5D8C',
      '#421243',
      '#7F94B0',
      '#EF6537',
      '#C0ADDB',
    ],
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false,
      },
    },
    tooltip: {
      custom: ({ series, dataPointIndex, w }: any) => {
        return `<div style='display: flex; flex-direction: column; background-color: rgb(255, 255, 255); padding: 10px; width: fit-content; height: auto;'><span>${
          w.globals.categoryLabels[dataPointIndex]
        }: ${series[0][dataPointIndex]}%</span><span>Total: ${Number(
          w?.globals?.initialSeries[0]?.data[dataPointIndex]?.z,
        ).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}</span></div>`;
      },
    },
  };
  return objOption;
};
