import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import EmployeeService from 'services/employee-service'

export interface Props {
  setOpen?: (value: boolean) => void
  setEmployees?: any
  open?: boolean
  setCount?: (value: number) => void
  getData?: () => void
}

export const useEmployeeFilter = ({
  setOpen,
  setEmployees,
  setCount,
}: Props) => {
  const { register, handleSubmit, watch, control } = useForm({
    resolver: yupResolver(schema),
  })

  const [loading, setLoading] = useState()
  const [departments, setDepartments] = useState<any>()
  const [designation, setDesignation] = useState<any>()

  const departmentChangeHandler = async (e: any) => {
    await getAllDesignations(e)
  }

  const onSubmit = async (data: any) => {
    setLoading(true)
    const filterData = {
      ...data,
      department: data?.department?.label,
      designation: data?.designation?.label,
    }

    const res = await EmployeeService.getAllEmployees(filterData)
    if (res?.status === 200) {
      setEmployees && setEmployees(res?.data?.employees[0]?.data)
      res?.data?.employees.length > 0 &&
        setCount &&
        setCount(res?.data?.employees[0]?.count)
      setLoading(false)
    } else {
      setLoading(false)
    }
  }

  const cancelHandler = () => {
    setOpen && setOpen(false)
  }

  const getAllDepartments = async () => {
    const res = await EmployeeService.getDepartments()
    setDepartments(res?.data?.department)
  }

  const getAllDesignations = async (id: string) => {
    const res = await EmployeeService.getDesignation(id)
    setDesignation(res?.data?.Designation)
  }

  useEffect(() => {
    getAllDepartments()
  }, [])

  return {
    options,
    register,
    handleSubmit,
    onSubmit,
    cancelHandler,
    departments,
    designation,
    departmentChangeHandler,
    watch,
    loading,
    control,
  }
}

const options = ['Management', 'Development', 'HR', 'QA']

const schema = yup
  .object()
  .shape({
    name: yup.string().optional(),
    department: yup.object().optional(),
  })
  .required()
