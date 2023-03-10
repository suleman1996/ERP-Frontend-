import Button from 'components/button'

import style from './request.module.scss'

import TextField from 'components/textfield'
import { useForm } from 'react-hook-form'

import Selection from 'components/selection'
import EmployeeService from 'services/employee-service'
import { useEffect, useState } from 'react'

const RenderPolicySearchView = ({
  policyCategory,
  setSearch,
}: {
  policyCategory: any
  setSearch: any
}) => {
  const [employees, setEmployees] = useState([])

  const { handleSubmit, control, register, reset } = useForm({
    mode: 'all',
  })

  useEffect(() => {
    getEmployees()
  }, [])

  const getEmployees = async () => {
    try {
      const result = await EmployeeService.getOnlyEmployees()
      setEmployees(
        result?.data?.map((item: any) => ({
          value: item?._id,
          label: item?.fullName,
        }))
      )
    } catch (error) {
      console.error(error)
    }
  }

  const handleSearch = async (data: any) => {
    try {
      setSearch({
        nameNumber: data?.nameNumber,
        categoryId: data?.categoryId,
        addedBy: data?.addedBy,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const clearFilter = () => {
    reset({ categoryId: null, nameNumber: '', addedBy: null })
    setSearch({ nameNumber: '', addedBy: '', categoryId: '' })
  }

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(handleSearch)(e)
      }}
      id="SearchPolicy"
    >
      <div className={style.policySearchView} style={{ marginTop: '80px' }}>
        <TextField
          label="Name & Number"
          register={register}
          placeholder="Enter Name & Number"
          name="nameNumber"
        />
        <Selection
          control={control}
          wraperSelect={style.wraperSelect}
          label="Category"
          placeholder="Category"
          options={policyCategory}
          onChange={() => {
            return
          }}
          name="categoryId"
        />
        <Selection
          control={control}
          wraperSelect={style.wraperSelect}
          label="Added By"
          placeholder="Added By"
          options={employees}
          onChange={() => {
            return
          }}
          name="addedBy"
        />
        <div
          style={{
            marginBottom: 7.31,
          }}
        >
          <label
            onClick={() => clearFilter()}
            style={{ color: '#CACACA', cursor: 'pointer' }}
          >
            Clear All
          </label>

          <Button
            form="SearchPolicy"
            text="Search"
            btnClass={style.btnClass}
            type="submit"
          />
        </div>
      </div>
    </form>
  )
}

export default RenderPolicySearchView
