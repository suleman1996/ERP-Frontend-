/* eslint-disable jsx-a11y/alt-text */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import Button from 'new-components/button';
import Modal from 'new-components/modal';
import TextField from 'new-components/textfield';
import DatePicker from 'new-components/date-picker';
import Selection from 'my-components/select';
import ProfileUpload from 'new-components/profile-upload';
import Container from 'new-components/container';
import Checkbox from 'new-components/checkbox';
import CustomSelect from 'new-components/custom-select';
import EventModal from 'new-components/event-modal';
import MultiSelect from 'new-components/multi-select';

import { eventTypes, options, recurrenceTypes } from './event-types';

import location from 'assets/location.svg';
import person from 'assets/person1.svg';
import person2 from 'assets/person2.svg';
import cross from 'new-assets/cross.svg';
import deleteIcon from 'new-assets/delete.svg';
import edit from 'new-assets/edit.svg';

import style from './calender.module.scss';
import './calendar.scss';
import CalenderService from 'services/calender-service';

const Calender = () => {
  let month = 'dayGridMonth';
  let week = 'timeGridWeek';
  let day = 'timeGridDay';

  const [openModal, setOpenModal] = useState(false);
  const [check, setCheck] = useState(false);
  const [eventId, setEventId] = useState(false);
  const [customTooltip, setCustomTooltip] = useState(false);
  const [items, setItems] = useState([]);

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

  const RenderEventHandler = (eventInfo: any) => {
    return (
      <>
        {/* {customTooltip && eventId == eventInfo.event._def.publicId && (
          <div
            style={{
              background: 'white',
              position: 'absolute',
              boxShadow: '1px 2px 9px #F4AAB9',
              borderRadius: '2px',
            }}
          >
            <div className={style.titleDiv}>
              <p className={style.title}>{eventInfo?.event?.title}</p>
              <div className={style.iconView}>
                <img src={edit} height={15} className={style.icon} />
                <img src={deleteIcon} height={15} className={style.icon} />
                <img
                  src={cross}
                  height={15}
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus tortor metus,
              imperdiet placerat ipsum porta et. In eleifend rhoncus neque, id posuere felis
              vestibulum a. Donec tincidunt vehicula tellus quis blandit.
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
          </div>
        )} */}
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
    setItems(selectedList);
  };
  const handleRemove = (selectedList: any) => {
    setItems(selectedList);
  };

  const { register, getValues, handleSubmit, errors, reset, watch, control } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = async (data) => {
    const res = await CalenderService.addEvent(data);
    console.log(res, 'res ------------ res');
  };

  console.log(
    watch(
      'title',
      'allday',
      'startDate',
      'endDate',
      'type',
      'recurrenceType',
      'description',
      'venue',
      'attendees',
    ),
  );

  return (
    <div className={style.calenderMain}>
      <Container>
        <div className={style.topBtn}>
          {day && <Button text="Add Event" handleClick={() => setOpenModal(true)} />}
        </div>

        <FullCalendar
          plugins={[interactionPlugin, timeGridPlugin, dayGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            right: `${month} ${week} ${day}`,
          }}
          eventContent={(e) => RenderEventHandler({ ...e, customTooltip })}
          slotLabelInterval={{ hours: 1 }}
          events={events}
          handleWindowResize={true}
          contentHeight={'auto'}
          contentWidth={'auto'}
          nowIndicator
          // eventMouseEnter={handleMouseEnter}
          // eventMouseLeave={handleMouseLeave}
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
        >
          <form onSubmit={handleSubmit(onSubmit)} id="hello">
            <div className={style.gridView}>
              <TextField
                label="Title"
                placeholder="Enter Event Name"
                star=" *"
                name="title"
                register={register}
              />
              <MultiSelect
                label="Attendees"
                options={options}
                selectedValues={items}
                handleSelect={handleSelect}
                handleRemove={handleRemove}
                control={control}
                name="attendees"
              />
            </div>
            <div className={style.allDay}>
              <Checkbox
                label="All Day"
                handleChange={() => setCheck(!check)}
                checked={check}
                name="allday"
                register={register}
              />
            </div>
            <div className={style.gridView}>
              <DatePicker
                label={check === true ? 'Start Date' : 'Start Date & Time'}
                control={control}
                name="startDate"
                star=" *"
                showTimeInput={check === false}
              />
              <DatePicker
                label={check === true ? 'End Date' : 'End Date & Time'}
                control={control}
                name="endDate"
                star=" *"
                showTimeInput={check === false}
              />
            </div>
            <div className={style.gridView}>
              <Selection label="Type" options={eventTypes} name="type" control={control} />
              <Selection
                label="Recurrence"
                options={recurrenceTypes}
                name="recurrenceType"
                control={control}
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
            {/* <div className={style.gridView}>
              <ProfileUpload />
            </div> */}
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

const schema = yup
  .object()
  .shape({
    title: yup.string().required('Title is a required field'),
    // type: yup.string().required('Type is a required field'),
    // description: yup.string().optional(),
    // time: yup.string().required('Time is a required field'),
    // date: yup.date().required('Date is a required field'),
    // scope: yup.string().required('Scope is a required field'),
    // recursion: yup.string().required('Recursion is a required field'),
    // recursionEndDate: yup.string().when('recursion', {
    //   is: 'true',
    //   then: yup.string().required('required field'),
    // }),
    // days: yup.array().when('recursion', {
    //   is: 'Custom',
    //   then: yup.array().min(1, 'Please Select At least 1 Day'),
    // }),
  })
  .required();
