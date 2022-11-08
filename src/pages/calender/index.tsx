/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
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
import Selection from 'components/selection';
import ProfileUpload from 'components/profile-upload';
import Container from 'components/container';
import Checkbox from 'components/checkbox';
import EventModal from 'components/event-modal';
import MultiPicker from 'components/multi-select';

import { eventTypes, recurrenceTypes } from './event-types';

import location from 'assets/location.svg';
import person from 'assets/person1.svg';
import noimage from 'assets/NoImage.svg';
import cross from 'assets/cross-Icon.svg';
import deleteIcon from 'assets/delete-Icon.svg';
import edit from 'assets/pencilIcon.svg';
import plus from 'assets/plusIcon.svg';

import style from './calender.module.scss';
import './calendar.scss';

let colorIndex = -1;
const Calender = () => {
  let month = 'dayGridMonth';
  let week = 'timeGridWeek';
  let day = 'timeGridDay';
  let list = 'listWeek';

  const [openModal, setOpenModal] = useState(false);
  const [check, setCheck] = useState(false);
  const [eventId, setEventId] = useState('');
  const [customTooltip, setCustomTooltip] = useState<number | string | undefined | boolean>();
  const [attendees, setAttendees] = useState([]);
  const [selectedFileNameBack, setSelectedFileNameBack] = useState<any>();
  const [btnLoader, setBtnLoader] = useState(false);
  const [selected, setSelected] = useState([]);
  const [allEvent, setAllEvent] = useState([]);
  const [singleEventData, setSingleEventData] = useState<any>('');
  const [attendeesPic, setAttendeesPic] = useState([]);
  const [OnlyEmployees, setOnlyEmployees] = useState([]);

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
    getOnlyEmployee();
  }, []);

  useEffect(() => {
    updateEventData();
  }, [singleEventData]);

  const getEmployeesData = async () => {
    const res = await EmployeeService.getAllEmployees();
    setAttendees(res?.data?.employees[0]?.data);
  };

  const getOnlyEmployee = async () => {
    const res = await EmployeeService.getOnlyEmployees();
    setOnlyEmployees(res?.data);
  };

  const getAllEvents = async () => {
    const res = await CalenderService.getAllEvents({
      view: 'Daily' && 'Weekly' && 'Monthly',
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

  const attendeesOptions = OnlyEmployees?.map(({ _id, fullName }) => ({
    label: fullName && fullName,
    value: _id && _id,
  }));

  const updateEventData = () => {
    const { title, venue, description, type, start, end, recurrence, attendees } = singleEventData;
    reset({
      title,
      venue: venue ? venue : '',
      description,
      attendees: attendees?.map(({ _id, fullName }: any) => {
        return { label: fullName, value: _id };
      }),
      type: { label: type, value: type },
      recurrence: { label: recurrence, value: recurrence },
      start: start ? new Date(start.replace('Z', '')) : '',
      end: end ? new Date(end.replace('Z', '')) : '',
    });
  };

  const RenderEventHandler = (eventInfo: any) => {
    const colors = ['#EDF8FF', '#EDF1FB', '#FFEBEE'];
    const placeholderImage = noimage;
    const onImageError = (e: any) => {
      e.target.src = placeholderImage;
    };
    colorIndex += 1;
    if (colorIndex === colors.length) colorIndex = 0;
    return (
      <>
        <div className={style.mainDiv} style={{ backgroundColor: colors[colorIndex] }}>
          <div className={style.mainDiv2} style={{ backgroundColor: colors[colorIndex] }}>
            <p className={style.title}>{eventInfo?.event?.title && eventInfo?.event?.title}</p>
            <div className={style.descDiv}>
              <img src={eventInfo?.event?.extendedProps?.description && location} />
              <p className={style.description}>
                {eventInfo?.event?.extendedProps?.description &&
                  eventInfo?.event?.extendedProps?.description}
              </p>
            </div>
          </div>
          <div>
            {eventInfo?.event?.extendedProps?.attendees?.map((i: any) => (
              <img
                src={i?.profilePicture && i?.profilePicture}
                onError={onImageError}
                height={28}
                width={28}
                style={{
                  borderRadius: '30px',
                  height: '30px',
                  width: '30px',
                }}
              />
            ))}
          </div>
        </div>
        ;
      </>
    );
  };

  const handleMouseEnter = async ({ event }: any) => {
    const res = await CalenderService.getEventById(event._def.extendedProps._id);
    setSingleEventData(res?.data?.event);
    setAttendeesPic(res?.data?.event?.attendees);
    setCustomTooltip(event._def.extendedProps._id);
    setEventId(event._def.extendedProps._id);
  };

  const onSubmit = async (data: any) => {
    console.log({ data });

    try {
      const transformData = {
        ...data,
        title: data?.title,
        start: data?.start
          ? `${moment(data?.start).format('YYYY-MM-DD')}T${moment(data?.start).format('HH:mm')}Z`
          : '',
        end: data?.end
          ? `${moment(data?.end).format('YYYY-MM-DD')}T${moment(data?.end).format('HH:mm')}Z`
          : '',
        recurrence: data?.recurrence?.value,
        type: data?.type?.value,
        allDay: data?.allDay,
        attendees: data?.attendees?.map((i: any) => i?.value),
        ...(data?.uploadFile?.length > 0 &&
          selectedFileNameBack && {
            file: await convertBase64Image(data?.uploadFile[0]),
          }),
      };
      if (singleEventData) {
        delete transformData?.uploadFile;
        const res = await CalenderService.updateEvent(singleEventData?._id, transformData);
        if (res?.status === 201) {
          setOpenModal(!openModal);
          createNotification('success', 'success', res?.data?.msg);
          getAllEvents();
        }
        setBtnLoader(false);
      } else {
        delete transformData?.uploadFile;
        const res = await CalenderService.addEvent(transformData);
        if (res?.status === 200) {
          getAllEvents();
          createNotification('success', 'success', res?.data?.msg);
          setOpenModal(!openModal);
        }
        setBtnLoader(false);
      }
    } catch (err: any) {
      if (err?.response?.data?.error) {
        setErrors(err?.response?.data?.error, setError);
      } else {
      }
      createNotification('error', 'Error', err?.response?.data?.msg);
      setBtnLoader(false);
    }
  };

  return (
    <div className={style.calenderMain}>
      <Container>
        <div className={style.topBtn}>
          {day && (
            <Button
              text="Add Event"
              handleClick={() => {
                setOpenModal(true);
                setSingleEventData('');
                setSelectedFileNameBack('');
              }}
              iconStart={plus}
            />
          )}
        </div>

        <FullCalendar
          plugins={[interactionPlugin, timeGridPlugin, dayGridPlugin, listPlugin]}
          initialView={day}
          headerToolbar={{
            right: `${list} ${day} ${week} ${month}`,
            left: 'prev title next',
          }}
          buttonText={{
            list: 'Events',
            month: 'Monthly',
            week: 'Weekly',
            day: 'Daily',
          }}
          eventContent={(e) => RenderEventHandler({ ...e, customTooltip })}
          slotLabelInterval={{ hours: 1 }}
          events={allEvent.map((e: any) => ({
            ...e,
            start: e.start.replace('Z', ''),
            end: e.end.replace('Z', ''),
          }))}
          handleWindowResize={true}
          contentHeight="auto"
          contentWidth="auto"
          nowIndicator
          dateClick={(e) => console.log(e.dateStr)}
          eventClick={handleMouseEnter}
          slotEventOverlap={false}
          allDay={true}
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
                star=" *"
                errorMessage={errors?.attendees?.message}
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
          <EventModal open={customTooltip}>
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
                  {`${moment(singleEventData?.start?.replace('Z', '')).format('h:mm a')}  -
                  ${moment(singleEventData?.end?.replace('Z', '')).format('h:mm a')}`}
                </p>
                <p className={style.title2}>
                  {singleEventData?.duration && singleEventData?.duration}
                </p>
              </div>
              <p className={style.title2}>Description</p>
              <p className={style.description}>
                {singleEventData?.description ? singleEventData.description : '-'}
              </p>

              <div className={style.mainParentDiv}>
                <div className={style.leftDiv}>
                  <p className={style.title2}>Venue</p>
                  <p className={style.title2}>Event Type</p>
                  <p className={style.title2}>Attachment</p>
                  <p className={style.title2}>Attendees</p>
                </div>

                <div className={style.rightDiv}>
                  <p className={style.description}>
                    {singleEventData?.venue ? singleEventData?.venue : '-'}
                  </p>
                  <p className={style.description}>
                    {singleEventData?.type ? singleEventData?.type : '-'}
                  </p>
                  <a
                    href={singleEventData?.fileId?.file}
                    target={'_blank'}
                    style={{ textDecoration: 'none' }}
                  >
                    <p className={style.attachFile}>
                      {singleEventData?.fileId?.name ? singleEventData?.fileId?.name : '-'}
                    </p>
                  </a>
                  <div>
                    {attendeesPic.map((i: any) => {
                      return (
                        <img
                          src={i?.profilePicture && i?.profilePicture}
                          height={28}
                          width={28}
                          style={{
                            borderRadius: '30px',
                            height: '30px',
                            width: '30px',
                          }}
                        />
                      );
                    })}
                  </div>
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
