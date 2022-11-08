import CardContainer from 'components/card-container';
import React, { useState } from 'react';

import AccordianSwitch from 'components/accordian';

import addIcon from 'assets/add.svg';
import style from './access.module.scss';
import Input from 'components/input';
import Button from 'components/button';

const AccessLevel = () => {
  const [toggle, setToggle] = useState(0);
  const [newUser, setNewUser] = useState(false);

  const [openAccordian, setOpenAccordian] = useState(-1);

  return (
    <div style={{ padding: '20px' }}>
      <CardContainer>
        <div className={style.innderDivs}>
          <div>
            <div className={style.rolesAddText}>
              <p>Roles</p>
              <div className={style.iconDiv} onClick={() => setNewUser(true)}>
                <img src={addIcon} />
                <span>Add New Role</span>
              </div>
            </div>
            <div>
              {roles?.map((role, index) => {
                return (
                  <div
                    className={`${style.blocks}  ${toggle === index ? style.activeClass : ''} `}
                    onClick={() => setToggle(index)}
                  >
                    {role}
                  </div>
                );
              })}

              {newUser && (
                <div style={{ display: 'flex', width: '100%' }}>
                  <Input
                    name={'name'}
                    placeholder={'Add New Role'}
                    iconClass={style.iconClass}
                    containerClass={style.containerClassInput}
                  />
                  <Button
                    text="Add Role"
                    type="submit"
                    btnClass={style.btnClass}
                    handleClick={() => setNewUser(false)}
                  />
                </div>
              )}
            </div>
          </div>

          {/* ////////////////////////////// Access ///////////////////////////// */}
          <div className={style.accessHeader}>
            <p>Access</p>
            {totalAccordian?.map((data) => {
              return (
                <AccordianSwitch
                  title={'Profile'}
                  switchBtn
                  bodyData={addProfileData}
                  id={data?.id}
                  openAccordian={openAccordian}
                  setOpenAccordian={setOpenAccordian}
                />
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button text="Save" type="submit" btnClass={style.submitBtn} />
        </div>
      </CardContainer>
    </div>
  );
};

export default AccessLevel;

const roles = [
  'CEO',
  'Director',
  'CTO',
  'Operational Manager',
  'Human Resource Manager',
  'Frontend Developer',
  'Backend Developer',
  'UX | UI Designer',
  'SQA Engineer',
  'SQA Engineer',
];

const addProfileData = [
  { name: 'Add Employee' },
  { name: 'Edit Employee' },
  { name: 'View Employee' },
  { name: 'Delete Employee' },
  { name: 'CV View' },
  { name: 'Profile View' },
];

const totalAccordian = [
  { name: '1', id: 1 },
  { name: '1', id: 2 },
  { name: '1', id: 3 },
];