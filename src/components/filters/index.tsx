import style from './filter.module.scss'

import sortLower from 'assets/sort-lower.svg'
import sortUpper from 'assets/sort-uppar.svg'
import clearFilter from 'assets/clear-filter.png'
import search from 'assets/search-icon.svg'

import TextField from 'components/textfield'
import Checkbox from 'components/checkbox'
import Button from 'components/button'

const FiltersComponent = () => {
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
        <TextField
          placeholder="Search"
          iconClass={style.iconSearch}
          icon={search}
        />
      </div>
      <div className={style.checkDiv}>
        <Checkbox label="Select All" containerClass={style.checkbox} />
        {names?.map((ele, index) => (
          <div className={style.checkArr} key={index}>
            <Checkbox label={ele} containerClass={style.checkbox} />
          </div>
        ))}
      </div>
      <div className={style.btnDiv}>
        <Button text="Cancel" btnClass={style.btn} />
        <Button text="Apply" />
      </div>
    </div>
  )
}

export default FiltersComponent

const names = [
  'Micheal Dam',
  'Micheal Dam',
  'Micheal Dam',
  'Micheal Dam',
  'Micheal Dam',
  'Micheal Dam',
  'Micheal Dam',
  'Micheal Dam',
]
