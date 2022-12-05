import { Dispatch, Fragment, SetStateAction, useState } from 'react'

import TextField from 'components/textfield'
import Checkbox from 'components/checkbox'
import Button from 'components/button'

import search from 'assets/search-icon.svg'
import sortLower from 'assets/sort-lower.svg'
import sortUpper from 'assets/sort-uppar.svg'
import clearFilter from 'assets/clear-filter.svg'
import style from './filter.module.scss'

interface FiltersComponentProps {
  onSubmit: (data: string[]) => void
  names: string[]
  setIsFilter?: Dispatch<SetStateAction<number>>
  isFilter?: boolean
}
const FiltersComponent = ({
  onSubmit,
  names,
  setIsFilter,
  isFilter,
}: FiltersComponentProps) => {
  const [asc, setAsc] = useState(true)
  const [value, setValue] = useState('')
  const list = [...new Set([...names])]?.map((name) => ({
    name,
    checked: false,
  }))
  const [selectedFilters, setSelectedFilters] = useState([...list] || [])
  const clearFilters = () => {
    const copy = [...selectedFilters]
    for (let i = 0; i < copy.length; i++) {
      copy[i].checked = false
    }
    setValue('')
    setSelectedFilters(copy)
  }
  const selectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const copy = [...selectedFilters]
    for (let i = 0; i < copy.length; i++) {
      if (copy[i].name.toLowerCase().includes(value.toLowerCase()))
        copy[i].checked = e.target.checked
    }
    setSelectedFilters(copy)
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const copy = [...selectedFilters]
    copy[index].checked = e.target.checked
    setSelectedFilters(copy)
  }
  const applyFilters = () => {
    const data = selectedFilters
      .filter(
        ({ name, checked }) =>
          checked && name.toLowerCase().includes(value.toLowerCase())
      )
      .map(({ name }) => name)

    const newData = { name: [...data], asc }
    onSubmit?.(newData)
  }
  return (
    isFilter && (
      <div className={style.filterMain}>
        <div className={style.sortingDiv} onClick={() => setAsc(true)}>
          <p>Sort A To Z {asc && 'Selected'}</p>
          <img src={sortLower} alt="" />
        </div>
        <div className={style.sortingDiv} onClick={() => setAsc(false)}>
          <p>Sort Z To A {!asc && 'Selected'}</p>
          <img src={sortUpper} alt="" />
        </div>
        <div
          className={style.sortingDiv}
          style={{ borderBottom: 'none' }}
          onClick={clearFilters}
        >
          <p>Clear Filters</p>
          <img src={clearFilter} alt="" />
        </div>
        <div className={style.input}>
          <TextField
            icon={search}
            value={value}
            placeholder="Search"
            iconClass={style.iconSearch}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className={style.checkDiv}>
          <Checkbox
            label="Select All"
            handleChange={selectAll}
            containerClass={style.checkbox}
            checked={selectedFilters.every(({ name, checked }) =>
              name.toLowerCase().includes(value.toLowerCase()) ? checked : true
            )}
          />
          {selectedFilters.map(({ name, checked }, index) => (
            <Fragment key={index}>
              {name.toLowerCase().includes(value.toLowerCase()) && (
                <div className={style.checkArr}>
                  <Checkbox
                    label={name}
                    checked={checked}
                    containerClass={style.checkbox}
                    handleChange={(e) => handleChange(e, index)}
                  />
                </div>
              )}
            </Fragment>
          ))}
        </div>
        <div className={style.btnDiv}>
          <Button
            text="Cancel"
            btnClass={style.btn}
            handleClick={() => setIsFilter(-1)}
          />
          <Button text="Apply" handleClick={applyFilters} />
        </div>
      </div>
    )
  )
}
export default FiltersComponent
