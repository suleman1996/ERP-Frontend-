import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { useForm } from 'react-hook-form'

import EmployeeService from 'services/employee-service'
import { removeKeys } from 'helper'
import { setErrors } from 'helper/index'
import { useDispatch, useSelector } from 'react-redux'
import { getAllDepartments } from 'store/actions'
import { getAllLeaves } from 'store/actions'

interface Props {
  handleBack: (data?: string) => void
  handleNext: (data?: string) => void
  formData: any
  setFormData: any
  employeeId: string
  employeeDocId?: string | any
}
interface Leave {
  _id: string
  name: string
  createdAt: Date
  updatedAt: Date
}
interface Data {
  startDate: string
  endDate: string
  joiningDate: string
  checkOut: string
  checkIn: string
  workingTime?: string
  probation: string
  workingHours?: any
  department?: any
  designation?: any
  [key: string]: any
}

export const useCompanyInfo = ({
  handleNext,
  formData,
  setFormData,
  employeeDocId,
}: Props) => {
  const {
    register,
    handleSubmit,
    errors,
    control,
    reset,
    watch,
    setError,
    clearErrors,
  } = useForm()
  const { id } = useParams()
  const dispatch = useDispatch()

  const [type, setType] = useState('per-day')
  const [customErr, setCustomErr] = useState()
  const [probation, setProbation] = useState(false)
  const [designation, setDesignation] = useState<any>()
  const [check, setCheck] = useState<number[]>([])
  const [btnLoader, setBtnLoader] = useState(false)
  const [endDatePlaceHolder, setEndDatePlaceHlder] = useState()
  let test = {}

  const state = useSelector((state) => state.app)
  const { departments, leaves } = state

  const departmentChangeHandler = async (e: any) => {
    await getAllDesignations(e)
  }

  const employmentTypeData = [
    {
      label: 'Full-Time',
      value: 'Full-Time',
    },
    {
      label: 'Part-Time',
      value: 'Part-Time',
    },
  ]

  useEffect(() => {
    id && leaves && getSingleEmployeeData()
  }, [leaves])

  const probationDurationData = [
    { label: '2 Months', value: '60' },
    { label: '3 Months', value: '90' },
    { label: '4 Months', value: '120' },
    { label: '5 Months', value: '150' },
    { label: '6 Months', value: '180' },
  ]

  const selectHoursDuration = [
    {
      value: 'per-day',
      label: 'per Day',
    },
    {
      value: 'per-week',
      label: 'Per Week',
    },
    {
      value: 'per-month',
      label: 'Per Month ',
    },
  ]

  const init = async () => {
    if (!formData?.companyInformation) return
    await getAllDepartments()
    await getAllDesignations(formData?.companyInformation?.departmentId?.value)
    formData?.companyInformation &&
      reset({
        ...formData?.companyInformation,
        workingHours: formData?.companyInformation?.workingHoursType?.value,
      })
    setCheck(formData?.companyInformation?.workingDaysInWeek)
    setProbation(formData?.companyInformation?.probation)
    setType(formData?.companyInformation?.workingHoursType?.value)
    setType(watch()?.selectHours?.value)
  }
  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    setEndDatePlaceHlder(
      moment(watch()?.joiningDate).add(
        watch()?.probationDurationDays?.value / 30,
        'M'
      )
    )
  }, [watch()?.joiningDate])

  const getSingleEmployeeData = async () => {
    const res = await EmployeeService.getCompanyEmployee(id || employeeDocId)

    const depObj = departments?.find(
      (item) => item._id === res?.data?.company?.departmentId
    )

    const employeementTypeObj = employmentTypeData?.find(
      (item) => item?.value === res?.data?.company?.employmentType
    )

    const selectedHours = selectHoursDuration?.find(
      (item) => item?.value === res?.data?.company?.workingHoursType
    )

    setTimeout(() => {
      setType(selectedHours?.value)
    }, 500)

    const probationObj = probationDurationData.find(
      (item) =>
        +item?.value === res.data?.company?.probation?.probationDurationDays
    )

    if (res?.data?.company?.departmentId) {
      const ress = await EmployeeService.getDesignation(
        res?.data?.company?.departmentId
      )
      const designationObj = ress?.data?.Designation?.find(
        (item) => item._id === res?.data?.company?.designationId
      )

      test = designationObj
    }

    setEndDatePlaceHlder(
      moment(res?.data?.company?.joiningDate).add(
        res?.data?.company?.probation?.probationDurationDays / 30,
        'M'
      )
    )

    setTimeout(() => {
      reset({
        ...res?.data?.company,
        departmentId: {
          label: depObj?.name,
          value: depObj?._id,
        },
        designationId: {
          label: test?.name,
          value: test?._id,
        },
        probationDurationDays: probationObj && {
          label: probationObj?.label,
          value: probationObj?.value,
        },
        employmentType: {
          label: employeementTypeObj?.label,
          value: employeementTypeObj?.value,
        },
        joiningDate: moment(res?.data?.company?.joiningDate).toDate(),
        probation: Boolean(res?.data?.company?.probation?.employeeId),
        employmentInfo: {
          workingHours: res?.data?.company?.workingHours,
          checkIn: moment(res?.data?.company?.checkIn, 'hh:mm a').format(
            'HH:mm'
          ),
          checkOut: moment(res?.data?.company?.checkOut, 'hh:mm a').format(
            'HH:mm'
          ),
        },
        ...leaves?.reduce((acc: { [key: string]: any }, leave: any) => {
          const leaveData = res?.data?.company?.leaves?.find(
            (e: any) => e.leaveId === leave._id
          )
          return { ...acc, [leave.name]: leaveData?.quantity }
        }, {}),
      })
    }, 200)

    setCheck(res?.data?.company?.workingDaysInWeek)
    setType(res?.data?.company?.workingHoursType.value)
    setTimeout(() => {
      setProbation(res?.data?.company?.active)
    }, 800)
  }

  const onSubmit = async (data: Data) => {
    setBtnLoader(true)
    removeKeys(data, ['startDate', 'endDate'])
    const { joiningDate, probation } = data

    const user: any = {
      ...data,
      employmentType: data?.employmentType?.value,
      joiningDate: joiningDate
        ? moment(joiningDate).format('YYYY-MM-DD')
        : undefined,
      departmentId: data?.departmentId?.value,
      designationId: data?.designationId?.value,
      leaves: leaves.map((leave: Leave, index: number) => {
        return { leaveId: leave?._id, quantity: data?.leaves[index]?.quantity }
      }),
      employmentInfo: {
        checkIn:
          data?.employmentInfo?.checkIn &&
          moment(data?.employmentInfo.checkIn, 'HH:mm').format('hh:mm a'),
        checkOut:
          data?.employmentInfo?.checkOut &&
          moment(data?.employmentInfo?.checkOut, 'HH:mm').format('hh:mm a'),
        workingHours:
          data?.employmentInfo?.workingHours &&
          data?.employmentInfo?.workingHours
            ?.split(':')
            .map((e: string) => String(e).padStart(2, '0'))
            .join(':'),
        workingHoursType: watch().employmentType?.label === 'Part-Time' && type,
      },
      workingDaysInWeek: check,
      probation: probation ? Boolean(probation) : false,
      ...(probation && {
        probationDurationDays: data?.probationDurationDays?.value,
      }),
    }
    try {
      setFormData({
        ...formData,
        companyInformation: {
          ...data,
          workingDaysInWeek: check,
          workingHoursType: user?.employmentInfo?.workingHoursType.value,
        },
      })

      removeKeys(user, [
        'department',
        'designation',
        ...leaves.map((leave: Leave) => leave.name),
      ])

      if (id) {
        const res = await EmployeeService.addPostCompany(user, id)
        if (res.status === 200) {
          handleNext('Education')
        }
        if (res?.response?.data?.error && res.response.status === 422) {
          setErrors(res?.response?.data?.error, setError)
        }
      } else {
        const res = await EmployeeService.addPostCompany(user, employeeDocId)
        if (res.status === 200) {
          handleNext('Education')
        }
        if (res?.response?.data?.error && res.response.status === 422) {
          setErrors(res?.response?.data?.error, setError)
        }
      }
    } catch (err: any) {
      if (err.response?.data?.error) {
        setErrors(err.response.data.error, setError)
      }
    }
    !customErr && setCustomErr('Required field')

    setBtnLoader(false)
  }

  const getAllDesignations = async (id: string) => {
    try {
      const res = await EmployeeService.getDesignation(id)
      setDesignation(res?.data?.Designation)
    } catch (e) {
      console.error('designation not get yet')
    }
  }

  useEffect(() => {
    dispatch(getAllDepartments())
    dispatch(getAllLeaves())
  }, [])

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    control,
    watch,
    btnLoader,
    setProbation,
    probation,
    type,
    setType,
    departments,
    designation,
    leaves,
    check,
    setCheck,
    departmentChangeHandler,
    clearErrors,
    customErr,
    setCustomErr,
    probationDurationData,
    employmentTypeData,
    selectHoursDuration,
    endDatePlaceHolder,
    id,
  }
}
