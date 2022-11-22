import { useState } from 'react'
import { useForm } from 'react-hook-form'

import FiltersComponent from 'components/filters'
import ImageUpload from 'components/image-upload'
import FiltersComponentByDate from 'components/filters/filter-for-dates'
import TextField from 'components/textfield'
import Container from 'components/container'
import TextArea from 'components/textarea'
import ProfileUpload from 'components/profile-upload'
import TimePicker from 'components/time-picker'
import Tags from 'components/tags'
import Button from 'components/button'

const DashBoard = () => {
  const { register } = useForm()
  const [img, setImg] = useState<unknown>('')
  const [selectedFileName, setSelectedFileName] = useState<any>()

  return (
    <Container>
      <div style={{ marginTop: '10px' }}>
        <Button text="Button" />
      </div>
      <div style={{ marginTop: '10px' }}>
        <TextField
          label="TextField"
          register={register}
          placeholder="TextField"
          name="textField"
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <TextArea
          label="TextArea"
          register={register}
          placeholder="TextArea"
          name="textArea"
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <ProfileUpload
          label="Upload File"
          register={register}
          name="uploadProfile"
          id="file"
          type="application/pdf,application/vnd.ms-excel"
          selectedFileName={selectedFileName}
          setSelectedFileName={setSelectedFileName}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <TimePicker
          label="Time Picker"
          register={register}
          placeholder="Time Picker"
          name="timePicker"
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Tags text="Red Tag" />
        <div style={{ marginTop: '10px' }}>
          <Tags text="Green Tag" boxColor="#B6E593" textColor="#7DA560" />
        </div>
      </div>
      <div style={{ marginTop: '10px' }}>
        <ImageUpload
          name={'profilePicture'}
          label={'Profile Picture'}
          img={img}
          setImg={setImg}
          btnText="Remove Photo"
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <FiltersComponentByDate />
      </div>
      <div style={{ marginTop: '10px' }}>
        <FiltersComponent />
      </div>
    </Container>
  )
}

export default DashBoard
