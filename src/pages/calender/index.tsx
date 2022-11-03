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

import Button from 'components/button';
import Modal from 'components/modal';
import TextField from 'components/textfield';
import DatePicker from 'components/date-picker';
import Selection from 'components/select';
import ProfileUpload from 'components/profile-upload';
import Container from 'components/container';
import Checkbox from 'components/checkbox';
import EventModal from 'components/event-modal';
import MultiPicker from 'components/multi-select';

import { eventTypes, recurrenceTypes } from './event-types';

import location from 'assets/location.svg';
import person from 'assets/person1.svg';
import person2 from 'assets/person2.svg';
import cross from 'assets/cross.svg';
import deleteIcon from 'assets/delete.svg';
import edit from 'assets/edit.svg';
import plus from 'assets/add.svg';

import style from './calender.module.scss';
import './calendar.scss';

const Calender = () => {
  let month = 'dayGridMonth';
  let week = 'timeGridWeek';
  let day = 'timeGridDay';

  const [openModal, setOpenModal] = useState(false);
  const [check, setCheck] = useState(false);
  const [eventId, setEventId] = useState('');
  const [customTooltip, setCustomTooltip] = useState(false);
  const [items, setItems] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [selectedFileNameBack, setSelectedFileNameBack] = useState<any>();
  const [btnLoader, setBtnLoader] = useState(false);
  const [selected, setSelected] = useState([]);
  const [allEvent, setAllEvent] = useState([]);
  const [singleEventData, setSingleEventData] = useState<any>('');
  const [updatedEvent, setUpdateEvent] = useState();

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

  useEffect(() => {
    getEmployeesData();
    getAllEvents();
  }, []);

  const getEmployeesData = async () => {
    const res = await EmployeeService.getAllEmployees();
    setAttendees(res?.data?.employees[0]?.data);
  };

  const getAllEvents = async () => {
    const res = await CalenderService.getAllEvents({
      view: 'Daily',
    });
    setAllEvent(res.data.events);
  };

  const handleDelete = async () => {
    const res = await CalenderService.deleteEvent(eventId);
    if (res.status === 200) {
      createNotification('success', 'success', res?.data?.msg);
      getAllEvents();
      setCustomTooltip(!customTooltip);
    }
  };

  // const handleUpdate = async () => {
  //   const res = await CalenderService.updateEvent(eventId, {
  //     title: 'Event ',
  //     start: '2022-11-03T10:20Z',
  //     end: '2022-11-03T11:40Z',
  //     type: 'Meeting',
  //     attendees: [],
  //     recurrence: 'Daily',
  //     description: 'Never give up',
  //     venue: 'Lets see now not decided',
  //   });
  //   console.log(res.data, '---updated res-------');
  //   getAllEvents();
  //   createNotification('success', 'success', res?.data?.msg);
  // };

  const handleUpdateById = () => {
    // alert(eventId);
  };

  const RenderEventHandler = (eventInfo: any) => {
    setEventId(eventInfo?.event?.extendedProps?._id);
    return (
      <>
        <div className={style.mainDiv}>
          <div className={style.mainDiv2}>
            <p className={style.title}>{eventInfo?.event?.title && eventInfo?.event?.title}</p>
            <div className={style.descDiv}>
              <img src={eventInfo?.event?.extendedProps?.description && location} />
              <p className={style.description}>
                {eventInfo?.event?.extendedProps?.description &&
                  eventInfo?.event?.extendedProps?.description}
              </p>
            </div>
          </div>
          {/* <div>
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
          </div> */}
        </div>
      </>
    );
  };

  const handleMouseEnter = async () => {
    const res = await CalenderService.getEventById(eventId);
    console.log(res?.data?.event, 'mouse enter--------------------');
    setSingleEventData(res?.data?.event);
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
        start: `${moment(data?.start).format('YYYY-MM-DD')}T${moment(data?.start).format(
          'HH:mm',
        )}Z`,
        end: `${moment(data?.end).format('YYYY-MM-DD')}T${moment(data?.end).format('HH:mm')}Z`,
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
        getAllEvents();
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

  useEffect(() => {
    reset({ singleEventData });
  }, [singleEventData]);

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
          buttonText={{
            month: 'Monthly',
            week: 'Weekly',
            day: 'Daily',
          }}
          eventContent={(e) => RenderEventHandler({ ...e, customTooltip })}
          slotLabelInterval={{ hours: 1 }}
          events={allEvent}
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
                placeholder={'Start Date'}
              />
              <DatePicker
                label={check === true ? 'End Date' : 'End Date & Time'}
                control={control}
                name="end"
                star=" *"
                showTimeInput={!check === true}
                errorMessage={errors?.end?.message}
                placeholder={'End Date'}
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
                <p className={style.title}>{singleEventData?.title && singleEventData?.title}</p>
                <div className={style.iconView}>
                  <img
                    src={edit}
                    height={20}
                    className={style.icon}
                    onClick={() => {
                      setCustomTooltip(!customTooltip);
                      setOpenModal(true);
                      handleUpdateById();
                    }}
                  />
                  <img src={deleteIcon} height={20} className={style.icon} onClick={handleDelete} />
                  <img
                    src={cross}
                    height={20}
                    onClick={() => setCustomTooltip(!customTooltip)}
                    className={style.icon}
                  />
                </div>
              </div>
              <div className={style.durationView}>
                <p className={style.title2}>
                  {moment(singleEventData?.start).format('dddd, MMMM Do YYYY')} |
                  {`${moment(singleEventData?.start).format('h:mm a')}  -
                  ${moment(singleEventData?.end).format('h:mm a')}`}
                </p>
                <p className={style.title2}>
                  {singleEventData?.duration && singleEventData?.duration}
                </p>
              </div>
              <p className={style.title2}>Description</p>
              <p className={style.description}>
                {singleEventData?.description ? singleEventData.description : '-'}
              </p>
              <div className={style.gridDiv}>
                <p className={style.title2}>Venue</p>
                <p className={style.description}>
                  {singleEventData?.venue ? singleEventData?.venue : '-'}
                </p>
              </div>
              <div className={style.gridDiv}>
                <p className={style.title2}>Event Type</p>
                <p className={style.description}>
                  {singleEventData?.type ? singleEventData?.type : '-'}
                </p>
              </div>
              <div className={style.gridDiv}>
                <p className={style.title2}>Attachment</p>
                <a href={singleEventData?.fileId?.file} target={'_blank'}>
                  <p className={style.description}>
                    {singleEventData?.fileId?.name ? singleEventData?.fileId?.name : '-'}
                  </p>
                </a>
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
