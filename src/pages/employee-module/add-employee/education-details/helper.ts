import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import EmployeeService from 'services/employee-service'
import { convertBase64Image } from 'main-helper'
import { removeKeys } from 'helper'

export interface Education {
  degree: string
  institute: string
  startDate?: string
  endDate?: string
  transcript: string | any
  description: string
  ongoing?: boolean
  filename?: string
  prevTranscript?: string
  marksType?: any
  marks?: string
}

interface Props {
  formData: any
  setFormData: any
  employeeId: string
  employeeDocId: string
  handleBack: (data?: string) => void
  handleNext: (data?: string) => void
}

export const useEducationDetail = ({
  handleNext,
  formData,
  setFormData,
  employeeDocId,
}: Props) => {
  const { id } = useParams()
  const [btnLoader, setBtnLoader] = useState(false)
  const [marksType, setMarksType] = useState('percentage')
  const [marksVal, setMarkVal] = useState<number>()
  const [filename, setFilename] = useState<string | any>('')
  const [startDateHandle, setStartDateHandle] = useState<string | any>()
  const [educations, setEducations] = useState<Education[] | []>([])
  const [selectedFileName, setSelectedFileName] = useState('')
  const educationIndex = useRef(-1)
  const [ongiong, setOngoing] = useState(false)

  const [, setUpdateEdu] = useState({
    update: false,
    editInd: -1,
  })
  const { register, handleSubmit, errors, control, reset, watch, setValue } =
    useForm<any>({
      resolver: yupResolver(schema),
      defaultValues: { endDate: null },
    })

  const selectOptions = [
    {
      label: 'Percentage',
      value: 'percentage',
    },
    {
      label: 'CGPA',
      value: 'cgpa',
    },
  ]

  const onSubmit = async () => {
    setBtnLoader(true)
    setFormData({ ...formData, educationDetails: [...educations] })
    try {
      if (id) {
        const userData = {
          educationDetails: [...educations],
        }
        const res = await EmployeeService.addPostEducation(userData, id)
        if (res.status === 200) {
          handleNext && handleNext('Experience')
        }
      } else {
        const res = await EmployeeService.addPostEducation(
          {
            educationDetails: [...educations],
          },
          employeeDocId
        )
        if (res.status === 200) {
          handleNext && handleNext('Experience')
        }
      }
    } catch (err) {
      console.error(err)
    }
    setBtnLoader(false)
    setOngoing(false)
  }

  const handleAddEduction = async (data: Education) => {
    const newEducations: any = [...educations]
    const {
      startDate,
      endDate,
      transcript,
      prevTranscript,
      filename: prevFileName,
    } = data

    const tempObj = {
      ...data,
      ...(!data.ongoing && {
        endDate: !ongiong && moment(endDate).format('YYYY-MM-DD'),
      }),

      startDate: moment(startDate).format('YYYY-MM-DD'),
      ongoing: ongiong,
      ...(transcript[0]?.name
        ? {
            filename: transcript[0]?.name || prevFileName,
            transcript:
              selectedFileName &&
              transcript &&
              (transcript[0]
                ? await convertBase64Image(transcript[0])
                : prevTranscript),
          }
        : {
            filename: newEducations[educationIndex.current]?.filename || '',
            transcript: newEducations[educationIndex.current]?.transcript || '',
          }),
      marksType: data?.marksType?.value,
    }
    !transcript && removeKeys(tempObj, ['transcript'])
    ongiong && removeKeys(tempObj, ['endDate'])

    if (educationIndex.current < 0) {
      newEducations.push(tempObj)
    } else {
      newEducations[educationIndex.current] = { ...tempObj }
      setUpdateEdu({ update: false, editInd: -1 })
    }

    const sortedEducations = newEducations.sort(function (a: any, b) {
      return new Date(b.startDate) - new Date(a.startDate)
    })
    setEducations([...sortedEducations])

    setFormData({ ...formData, educationDetails: [...sortedEducations] })
    educationIndex.current = -1
    reset({ startDate: null, endDate: null, ongiong: false })

    setFilename('')
    setSelectedFileName('')
    setOngoing(false)
  }

  const handleEducation = (index: number) => {
    educationIndex.current = index
    const data = educations.find((data, i) => i === index)

    const newMarkType = selectOptions?.find(
      (item) => item?.value == data?.marksType
    )

    data?.transcript && setSelectedFileName('transcript')
    reset({
      institute: data?.institute,
      degree: data?.degree,
      description: data?.description,
      marksType: { label: newMarkType?.label, value: newMarkType?.value },
      startDate: moment(data?.startDate, 'YYYY-MM-DD').toDate(),
      ...(!data?.ongoing && {
        endDate: moment(data?.endDate, 'YYYY-MM-DD').toDate(),
      }),

      ongoing: data?.ongoing,
      marks: data?.marks,
    })
    setOngoing(!!data?.ongoing)

    data?.filename && setFilename(data?.filename)
  }

  const getUser = async () => {
    const res = await EmployeeService.getEducationEmployee(employeeDocId || id)

    const data = res.data.education.map((item: any) => {
      return {
        ...item,
        startDate: moment(item.startDate).format('YYYY-MM-DD'),
        ...(!item.ongoing && {
          endDate: moment(item.endDate).format('YYYY-MM-DD'),
        }),
      }
    })

    setEducations(data)
  }

  const handleDeleteIndex = (index: number) => {
    const delEdu = [...educations]
    delEdu.splice(index, 1)
    setEducations([...delEdu])
  }

  useEffect(() => {
    if (id || employeeDocId) getUser()
  }, [])

  const startDate = watch('startDate')
  return {
    handleAddEduction,
    onSubmit,
    register,
    control,
    errors,
    reset,
    educations,
    handleSubmit,
    handleEducation,
    btnLoader,
    setOngoing,
    ongiong,
    handleDeleteIndex,
    setStartDateHandle,
    startDateHandle,
    startDate,
    setValue,
    filename,
    setMarksType,
    marksType,
    setMarkVal,
    marksVal,
    selectedFileName,
    setSelectedFileName,
    watch,
    selectOptions,
  }
}

export const schema = yup.object().shape({
  institute: yup.string().required('Institute name is a required '),
  degree: yup.string().required('Degree is a required '),
  marksType: yup.object().required(),
  marks: yup.number().when('marksType.value', {
    is: 'percentage',
    then: yup
      .number()
      .max(100, 'Percentage must be less than or equal to 100')
      .required()
      .typeError('Percentage is required and must be a number'),
    otherwise: yup
      .number()
      .max(4, 'CGPA must be less than or equal to 4')
      .required()
      .typeError('CGPA is required and must be a number'),
  }),
  startDate: yup.string().nullable().required('Start date is required'),
  endDate: yup
    .date()
    .typeError('End date is required')
    .when('ongoing', {
      is: 'false',
      then: yup.string().nullable().required('End date is required.'),
    }),
  description: yup.string().optional(),
})

export const selectCountry = [
  {
    value: 'hr',
    description: 'Hr',
  },
  {
    value: 'employee',
    description: 'Employee',
  },
  {
    value: 'admin',
    description: 'Admin',
  },
]

export const department = [
  {
    value: 'Front-end Developer',
    description: 'Front-end Developer',
  },
  {
    value: 'Backend-developer',
    description: 'Backend-developer',
  },
]

export const columns = [
  {
    key: 'degree',
    name: 'Degree',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'institute',
    name: 'Institute',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'startDate',
    name: 'Start Date',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'endDate',
    name: 'End Date',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'marks',
    name: 'Percentage/CGPA',
    alignText: 'center',
    width: '150px',
  },
  { key: 'actions', name: 'Actions', alignText: 'center', width: '200px' },
]
