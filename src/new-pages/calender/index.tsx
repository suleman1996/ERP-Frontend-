/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';
import moment from 'moment';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Tooltip, Popover } from 'bootstrap';

import location from 'assets/location.svg';
import person from 'assets/person1.svg';
import person2 from 'assets/person2.svg';

import Container from 'new-components/container';

import style from './calender.module.scss';
import './calendar.scss';

interface Props {}
let tooltipInstance = null;

const Calender = () => {
  const events = [
    {
      id: 1,
      title: 'Weekly Meeting Projects',
      //   date: '2022-10-21',
      start: '2022-10-21T04:00:00',
      end: '2022-10-21T06:00:00',
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
      start: '2022-10-21T04:00:00',
      end: '2022-10-21T06:00:00',
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
      start: '2022-10-21T04:00:00',
      end: '2022-10-21T06:00:00',
      editable: false,
      clickable: false,
      imageurl: 'assets/person2.svg',
      extendedProps: {
        description: 'Khokkar Chowk, Johar Town, Lahore',
      },
    },
  ];

  const renderEventHandler = (eventInfo: any) => {
    console.log(eventInfo);
    const { event } = eventInfo;
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
    // alert(JSON.stringify(info.event.extendedProps.description));
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
        <FullCalendar
          plugins={[interactionPlugin, timeGridPlugin, dayGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          eventContent={renderEventHandler}
          //   customButtons={{
          //     new: {
          //       text: 'new',
          //       click: () => console.log('new event'),
          //     },
          //   }}

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
      </Container>
    </div>
  );
};
export default Calender;
