import React, { useState } from 'react';

import TextField from 'new-components/textfield';
import style from './custom.module.scss';
import CardContainer from 'new-components/card-container';
import Checkbox from 'new-components/checkbox';

import downArrow from 'new-assets/select-arrow.svg';

interface Props {
  value?: string;
  name?: string;
  register?: any;
}

const CustomSelect = ({ value, name, register }: Props) => {
  const [open, setOpen] = useState(false);

  //   const handlePartyCheckBox = (value) => {
  //     if (partyValue === value) {
  //       setPartValue('');
  //       setValue('partyName', '');
  //     } else {
  //       setPartValue(value);
  //       setValue('partyName', value);
  //     }
  //   };

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
              zIndex: 100,
            }}
          />
        )}

        <div className={style.position}>
          <div>
            <div className={style.flexOutline} onClick={() => setOpen(!open)}>
              <TextField
                label="Custom Select"
                id="outlined-basic"
                placeholder="Search Party"
                type="text"
                name={name}
                value={value}
                className={style.field}
                register={register}
              />
              <img
                src={downArrow}
                alt=""
                className={style.imgSearch}
                style={{ transform: open && 'rotate(-180deg)' }}
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
        id: '2',
      },
      {
        label: 'Project Manager',
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
        id: '5',
      },
      {
        label: 'Project Manager',
        id: ' 6',
      },
    ],
  },
];
