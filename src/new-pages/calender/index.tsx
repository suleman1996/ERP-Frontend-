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
import { eventTypes } from './event-types';
import ProfileUpload from 'new-components/profile-upload';
import Container from 'new-components/container';

import location from 'assets/location.svg';
import person from 'assets/person1.svg';
import person2 from 'assets/person2.svg';

import style from './calender.module.scss';
import './calendar.scss';

interface Props {}
let tooltipInstance = null;

const Calender = () => {
  const { control } = useForm();

  const [openModal, setOpenModal] = useState(false);
  let month = 'dayGridMonth';
  let week = 'timeGridWeek';
  let day = 'timeGridDay';

  const events = [
    {
      id: 1,
      title: 'Weekly Meeting Projects',
      //   date: '2022-10-21',
      start: '2022-10-25T04:00:00',
      end: '2022-10-25T06:00:00',
      //   allDay: true,
      editable: false,
      clickable: false,
      imageurl: 'assets/person1.svg',
      extendedProps: {
        description: 'Khokkar Chowk, Johar Town, Lahore',
      },
    },
    {
      id: 1,
      title: 'Weekly Meeting Projects',
      start: '2022-10-25T04:00:00',
      end: '2022-10-25T06:00:00',
      editable: false,
      clickable: false,
      imageurl: 'assets/person2.svg',
      extendedProps: {
        description: 'Khokkar Chowk, Johar Town, Lahore',
      },
    },
    {
      id: 1,
      title: 'Weekly Meeting Projects',
      start: '2022-10-25T04:00:00',
      end: '2022-10-25T06:00:00',
      editable: false,
      clickable: false,
      imageurl: 'assets/person2.svg',
      extendedProps: {
        description: 'Khokkar Chowk, Johar Town, Lahore',
      },
    },
  ];

  const renderEventHandler = (eventInfo: any) => {
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
              src={!eventInfo?.event?.imageurl && person}
              height={28}
              width={28}
              style={{
                borderRadius: '30px',
                height: '30px',
                width: '30px',
              }}
            />
            <img
              src={!eventInfo?.event?.imageurl && person2}
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
    console.log(info, 'info');
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
      tooltipInstance.dispose();
      tooltipInstance = null;
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
          // views={{
          //   dayGridMonth: {
          //     // name of view
          //     titleFormat: { year: 'numeric', month: '2-digit', day: '2-digit' },
          //     // other view-specific options here
          //   },
          // }}
          customButtons={{
            myCustomButton: {
              text: 'custom!',
              click: function () {
                alert('clicked the custom button!');
              },
            },
          }}
          eventContent={renderEventHandler}
          //   customButtons={{
          //     new: {
          //       text: 'new',
          //       click: () => console.log('new event'),
          //     },
          //   }}
          datesRender={(arg) => {
            console.log(arg);
            console.log(arg.view.activeStart, 'active start'); //starting visible date
            console.log(arg.view.activeEnd, 'active end'); //ending visible date
          }}
          slotLabelInterval={{ hours: 1 }}
          events={events}
          handleWindowResize={true}
          contentHeight={'auto'}
          contentWidth={'auto'}
          nowIndicator
          //   eventMouseEnter={handleMouseEnter}
          //   eventMouseLeave={handleMouseLeave}
          dateClick={(e) => console.log(e.dateStr)}
          eventClick={(e) => console.log(e.event.id)}
          slotEventOverlap={false}
        />

        <Modal open={openModal} handleClose={() => setOpenModal(!openModal)} title={'Add Event'}>
          <div className={style.gridView}>
            <TextField label="Title" placeholder="Enter Event Name" star=" *" />
            <TextField label="Policy Number" placeholder="Enter Policy Name" star=" *" />
          </div>
          <div className={style.gridView}>
            <DatePicker
              label="Start Date & Time"
              control={control}
              name="startDate"
              star=" *"
              showTimeInput
              handleChange={(event) => console.log(event, 'date time')}
            />
            <DatePicker
              label="End Date & Time"
              control={control}
              name="endDate"
              star=" *"
              showTimeInput
              handleChange={(event) => console.log(event, ' end date time')}
            />
          </div>
          <div className={style.gridView}>
            <Selection label="Type" options={eventTypes} />
            <Selection label="Recurrence " options={eventTypes} />
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
