import React, { useEffect, useState } from 'react';

import TextField from 'new-components/textfield';
import style from './custom.module.scss';
import CardContainer from 'new-components/card-container';
import Checkbox from 'new-components/checkbox';

import downArrow from 'new-assets/select-arrow.svg';

interface Props {
  value?: string;
  name?: string;
  register?: any;
  label?: string;
}

const CustomSelect = ({ value, name, register, label }: Props) => {
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState([]);

  //   const handlePartyCheckBox = (value) => {
  //     if (partyValue === value) {
  //       setPartValue('');
  //       setValue('partyName', '');
  //     } else {
  //       setPartValue(value);
  //       setValue('partyName', value);
  //     }
  //   };

  const handleClick = (e: any) => {
    const { id, checked } = e.target;
    setCheck([...check, id]);
    if (!checked) {
      setCheck(check.filter((item) => item !== id));
    }
  };
  console.log(check, 'chek---------------');

  return (
    <div>
      <>
        {open && (
          <div
            onClick={() => setOpen(false)}
            style={{
              inset: 0,
              position: 'fixed',
              backgroundColor: 'transparent',
              zIndex: 20,
            }}
          />
        )}

        <div className={style.position}>
          <div>
            <div className={style.flexOutline} onClick={() => setOpen(!open)}>
              <TextField
                label={label}
                id="outlined-basic"
                placeholder="Select Attendees"
                type="text"
                name={name}
                value={check}
                className={style.field}
                register={register}
                icon={downArrow}
                iconClass={`${style.imgSearch} ${open ? style.rotate : ''}`}
              />
            </div>
            {/* <span className={style.errorMessage}>{helperText}</span> */}
          </div>

          {open && (
            <CardContainer className={style.card}>
              {options?.length === 0 ? (
                <h1 style={{ textAlign: 'center', fontSize: '16px' }}>No Data Found</h1>
              ) : (
                options?.map((ele, index) => (
                  <div className={style.flexDiv} key={index}>
                    <Checkbox id={ele.id} label={ele.label} />
                    {ele.checkArr?.map((ch: any, ind: any) => (
                      <div className={style.flexInner} key={ind}>
                        <Checkbox
                          id={ch.id}
                          label={ch.label}
                          handleChange={handleClick}
                          //   onClick={() => handlePlatformPartyCheckBox(ele.value)}
                        />
                      </div>
                    ))}
                  </div>
                ))
              )}
            </CardContainer>
          )}
        </div>
      </>
    </div>
  );
};

export default CustomSelect;

const options = [
  {
    label: 'Management',
    id: '1',
    checkArr: [
      {
        label: 'HR',
        value: 'HR',
        id: '2',
      },
      {
        label: 'Project Manager',
        value: 'ProjectManager',
        id: ' 3',
      },
    ],
  },
  {
    label: 'Development',
    id: ' 4',
    checkArr: [
      {
        label: 'HR',
        value: 'HR',
        id: '5',
      },
      {
        label: 'Project Manager',
        value: 'ProjectManager',
        id: ' 6',
      },
    ],
  },
];
