/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Tooltip } from 'bootstrap';

import Button from 'new-components/button';
import Modal from 'new-components/modal';
import TextField from 'new-components/textfield';
import DatePicker from 'new-components/date-picker';
import Selection from 'my-components/select';
import ProfileUpload from 'new-components/profile-upload';
import Container from 'new-components/container';
import Checkbox from 'new-components/checkbox';

import { eventTypes, recurrenceTypes } from './event-types';

import location from 'assets/location.svg';
import person from 'assets/person1.svg';
import person2 from 'assets/person2.svg';

import style from './calender.module.scss';
import './calendar.scss';

let tooltipInstance: string | Tooltip = '';

const Calender = () => {
  const { control } = useForm();
  const [openModal, setOpenModal] = useState(false);
  const [check, setCheck] = useState(false);
  const [eventId, setEventId] = useState(false);
  const [customTooltip, setCustomTooltip] = useState(false);
  let month = 'dayGridMonth';
  let week = 'timeGridWeek';
  let day = 'timeGridDay';

  const events = [
    {
      id: 1,
      title: 'Weekly Meeting Projects',
      start: '2022-10-26T04:00:00',
      end: '2022-10-26T06:00:00',
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
      start: '2022-10-26T04:00:00',
      end: '2022-10-26T06:00:00',
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
      start: '2022-10-26T04:00:00',
      end: '2022-10-26T06:00:00',
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
        {customTooltip && eventId == eventInfo.event._def.publicId && (
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
        )}

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
    if (info.event.extendedProps.description) {
      tooltipInstance = new Tooltip(info.el, {
        title: info.event.extendedProps.description,
        html: true,
        placement: 'top',
        trigger: 'hover',
        container: 'body',
      });
      tooltipInstance.show();
    }
  };

  const handleMouseLeave = (info: any) => {
    if (tooltipInstance) {
      // tooltipInstance.dispose();
      setCustomTooltip(!customTooltip);
      // tooltipInstance = null;
    }
  };

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
          customButtons={{
            myCustomButton: {
              text: 'custom!',
              click: function () {
                alert('clicked the custom button!');
              },
            },
          }}
          eventContent={(e) => RenderEventHandler({ ...e, customTooltip })}
          slotLabelInterval={{ hours: 1 }}
          events={events}
          handleWindowResize={true}
          contentHeight={'auto'}
          contentWidth={'auto'}
          nowIndicator
          eventMouseEnter={handleMouseEnter}
          eventMouseLeave={handleMouseLeave}
          dateClick={(e) => console.log(e.dateStr)}
          eventClick={(e) => console.log(e.event.id)}
          slotEventOverlap={false}
        />

        <Modal
          open={openModal}
          handleClose={() => setOpenModal(!openModal)}
          title={'Add Event'}
          text="Save"
        >
          <div className={style.gridView}>
            <TextField label="Title" placeholder="Enter Event Name" star=" *" />
          </div>
          <div className={style.allDay}>
            <Checkbox label="All Day" handleChange={() => setCheck(!check)} checked={check} />
          </div>
          <div className={style.gridView}>
            <DatePicker
              label={check === true ? 'Start Date' : 'Start Date & Time'}
              control={control}
              name="startDate"
              star=" *"
              showTimeInput={check === false}
              handleChange={(event) => console.log(event, 'date time')}
            />
            <DatePicker
              label={check === true ? 'End Date' : 'End Date & Time'}
              control={control}
              name="endDate"
              star=" *"
              showTimeInput={check === false}
              handleChange={(event) => console.log(event, ' end date time')}
            />
          </div>
          <div className={style.gridView}>
            <Selection label="Type" options={eventTypes} />
            <Selection label="Recurrence " options={recurrenceTypes} />
          </div>
          <div className={style.gridView}>
            <TextField label="Description " placeholder="Enter Description " />
            <TextField label="Venue" placeholder="Venue" />
          </div>
          <div className={style.gridView}>
            <ProfileUpload />
          </div>
        </Modal>
      </Container>
    </div>
  );
};
export default Calender;
