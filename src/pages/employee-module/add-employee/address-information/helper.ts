import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import EmployeeService from 'services/employee-service'
import AddressService from 'services/address-service'
import { setErrors } from '../../../../helper/index'

interface Data {
  currentCountry: string
  currentState: string
  currentCity: string
  currentCode: string
  currentAddress: string
  permanentCountry: string
  permanentState: string
  permanentCity: string
  permanentCode: string
  permanentAddress: string
}

interface Props {
  formData: any
  setFormData: any
  employeeId: string
  handleBack: (data?: string) => void
  handleNext: (data?: string) => void
  employeeDocId?: string | any
  setEmployeeDocId?: Dispatch<SetStateAction<string>>
}

export const useAddressInfo = ({
  handleNext,
  setEmployeeDocId,
  employeeDocId,
}: Props) => {
  const { id } = useParams()
  const [btnLoader, setBtnLoader] = useState(false)
  const [currentCountryData, setCurrentCountryData] = useState([])
  const [currentCitiesData, setCurrentCitiesData] = useState([])
  const [permanentCountryData, setPermanentCountryData] = useState([])
  const [permanentCitiesData, setPermanentCitiesData] = useState([])
  const [checkboxChecked, setCheckboxChecked] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    errors,
    reset,
    watch,
    setError,
    clearErrors,
  } = useForm()

  useEffect(() => {
    if (id || employeeDocId) {
      getSingleEmployeeData()
    }
  }, [])

  const getSingleEmployeeData = async () => {
    const res = await EmployeeService.getAddressEmployee(id || employeeDocId)

    if (res.data?.employeeAddressInformation) {
      reset({
        currentAddress: {
          ...res.data?.employeeAddressInformation?.addresses?.currentAddress,
          country: {
            label:
              res.data?.employeeAddressInformation?.addresses?.currentAddress
                ?.country,
            value:
              res.data?.employeeAddressInformation?.addresses?.currentAddress
                ?.country,
          },
          city: {
            label:
              res.data?.employeeAddressInformation?.addresses?.currentAddress
                ?.city,
            value:
              res.data?.employeeAddressInformation?.addresses?.currentAddress
                ?.city,
          },
          state: {
            label:
              res.data?.employeeAddressInformation?.addresses?.currentAddress
                ?.state,
            value:
              res.data?.employeeAddressInformation?.addresses?.currentAddress
                ?.state,
          },
        },
        permanentAddress: {
          ...res.data?.employeeAddressInformation?.addresses?.permanentAddress,
          country: {
            label:
              res.data?.employeeAddressInformation?.addresses?.permanentAddress
                .country,
            value:
              res.data?.employeeAddressInformation?.addresses?.permanentAddress
                .country,
          },
          city: {
            label:
              res.data?.employeeAddressInformation?.addresses?.permanentAddress
                .city,
            value:
              res.data?.employeeAddressInformation?.addresses?.permanentAddress
                .city,
          },
          state: {
            label:
              res.data?.employeeAddressInformation?.addresses?.permanentAddress
                .state,
            value:
              res.data?.employeeAddressInformation?.addresses?.permanentAddress
                .state,
          },
        },
      })
    }
  }

  const handleCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxChecked(e.target.checked)
    const data = watch()
    if (e.target.checked) {
      const { currentAddress } = data
      await getData(
        'permanentCountryData',
        {
          country: currentAddress.country.label,
        },
        currentAddress.state.label
      )
      reset({
        ...data,
        permanentAddress: {
          ...currentAddress,
          city: {
            label: currentAddress.city.label,
            value: currentAddress.city.label,
          },
          country: {
            label: currentAddress.country.label,
            value: currentAddress.country.label,
          },
          state: {
            label: currentAddress.state.label,
            value: currentAddress.state.label,
          },
        },
      })
    } else {
      reset({
        ...data,
        permanentAddress: {
          city: {
            label: '',
            value: '',
          },
          country: {
            label: '',
            value: '',
          },
          state: {
            label: '',
            value: '',
          },
        },
      })
    }
  }

  const onSubmit = async (data: Data) => {
    setBtnLoader(true)
    try {
      const userData = {
        currentAddress: {
          city: data?.currentAddress?.city?.label,
          country: data?.currentAddress?.country?.label,
          state: data?.currentAddress?.state?.label,
          address: data?.currentAddress?.address,
          postalCode: data?.currentAddress?.postalCode,
        },
        permanentAddress: {
          city: data?.permanentAddress?.city?.label,
          country: data?.permanentAddress?.country?.label,
          state: data?.permanentAddress?.state?.label,
          address: data?.permanentAddress?.address,
          postalCode: data?.permanentAddress?.postalCode,
        },
      }
      if (id) {
        const res = await EmployeeService.addressAddPost(userData, id)
        if (res.status === 200) {
          handleNext('Company')
        }
        if (res?.response?.data?.error && res?.response?.status === 422) {
          setErrors(res.response.data.error, setError)
        }
      } else if (employeeDocId) {
        const res = await EmployeeService.addressAddPost(
          userData,
          employeeDocId
        )
        if (res.status === 200) {
          handleNext('Company')
        }
        if (res?.response?.data?.error && res?.response?.status === 422) {
          setErrors(res.response.data.error, setError)
        }
      } else {
        const res = await EmployeeService.addressAddPost(
          userData,
          employeeDocId
        )
        if (res.status === 200) {
          setTimeout(() => {
            setEmployeeDocId &&
              setEmployeeDocId(res?.data?.updatedEmployee?._id)
          }, 500)
          handleNext('Company')
        }
        if (res?.response?.data?.error && res?.response?.status === 422) {
          setErrors(res.response?.data?.error, setError)
        }
      }
    } catch (err: any) {
      setErrors(err?.response?.data?.error, setError)
      setBtnLoader(false)
    }

    setBtnLoader(false)
  }

  const getData = async (
    type: string,
    data: { country?: string },
    currentState?: string
  ) => {
    if (data?.country) {
      if (type === 'currentCountryData') {
        setCurrentCountryData([])
        setCurrentCitiesData([])
      } else if (type === 'permanentCountryData') {
        setPermanentCountryData([])
        setPermanentCitiesData([])
      }
      const res = await AddressService.getCountryStateCityData(data)
      if (res.status === 200) {
        if (res.data.address[0]) {
          const { states } = res.data.address[0]
          type === 'currentCountryData' && setCurrentCountryData(states || [])
          type === 'permanentCountryData' &&
            setPermanentCountryData(states || [])
        }
      }
      currentState &&
        getCities(
          'permanentCitiesData',
          res.data.address[0].states || [],
          currentState
        )
    } else {
      type === 'currentCountryData' && setCurrentCountryData([])
      type === 'permanentCountryData' && setPermanentCountryData([])
    }
  }

  const getCities = (type: string, data: any, state: string) => {
    type === 'currentCitiesData' &&
      setCurrentCitiesData(
        data.find((x: any) => x.name === state)?.cities || []
      )
    type === 'permanentCitiesData' &&
      setPermanentCitiesData(
        data.find((x: any) => x.name === state)?.cities || []
      )
  }

  return {
    btnLoader,
    currentCountryData,
    currentCitiesData,
    permanentCitiesData,
    permanentCountryData,
    checkboxChecked,
    errors,
    register,
    handleSubmit,
    onSubmit,
    handleCheck,
    getCities,
    getData,
    watch,
    control,
    clearErrors,
  }
}
