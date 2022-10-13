import React, { useState } from 'react';

import Button from 'new-components/button';

import CardContainer from 'components/card-container';

import plusIcon from 'assets/mobile-view/plusIcon.svg';
import del from 'assets/close.svg';
import filter from 'assets/filter.svg';

import style from './request.module.scss';
import RenderPolicy from 'components/policy-card';
import TextField from 'new-components/textfield';
import { useForm } from 'react-hook-form';
import DeletePolicie from './delete-policy';
import DatePicker from 'new-components/date-picker';
import { DropDownSelect } from 'new-components/drop-down-select';

const Policy = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [showFilterView, setShowFilterView] = useState(false);

  const [open, setOpen] = useState(false);

  const { control } = useForm();

  const RenderPolicySearchView = () => (
    <div className={style.policySearchView}>
      <TextField placeholder="Job Title" />
      <DropDownSelect />

      <DatePicker control={control} name="gg" />
      <Button text="Search" />
    </div>
  );

  const RenderPoliciesTab = () => (
    <>
      <div className={style.policyHeaderView}>
        <div className={style.headerTitleView}>
          <p
            onClick={() => setSelectedTab(0)}
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: selectedTab == 0 ? '#2D2D32' : '#CACACA',
            }}
          >
            All Policies
          </p>
          <p
            onClick={() => setSelectedTab(1)}
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: selectedTab == 1 ? '#2D2D32' : '#CACACA',
              marginLeft: 20,
            }}
          >
            Obsolete
          </p>
        </div>
        <div className={style.addPolicyView}>
          <img
            onClick={() => setShowFilterView(!showFilterView)}
            style={{ cursor: 'pointer' }}
            src={filter}
            alt=""
            className={style.img}
          />
          <Button
            handleClick={() => console.log('clicked')}
            iconStart={plusIcon}
            text="Add Policy"
          />
          <img style={{ cursor: 'pointer' }} src={del} alt="" className={style.img} />
        </div>
      </div>
      {showFilterView && <RenderPolicySearchView />}
    </>
  );

  const RenderAllPolicies = () => (
    <div className={style.policyMainView}>
      <RenderPoliciesTab />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4 , 1fr )' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <RenderPolicy setOpen={setOpen} setSelectedTab={setSelectedTab} />
        ))}
      </div>
    </div>
  );

  const RenderObsolete = () => (
    <div className={style.policyMainView}>
      <RenderPoliciesTab />
    </div>
  );

  return (
    <>
      <CardContainer>{selectedTab == 0 ? <RenderAllPolicies /> : <RenderObsolete />}</CardContainer>
      <DeletePolicie setOpen={setOpen} visible={open} />
    </>
  );
};

export default Policy;
