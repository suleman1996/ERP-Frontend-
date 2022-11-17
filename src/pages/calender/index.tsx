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
import EventModal from 'components/event-modal';
import MultiPicker from 'components/multi-select';
import TextArea from 'components/textarea';
import DeleteModal from 'components/delete-modal';

import { eventTypes, recurrenceTypes, category } from './event-types';

import location from 'assets/location.svg';
import noimage from 'assets/NoImage.svg';
import cross from 'assets/cross-Icon.svg';
import deleteIcon from 'assets/delete-Icon.svg';
import edit from 'assets/pencilIcon.svg';
import plus from 'assets/plusIcon.svg';
import bucketIcon from 'assets/Bucket.svg';

import style from './calender.module.scss';
import './calendar.scss';

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
  const [delModal, setDelModal] = useState(false);
  const [employeesWithDep] = useState<any>([]);

  const placeholderImage = noimage;
  const onImageError = (e: any) => {
    e.target.src = placeholderImage;
  };

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
    getAllEvents();
    getEmployeesWithDep();
  }, []);

  useEffect(() => {
    updateEventData();
  }, [singleEventData]);

  // const getEmployeesData = async () => {
  //   const res = await EmployeeService.getAllEmployees();
  //   setAttendees(res?.data?.employees[0]?.data);
  // };
  // const getOnlyEmployee = async () => {
  //   const res = await EmployeeService.getOnlyEmployees();
  //   setOnlyEmployees(res?.data);
  // };

  const getEmployeesWithDep = async () => {
    try {
      const result = await EmployeeService.getEmployeesWithDepApi();
      result?.data?.employeesWithDepartment?.map((item: any) => {
        employeesWithDep.push({
          options: item?.employees?.map((ite: any) => ({ value: ite?._id, label: ite?.fullName })),
          label: item?._id?.name,
        });
      });
    } catch (error) {}
  };

  const getAllEvents = async () => {
    const res = await CalenderService.getAllEvents({
      view: 'Daily' && 'Weekly' && 'Monthly',
    });
    setAllEvent(res.data.events);
  };

  const handleDelete = async () => {
    setBtnLoader(true);
    try {
      const res = await CalenderService.deleteEvent(eventId);
      if (res.status === 200) {
        setBtnLoader(true);
        createNotification('success', 'success', res?.data?.msg);
        getAllEvents();
        setCustomTooltip(false);
        setDelModal(!delModal);
      }
      setBtnLoader(false);
    } catch (err) {
      setBtnLoader(false);
    }
  };
  // const attendeesOptions = OnlyEmployees?.map(({ _id, fullName }) => ({
  //   label: fullName && fullName,
  //   value: _id && _id,
  // }));

  const updateEventData = () => {
    const {
      title,
      venue,
      description,
      type,
      start,
      end,
      recurrence,
      attendees,
      category,
      allDay,
      fileId,
    } = singleEventData;
    fileId?.name && setSelectedFileNameBack(fileId?.name);
    reset({
      title,
      venue: venue ? venue : '',
      category: category ? { label: category, value: category } : '',
      description,
      allDay: allDay,
      attendees: attendees
        ? attendees?.map(({ _id, fullName }: any) => {
            return { label: fullName, value: _id };
          })
        : [],
      type: type ? { label: type, value: type } : '',
      recurrence: recurrence ? { label: recurrence, value: recurrence } : '',
      start: start ? new Date(start.replace('Z', '')) : '',
      end: end ? new Date(end.replace('Z', '')) : '',
    });
  };

  const RenderEventHandler = (eventInfo: any) => {
    const allDay = eventInfo?.event?._def?.allDay;
    const catogery = eventInfo?.event?.extendedProps?.category;
    return (
      <>
        <div
          className={style.mainDiv}
          style={{
            backgroundColor: category.find(({ value }) => value === catogery)?.color || 'red',
            height:
              allDay === true ? '5px' : eventInfo?.view?.type == 'dayGridMonth' ? '5px' : null,
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <div
            className={style.mainDiv2}
            style={{
              backgroundColor: category?.find(({ value }) => value === catogery)?.color,
            }}
          >
            <span className={style.title}>
              {eventInfo?.event?.title && eventInfo?.event?.title}
            </span>
            {!allDay && eventInfo?.view?.type !== 'dayGridMonth' && (
              <div className={style.descDiv}>
                <img src={eventInfo?.event?.extendedProps?.venue && location} />
                <p className={style.description}>
                  {eventInfo?.event?.extendedProps?.venue && eventInfo?.event?.extendedProps?.venue}
                </p>
              </div>
            )}
          </div>

          {(eventInfo?.view?.type === 'timeGridDay' || eventInfo?.view?.type === 'timeGridWeek') &&
          allDay === false ? (
            <div className={style.plusView}>
              {eventInfo?.event?.extendedProps?.attendees?.slice(0, 3)?.map((i: any) => (
                <img
                  src={i?.profilePicture && i?.profilePicture}
                  onError={onImageError}
                  height={28}
                  width={28}
                  style={{
                    borderRadius: '30px',
                    height: '30px',
                    width: '30px',
                    marginLeft: '-10px',
                    border: '1px solid white',
                  }}
                />
              ))}
              {eventInfo?.event?.extendedProps?.attendees?.length > 3 && (
                <div className={style.plusIcon}>
                  <p className={style.plusText}>
                    {eventInfo?.event?.extendedProps?.attendees?.length > 3 &&
                      eventInfo?.event?.extendedProps?.attendees?.length - 3}
                    +
                  </p>
                </div>
              )}
            </div>
          ) : null}
        </div>
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
    setBtnLoader(true);
    try {
      const transformData = {
        title: data?.title,
        start: data?.start
          ? `${moment(data?.start).format('YYYY-MM-DD')}T${moment(data?.start).format('HH:mm')}Z`
          : '',
        end: data?.end
          ? `${moment(data?.end).format('YYYY-MM-DD')}T${moment(data?.end).format('HH:mm')}Z`
          : '',
        recurrence: data?.recurrence?.value,
        category: data?.category?.value,
        type: data?.type?.value,
        allDay: data?.allDay,
        venue: data?.venue,
        description: data?.description,
        ...(data?.attendees.length > 0 && {
          attendees: data?.attendees?.map((i: any) => i?.value),
        }),
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
                setCheck(false);
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
            left: 'prev title next today',
          }}
          buttonText={{
            list: 'Events',
            month: 'Monthly',
            week: 'Weekly',
            day: 'Daily',
          }}
          titleFormat={{
            day: 'numeric',
            year: 'numeric',
            month: 'short',
          }}
          dayMaxEvents={2}
          expandRows={true}
          allDayMaintainDuration={true}
          eventContent={RenderEventHandler}
          slotLabelInterval={{ hours: 1 }}
          events={allEvent?.map((e: any) => ({
            ...e,
            start: e.start.replace('Z', ''),
            end: e.end.replace('Z', ''),
          }))}
          handleWindowResize={true}
          contentHeight="auto"
          contentWidth="auto"
          nowIndicator
          eventClick={handleMouseEnter}
          slotEventOverlap={false}
          allDaySlot={true}
          allDayText="all-day"
        />

        <Modal
          open={openModal}
          handleClose={() => {
            setOpenModal(!openModal);
          }}
          title={singleEventData ? 'Edit Event' : 'Add Event'}
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
            <TextField
              label="Title"
              placeholder="Enter Event Name"
              star=" *"
              name="title"
              register={register}
              errorMessage={errors?.title?.message}
            />
            <div className={style.attendees}>
              <Selection
                name="attendees"
                control={control}
                errorMessage={errors?.attendees?.message}
                wraperSelect={style.wraperSelect}
                label="Attendees"
                placeholder="Attendees"
                options={employeesWithDep}
                star=" *"
                closeMenuOnSelect={false}
                isMulti={true}
              />
            </div>

            <div className={style.gridView}>
              <DatePicker
                label={check === true ? 'Start Date' : 'Start Date & Time'}
                control={control}
                name="start"
                star=" *"
                showTimeInput={check !== true}
                errorMessage={errors?.start?.message}
                placeholder={'Start Date'}
                allDayLabel={'All Day'}
                switchName="allDay"
                register={register}
                handleSwitchChange={(checked) => {
                  setCheck(checked);
                }}
              />
              <DatePicker
                label={check === true ? 'End Date' : 'End Date & Time'}
                control={control}
                name="end"
                star=" *"
                showTimeInput={check !== true}
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
                placeholder="Type"
              />
              <Selection
                label="Recurrence"
                options={recurrenceTypes}
                name="recurrence"
                control={control}
                errorMessage={errors?.recurrence?.message}
                star=" *"
                placeholder="Recurrence"
              />
            </div>
            <div className={style.gridView}>
              <Selection
                label="Category"
                options={category}
                name="category"
                control={control}
                star=" *"
                errorMessage={errors?.category?.message}
                placeholder="Category"
              />
              <TextField label="Venue" placeholder="Venue" name="venue" register={register} />
            </div>
            <TextArea
              label="Description"
              row={2}
              placeholder="Enter event discription.."
              name="description"
              register={register}
            />
            <div className={style.file}>
              <ProfileUpload
                label="File"
                name={'uploadFile'}
                register={register}
                id={'file'}
                selectedFileName={selectedFileNameBack}
                setSelectedFileName={setSelectedFileNameBack}
                placeholder="Attach File"
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
                  <img
                    src={deleteIcon}
                    height={20}
                    className={style.icon}
                    onClick={() => {
                      setCustomTooltip(!customTooltip);
                      setDelModal(true);
                    }}
                  />
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
                  {moment(singleEventData?.start).format('dddd, MMMM Do YYYY')}
                  {!singleEventData?.allDay && (
                    <span>
                      |{moment(singleEventData?.start?.replace('Z', '')).format('h:mm a')} -
                      {moment(singleEventData?.end?.replace('Z', '')).format('h:mm a')}
                    </span>
                  )}
                </p>
                <p className={style.title2}>
                  {singleEventData?.allDay
                    ? 'All Day'
                    : singleEventData?.duration && singleEventData?.duration}
                </p>
              </div>
              <p className={style.title2}>Description</p>
              <p className={style.description}>
                {singleEventData?.description ? singleEventData.description : '-'}
              </p>

              <div className={style.mainParentDiv}>
                <div className={style.leftDiv}>
                  <p className={style.title2}>Venue</p>
                  <p className={style.title2}>Category</p>
                  <p className={style.title2}>Event Type</p>
                  <p className={style.title2}>Attachment</p>
                  <p className={style.title2}>Attendees</p>
                </div>

                <div className={style.rightDiv}>
                  <p className={style.description}>
                    {singleEventData?.venue ? singleEventData?.venue : '-'}
                  </p>
                  <p className={style.description}>
                    {singleEventData?.category ? singleEventData?.category : '-'}
                  </p>
                  <p className={style.description}>
                    {singleEventData?.type ? singleEventData?.type : '-'}
                  </p>
                  <p className={style.description}>
                    {singleEventData?.fileId?.name ? (
                      <a
                        href={singleEventData?.fileId?.file}
                        target={'_blank'}
                        style={{ textDecoration: 'none' }}
                      >
                        <p className={style.attachFile}>
                          {singleEventData?.fileId?.name ? singleEventData?.fileId?.name : '-'}
                        </p>
                      </a>
                    ) : (
                      '-'
                    )}
                  </p>

                  <div className={style.plusView}>
                    {attendeesPic?.slice(0, 3)?.map((i: any) => {
                      return (
                        <>
                          <img
                            src={i?.profilePicture && i?.profilePicture}
                            height={30}
                            onError={onImageError}
                            width={30}
                            style={{
                              borderRadius: '30px',
                              height: '30px',
                              width: '30px',
                              marginLeft: -10,
                              margin: 0,
                              border: '1px solid white',
                            }}
                            key={i}
                          />
                        </>
                      );
                    })}
                    {attendeesPic?.length > 3 && (
                      <div className={style.plusIcon}>
                        <p className={style.plusText}>
                          {attendeesPic?.length > 3 && attendeesPic?.length - 3}+
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </EventModal>
        </>

        <DeleteModal
          open={delModal}
          handleDelete={handleDelete}
          setOpen={() => setDelModal(!delModal)}
          bucket={bucketIcon}
          isLoading={btnLoader}
        />
      </Container>
    </div>
  );
};
export default Calender;
