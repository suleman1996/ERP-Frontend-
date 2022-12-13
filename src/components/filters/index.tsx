import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react'

import TextField from 'components/textfield'
import Checkbox from 'components/checkbox'
import Button from 'components/button'

import search from 'assets/search-icon.svg'
import sortLower from 'assets/sort-lower.svg'
import sortUpper from 'assets/sort-uppar.svg'
import clearFilter from 'assets/clear-filter.svg'
import style from './filter.module.scss'

interface FiltersComponentProps {
  names: string[]
  selected: string[]
  isFilter?: boolean
  onSubmit: (data: string[]) => void
  setIsFilter?: Dispatch<SetStateAction<number>>
}

const FiltersComponent = ({
  names,
  selected,
  onSubmit,
  isFilter,
  setIsFilter,
}: FiltersComponentProps) => {
  const [asc, setAsc] = useState()
  const [value, setValue] = useState('')
  const list = [...new Set([...names.filter((name) => name)])].map((name) => ({
    name,
    checked: false,
  }))
  const [selectedFilters, setSelectedFilters] = useState([...list] || [])

  useEffect(() => {
    console.log({ names, selected })
    if (names.length === selected.length) return

    const list = [...new Set([...names.filter((name) => name)])].map(
      (name) => ({
        name,
        checked: false,
      })
    )

    for (let i = 0; i < list.length; i++) {
      const { name } = list[i]
      if (selected.includes(name)) list[i].checked = true
    }

    setSelectedFilters(list)
  }, [names, selected])

  const clearFilters = () => {
    setAsc('')
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
        <div
          className={style.sortingDiv}
          onClick={() => setAsc('asc')}
          style={{ backgroundColor: asc === 'asc' ? 'lightgray' : '' }}
        >
          <p>Sort A To Z </p>
          <img src={sortLower} alt="" />
        </div>
        <div
          className={style.sortingDiv}
          onClick={() => setAsc('desc')}
          style={{ backgroundColor: asc === 'desc' ? 'lightgray' : '' }}
        >
          <p>Sort Z To A </p>
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
