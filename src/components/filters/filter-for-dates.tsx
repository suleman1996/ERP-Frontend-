import style from './filter.module.scss';

import sortLower from 'assets/sort-lower.svg';
import sortUpper from 'assets/sort-uppar.svg';
import clearFilter from 'assets/clear-filter.svg';
import search from 'assets/search-icon.svg';

import TextField from 'components/textfield';
import Checkbox from 'components/checkbox';
import Button from 'components/button';
import { MonthsYearFilter } from './monthsYearFilter';

const FiltersComponentByDate = () => {
  return (
    <div className={style.filterMain}>
      <div className={style.sortingDiv}>
        <p>Sort A To Z</p>
        <img src={sortLower} alt="" />
      </div>
      <div className={style.sortingDiv}>
        <p>Sort Z To A</p>
        <img src={sortUpper} alt="" />
      </div>
      <div className={style.sortingDiv} style={{ borderBottom: 'none' }}>
        <p>Clear Filters</p>
        <img src={clearFilter} alt="" />
      </div>
      <div className={style.input}>
        <TextField placeholder="Search" iconClass={style.iconSearch} icon={search} />
      </div>
      <div className={style.checkDiv}>
        <Checkbox label="Select All" containerClass={style.checkbox} />
        <MonthsYearFilter list={yearArr} />
      </div>
      <div className={style.btnDiv}>
        <Button text="Cancel" btnClass={style.btn} />
        <Button text="Apply" />
      </div>
    </div>
  );
};

export default FiltersComponentByDate;

const yearArr = [
  {
    name: '2022',
    child: [
      {
        name: 'Jan',
        child: [
          {
            name: '29',
          },
          {
            name: '28',
          },
          {
            name: '27',
          },
          {
            name: '26',
          },
          {
            name: '25',
          },
          {
            name: '24',
          },
          {
            name: '23',
          },
          {
            name: '22',
          },
          {
            name: '21',
          },
        ],
      },
      {
        name: 'Feb',
        child: [
          {
            name: '29',
          },
          {
            name: '28',
          },
          {
            name: '27',
          },
          {
            name: '26',
          },
          {
            name: '25',
          },
          {
            name: '24',
          },
          {
            name: '23',
          },
          {
            name: '22',
          },
          {
            name: '21',
          },
        ],
      },
      {
        name: 'Mar',
        child: [
          {
            name: '29',
          },
          {
            name: '28',
          },
          {
            name: '27',
          },
          {
            name: '26',
          },
          {
            name: '25',
          },
          {
            name: '24',
          },
          {
            name: '23',
          },
          {
            name: '22',
          },
          {
            name: '21',
          },
        ],
      },
      {
        name: 'April',
        child: [
          {
            name: '29',
          },
          {
            name: '28',
          },
          {
            name: '27',
          },
          {
            name: '26',
          },
          {
            name: '25',
          },
          {
            name: '24',
          },
          {
            name: '23',
          },
          {
            name: '22',
          },
          {
            name: '21',
          },
        ],
      },
    ],
  },
  {
    name: '2021',
    child: [
      {
        name: 'Jan',
        child: [
          {
            name: '29',
          },
          {
            name: '28',
          },
          {
            name: '27',
          },
          {
            name: '26',
          },
          {
            name: '25',
          },
          {
            name: '24',
          },
          {
            name: '23',
          },
          {
            name: '22',
          },
          {
            name: '21',
          },
        ],
      },
      {
        name: 'Feb',
        child: [
          {
            name: '29',
          },
          {
            name: '28',
          },
          {
            name: '27',
          },
          {
            name: '26',
          },
          {
            name: '25',
          },
          {
            name: '24',
          },
          {
            name: '23',
          },
          {
            name: '22',
          },
          {
            name: '21',
          },
        ],
      },
      {
        name: 'Mar',
        child: [
          {
            name: '29',
          },
          {
            name: '28',
          },
          {
            name: '27',
          },
          {
            name: '26',
          },
          {
            name: '25',
          },
          {
            name: '24',
          },
          {
            name: '23',
          },
          {
            name: '22',
          },
          {
            name: '21',
          },
        ],
      },
      {
        name: 'April',
        child: [
          {
            name: '29',
          },
          {
            name: '28',
          },
          {
            name: '27',
          },
          {
            name: '26',
          },
          {
            name: '25',
          },
          {
            name: '24',
          },
          {
            name: '23',
          },
          {
            name: '22',
          },
          {
            name: '21',
          },
        ],
      },
    ],
  },
];
