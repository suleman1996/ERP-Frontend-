/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import moment from 'moment';
import * as yup from 'yup';
import SelectTag from 'react-select';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Modal from 'components/modal';
import Input from 'components/input';
import Radio from 'components/radio';
import Button from 'components/button';
import Select from 'components/select';
import NavLinks from 'components/nav-links';
import DayPicker from 'components/day-picker';
import DatePicker from 'components/date-picker';
import CalenderService from 'services/calender-service';
import MobileButton from 'components/button/mobile-button';

import back from 'assets/employee-page/Group 1992.svg';
import tickIcon from 'assets/mobile-view/tickIcon.svg';
import style from './calender.module.scss';

interface Option {
  label: string;
  value: {
    email: string;
    employeeId: string;
    name: string;
  };
}
interface Props {
  open?: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  eventData?: any;
  getEventData: (e?: any) => void;
  options: Option[];
  updateEventId?: string;
  setUpdateEventId: Dispatch<SetStateAction<string>>;
}

const AddEvent = ({
  open,
  eventData,
  updateEventId,
  setOpen,
  setIsOpen,
  getEventData,
  setUpdateEventId,
  options,
}: Props) => {
  const [val, setVal] = useState();
  const [day, setDay] = useState<string[]>();
  const styles = {
    valueContainer: (base: any) => ({
      ...base,
      maxHeight: 110,
      overflowY: 'auto',
    }),
  };
  const filteredOption = options.filter((ele) =>
    eventData?.extendedProps?.participants
      .map((x: any) => x?.employeeId)
      .includes(ele?.value?.employeeId),
  );
  const [dayArr, setDayArr] = useState<string[]>(['0']);
  const [isLoading, setIsLoading] = useState(false);
  const [participants, setParticipants] = useState(
    updateEventId ? filteredOption : options.length === 0 ? [] : [options[0]],
  );

  const { register, getValues, handleSubmit, errors, control, reset, watch } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const getDay = (value: string) => {
    // let temp: string[] = [...dayArr];
    let temp: string[] = [...['3']];
    let tempIndex = temp.findIndex((e: string) => e === value);
    // if (tempIndex < 0) {
    //   temp.push(value);
    // } else {
    //   temp.splice(tempIndex, 1);
    // }
    setDayArr(temp);
    if (updateEventId) {
      setDayArr(eventData?.extendedProps?.days);
    }
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    if (data.recursionEndDateSelection === 'Never') {
      data.recursionEndDate = 'Never';
    }
    delete data.recursionEndDateSelection;
    data['participants'] = participants.map((x) => x?.value);
    data.recursion = data?.recursion !== 'Non Recursive' ? data?.recursion : false;
    data.date = new Date(data.date).toString();
    const res = updateEventId
      ? await CalenderService.updateEvent(updateEventId, data)
      : await CalenderService.addEvent(data);
    if (res.status === 201) {
      setOpen(false);
      setIsOpen(false);
      getEventData();
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (updateEventId) {
      const recursion =
        eventData?.extendedProps?.recursion === 'false'
          ? 'Non Recursive'
          : eventData?.extendedProps?.recursion;
      const recursionEndDateSelection =
        eventData?.extendedProps?.recursionEndDate === 'Never' ? 'Never' : moment().format();
      reset({
        title: eventData?.title,
        description: eventData?.extendedProps?.description,
        type: eventData?.extendedProps?.type,
        recursion,
        scope: eventData?.extendedProps?.scope,
        time: eventData?.extendedProps?.time,
        days: eventData?.extendedProps?.days,
        date: new Date(eventData?.extendedProps?.date2),
        recursionEndDateSelection,
        recursionEndDate: new Date(eventData?.extendedProps?.recursionEndDate),
      });
      setDay(eventData?.extendedProps?.days);
    }
  }, []);

  useEffect(() => {
    const value = getValues('recursion');
    setVal(value);
  });

  useEffect(() => {
    setDayArr(['1']);
  }, []);

  return (
    <>
      <Modal
        open={open}
        className={style.modalWrapper}
        handleClose={() => {
          setOpen(false);
          setUpdateEventId('');
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => e.key !== 'Enter'}>
          <div className={style.modal}>
            <NavLinks links={[{ title: 'Event Details', left: '30px' }]} />
            <img src={back} alt="" className={style.img} onClick={() => setOpen(false)} />
          </div>
          <div className={style.add}>
            <Input
              name="title"
              label="Event Title"
              type="text"
              placeholder="Event Title"
              inputRef={register}
              error={errors?.title}
              errorMessage={errors?.title?.message}
            />
            <DatePicker
              minDate={new Date()}
              label="Date"
              name="date"
              id="1"
              placeholder="Date"
              control={control}
              error={errors?.date}
            />
            <Input
              name="time"
              label="Time"
              type="time"
              placeholder="Time"
              inputRef={register}
              error={errors?.time}
              errorMessage={errors?.time?.message}
            />
            <Select
              label="Type"
              name="type"
              options={eventList}
              inputRef={register}
              placeHolder="Select Type"
              error={errors?.type}
              errorMessage={errors?.type?.message}
            />
            <Select
              label="Scope"
              name="scope"
              options={scopes}
              inputRef={register}
              placeHolder="Select Scope"
              error={errors?.scope}
              errorMessage={errors?.scope?.message}
            />
            <Select
              label="Recursion"
              name="recursion"
              options={recursion}
              inputRef={register}
              placeHolder="Select Type"
              error={errors?.recursion}
              errorMessage={errors?.recursion?.message}
            />
            {(getValues('recursion') === 'Custom' ||
              (updateEventId && eventData?.extendedProps?.recursion !== 'false')) && (
              <div>
                <DayPicker
                  error={errors?.days}
                  selectDay={getDay}
                  name="days"
                  dayRef={register}
                  defaultValues={updateEventId ? eventData?.extendedProps?.days : []}
                />
              </div>
            )}
            {(recursionTypes.includes(getValues('recursion')) ||
              (updateEventId && eventData?.extendedProps?.recursion !== 'false')) && (
              <div style={{ padding: '10px 0px' }}>
                <label className={style.inputLabel}>Recursion Ends</label>
                <div className={style.customRecursion}>
                  <div className={style.leftDiv}>
                    <Radio
                      className={style.onRadio}
                      name="recursionEndDateSelection"
                      label="Never"
                      radioValue={'Never'}
                      radioRef={register}
                      error={errors?.recursionEndDate}
                      errorMessage={errors?.recursionEndDate?.message}
                      defaultChecked={
                        updateEventId && eventData?.extendedProps?.recursionEndDate === 'Never'
                      }
                    />
                    <Radio
                      name="recursionEndDateSelection"
                      label="On"
                      radioValue={moment().format()}
                      radioRef={register}
                      error={errors?.recursionEndDate}
                      errorMessage={errors?.recursionEndDate?.message}
                      defaultChecked={
                        updateEventId && eventData?.extendedProps?.recursionEndDate !== 'Never'
                      }
                    />
                  </div>
                  <div>
                    {watch('recursionEndDateSelection') !== 'Never' && (
                      <DatePicker
                        className={style.customDate}
                        minDate={getValues('date')}
                        name="recursionEndDate"
                        id="1"
                        placeholder="Date"
                        control={control}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
            <div>
              <div className={style.note}>
                <label>Description</label>
                <textarea
                  style={{
                    borderColor: errors?.description ? '#ff5050' : '',
                  }}
                  placeholder="Description"
                  name="description"
                  ref={register}
                  rows={6}
                ></textarea>
                {errors && (
                  <span className={style.errorMessage}>{errors?.description?.message}</span>
                )}
              </div>
            </div>
            {watch().scope === 'Private' && (
              <div className={style.note}>
                <label>participants</label>
                <SelectTag
                  options={options}
                  name={'participants'}
                  isMulti
                  styles={styles}
                  closeMenuOnSelect={false}
                  defaultValue={[...participants]}
                  ref={register}
                  onChange={(e: any) => {
                    setParticipants(e);
                  }}
                />
              </div>
            )}
          </div>
          <div className={style.webBtnDiv}>
            <Button
              text={updateEventId ? 'Update Event' : 'Create Event'}
              btnClass={style.btn}
              type="submit"
              isLoading={isLoading}
            />
          </div>
          <div className={style.mobileBtnDiv}>
            <MobileButton
              mobileIcon={tickIcon}
              btnClass={style.mobileBtn}
              type="submit"
              isLoading={isLoading}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddEvent;

const schema = yup
  .object()
  .shape({
    title: yup.string().required('Title is a required field'),
    type: yup.string().required('Type is a required field'),
    description: yup.string().optional(),
    time: yup.string().required('Time is a required field'),
    date: yup.date().required('Date is a required field'),
    scope: yup.string().required('Scope is a required field'),
    recursion: yup.string().required('Recursion is a required field'),
    recursionEndDate: yup.string().when('recursion', {
      is: 'true',
      then: yup.string().required('required field'),
    }),
    days: yup.array().when('recursion', {
      is: 'Custom',
      then: yup.array().min(1, 'Please Select At least 1 Day'),
    }),
  })
  .required();

const eventList = ['Occasion', 'Holiday', 'Meeting'];
const recursion = ['Non Recursive', 'Daily', 'Weekly', 'Monthly', 'Annual', 'Custom'];
const scopes = ['Public', 'Private'];
const recursionTypes = ['Daily', 'Weekly', 'Monthly', 'Annual', 'Custom'];
