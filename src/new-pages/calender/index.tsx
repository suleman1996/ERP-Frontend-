/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import CalenderService from 'services/calender-service';
import EmployeeService from 'services/employee-service';
import { createNotification } from 'common/create-notification';
import moment from 'moment';

import { convertBase64Image } from 'main-helper';
import { setErrors } from 'helper';

import Button from 'new-components/button';
import Modal from 'new-components/modal';
import TextField from 'new-components/textfield';
import DatePicker from 'new-components/date-picker';
import Selection from 'my-components/select';
import ProfileUpload from 'new-components/profile-upload';
import Container from 'new-components/container';
import Checkbox from 'new-components/checkbox';
import EventModal from 'new-components/event-modal';
import MultiPicker from 'new-components/multi-select';

import { eventTypes, recurrenceTypes } from './event-types';

import location from 'assets/location.svg';
import person from 'assets/person1.svg';
import person2 from 'assets/person2.svg';
import cross from 'new-assets/cross.svg';
import deleteIcon from 'new-assets/delete.svg';
import edit from 'new-assets/edit.svg';
import plus from 'new-assets/add.svg';

import style from './calender.module.scss';
import './calendar.scss';

const Calender = () => {
  let month = 'dayGridMonth';
  let week = 'timeGridWeek';
  let day = 'timeGridDay';

  const [openModal, setOpenModal] = useState(false);
  const [check, setCheck] = useState(false);
  const [eventId, setEventId] = useState(false);
  const [customTooltip, setCustomTooltip] = useState(false);
  const [items, setItems] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [selectedFileNameBack, setSelectedFileNameBack] = useState();
  const [btnLoader, setBtnLoader] = useState(false);
  const [selected, setSelected] = useState([]);

  const {
    register,
    getValues,
    handleSubmit,
    errors,
    reset,
    watch,
    control,
    setError,
    clearErrors,
  } = useForm({
    mode: 'all',
  });

  const events = [
    {
      id: 1,
      title: 'Weekly Meeting Projects',
      start: '2022-10-27T04:00:00',
      end: '2022-10-27T06:00:00',
      editable: false,
      clickable: false,
      imageurl: 'assets/person1.svg',
      extendedProps: {
        description: 'Khokkar Chowk, Johar Town, Lahore',
      },
    },
    {
      id: 2,
      title: 'Weekly Meeting Projects',
      start: '2022-10-27T04:00:00',
      end: '2022-10-27T06:00:00',
      editable: false,
      clickable: false,
      imageurl: 'assets/person2.svg',
      extendedProps: {
        description: 'Khokkar Chowk, Johar Town, Lahore',
      },
    },
    {
      id: 3,
      title: 'Weekly Meeting Projects',
      start: '2022-10-27T04:00:00',
      end: '2022-10-27T06:00:00',
      editable: false,
      clickable: false,
      imageurl: 'assets/person2.svg',
      extendedProps: {
        description: 'Khokkar Chowk, Johar Town, Lahore',
      },
    },
  ];

  useEffect(() => {
    getEmployeesData();
  }, []);

  const getEmployeesData = async () => {
    const res = await EmployeeService.getAllEmployees();
    setAttendees(res?.data?.employees[0]?.data);
  };

  const RenderEventHandler = (eventInfo: any) => {
    return (
      <>
        <div className={style.mainDiv}>
          <div className={style.mainDiv2}>
            <p className={style.title}>{eventInfo.event.title}</p>
            <div className={style.descDiv}>
              <img src={location} />
              <p className={style.description}>{eventInfo.event.extendedProps.description}</p>
            </div>
          </div>
          <div>
            <img
              src={(!eventInfo?.event?.imageurl && person) || ''}
              height={28}
              width={28}
              style={{
                borderRadius: '30px',
                height: '30px',
                width: '30px',
              }}
            />
            <img
              src={(!eventInfo?.event?.imageurl && person2) || ''}
              height={28}
              width={28}
              style={{
                borderRadius: '30px',
                height: '30px',
                width: '30px',
                marginLeft: -10,
              }}
            />
          </div>
        </div>
      </>
    );
  };

  const handleMouseEnter = (info: any) => {
    setEventId(info.event.id);
    setCustomTooltip(true);
  };
  const handleSelect = (selectedList: any) => {
    console.log('selectedList', selectedList);

    setItems(selectedList);
  };
  const handleRemove = (selectedList: any) => {
    setItems(selectedList);
  };

  const onSubmit = async (data: any) => {
    setBtnLoader(true);
    try {
      const transformData = {
        ...data,
        title: data?.title,
        start: `${moment(data?.start).format('YYYY-MM-DD')}T${moment(new Date()).format('HH:mm')}Z`,
        end: `${moment(data?.end).format('YYYY-MM-DD')}T${moment(new Date()).format('HH:mm')}Z`,
        recurrence: data?.recurrence?.value,
        type: data?.type?.value,
        allDay: data?.allDay,
        attendees: items?.map((i: any) => i?.value),
        ...(data?.uploadFile.length > 0 && {
          file: await convertBase64Image(data?.uploadFile[0]),
        }),
      };
      delete transformData?.uploadFile;
      const res = await CalenderService.addEvent(transformData);
      if (res.status === 200) {
        createNotification('success', 'success', res?.data?.msg);
        setOpenModal(!openModal);
      }
      setBtnLoader(false);
    } catch (err: any) {
      if (err?.response?.data?.error) {
        setErrors(err?.response?.data?.error, setError);
      } else {
      }
      createNotification('error', 'Error', err?.response?.data?.msg);
      setBtnLoader(false);
    }
  };
  const attendeesOptions = attendees?.map(({ _id, fullName }) => ({
    label: fullName && fullName,
    value: _id && _id,
  }));

  console.log(
    watch(
      'title',
      'attendees',
      'allday',
      'startDate',
      'endDate',
      'type',
      'recurrenceType',
      'description',
      'venue',
    ),
  );

  return (
    <div className={style.calenderMain}>
      <Container>
        <div className={style.topBtn}>
          {day && (
            <Button text="Add Event" handleClick={() => setOpenModal(true)} iconStart={plus} />
          )}
        </div>

        <FullCalendar
          plugins={[interactionPlugin, timeGridPlugin, dayGridPlugin]}
          initialView={day}
          headerToolbar={{
            right: `${day} ${week} ${month}`,
          }}
          eventContent={(e) => RenderEventHandler({ ...e, customTooltip })}
          slotLabelInterval={{ hours: 1 }}
          events={events}
          handleWindowResize={true}
          contentHeight={'auto'}
          contentWidth={'auto'}
          nowIndicator
          dateClick={(e) => console.log(e.dateStr)}
          eventClick={handleMouseEnter}
          slotEventOverlap={false}
        />

        <Modal
          open={openModal}
          handleClose={() => setOpenModal(!openModal)}
          title={'Add Event'}
          text="Save"
          type="submit"
          form="hello"
          loader={btnLoader}
        >
          <form
            onSubmit={(e) => {
              clearErrors();
              handleSubmit(onSubmit)(e);
            }}
            id="hello"
          >
            <div className={style.gridView}>
              <TextField
                label="Title"
                placeholder="Enter Event Name"
                star=" *"
                name="title"
                register={register}
                errorMessage={errors?.title?.message}
              />
              <MultiPicker
                label="Attendees"
                options={attendeesOptions}
                handleChange={setSelected}
                selectedValues={selected}
                control={control}
                name="attendees"
              />
              {/* <MultiPicker
                label="Attendees"
                options={attendeesOptions}
                selectedValues={items}
                handleSelect={handleSelect}
                handleRemove={handleRemove}
                control={control}
                name="attendees"
                // groupBy="name"
              /> */}
            </div>
            <div className={style.allDay}>
              <Checkbox
                label="All Day"
                handleChange={() => setCheck(!check)}
                checked={check}
                name="allDay"
                register={register}
              />
            </div>
            <div className={style.gridView}>
              <DatePicker
                label={check === true ? 'Start Date' : 'Start Date & Time'}
                control={control}
                name="start"
                star=" *"
                showTimeInput={!check === true}
                handleChange={(date) => console.log(date)}
                errorMessage={errors?.start?.message}
              />
              <DatePicker
                label={check === true ? 'End Date' : 'End Date & Time'}
                control={control}
                name="end"
                star=" *"
                showTimeInput={!check === true}
                errorMessage={errors?.end?.message}
              />
            </div>
            <div className={style.gridView}>
              <Selection
                label="Type"
                options={eventTypes}
                name="type"
                control={control}
                errorMessage={errors?.type?.message}
                star=" *"
              />
              <Selection
                label="Recurrence"
                options={recurrenceTypes}
                name="recurrence"
                control={control}
                errorMessage={errors?.recurrence?.message}
                star=" *"
              />
            </div>
            <div className={style.gridView}>
              <TextField
                label="Description "
                placeholder="Enter Description "
                name="description"
                register={register}
              />
              <TextField label="Venue" placeholder="Venue" name="venue" register={register} />
            </div>
            <div className={style.gridView}>
              <ProfileUpload
                label="File"
                name={'uploadFile'}
                register={register}
                id={'file'}
                selectedFileName={selectedFileNameBack}
                setSelectedFileName={setSelectedFileNameBack}
              />
            </div>
          </form>
        </Modal>

        <>
          <EventModal open={customTooltip && eventId}>
            <div className={style.eventDiv}>
              <div className={style.titleDiv}>
                <p className={style.title}>Daily Standup Meeting</p>
                <div className={style.iconView}>
                  <img src={edit} height={20} className={style.icon} />
                  <img src={deleteIcon} height={20} className={style.icon} />
                  <img
                    src={cross}
                    height={20}
                    onClick={() => setCustomTooltip(!customTooltip)}
                    className={style.icon}
                  />
                </div>
              </div>
              <div className={style.durationView}>
                <p className={style.title2}>Thursday, OCT 25 2022 | 10:20 AM - 11:00 AM</p>
                <p className={style.title2}>40 minutes</p>
              </div>
              <p className={style.title2}>Description</p>
              <p className={style.description}>
                The purpose of a standup is to bring teams together to share developments, surface
                blockers, and move work forward. It’s about empowering team members and building
                accountability. It’s a meeting that’s in direct service of moving toward completion
                quickly, without hiccups. Everyone who participates in the standup should understand
                this, and get value out of the time spent together.
              </p>
              <div className={style.gridDiv}>
                <p className={style.title2}>Venue</p>
                <p className={style.description}>Venue</p>
              </div>
              <div className={style.gridDiv}>
                <p className={style.title2}>Event Type</p>
                <p className={style.description}>Meeting</p>
              </div>
              <div className={style.gridDiv}>
                <p className={style.title2}>Attachment</p>
                <p className={style.description}>Approval.pdf</p>
              </div>
              <div className={style.gridDiv}>
                <p className={style.title2}>Attendees</p>
                <div>
                  <img
                    src={person || ''}
                    height={28}
                    width={28}
                    style={{
                      borderRadius: '30px',
                      height: '30px',
                      width: '30px',
                    }}
                  />
                  <img
                    src={person2 || ''}
                    height={28}
                    width={28}
                    style={{
                      borderRadius: '30px',
                      height: '30px',
                      width: '30px',
                      marginLeft: -10,
                    }}
                  />
                </div>
              </div>
            </div>
          </EventModal>
        </>
      </Container>
    </div>
  );
};
export default Calender;

const multiOptions = [
  {
    options: [
      { value: '1', label: 'Ali' },
      { value: '2', label: 'Umair' },
      { value: '3', label: 'Faizan' },
    ],
    label: 'HR',
  },
  {
    options: [
      { value: '4', label: 'Ibtassam' },
      { value: '5', label: 'Suleman' },
      { value: '6', label: 'Haseeb' },
    ],
    label: 'IT',
  },
  {
    options: [
      { value: '7', label: 'Maira' },
      { value: '8', label: 'Huda' },
      { value: '9', label: 'Fatima' },
    ],
    label: 'SE',
  },
];
