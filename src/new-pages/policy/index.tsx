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

import DeletePopup from 'new-components/delete-modal';
import DatePicker from 'new-components/date-picker';
import { DropDownSelect } from 'new-components/drop-down-select';

import Modal from 'new-components/modal';
import TextArea from 'new-components/textarea';
import ProfileUpload from 'new-components/profile-upload';
import Selection from 'my-components/select';

const Policy = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [showFilterView, setShowFilterView] = useState(false);

  const [open, setOpen] = useState(false);
  const [openAddPolice, setOpenAddPolice] = useState(false);

  const options = [
    { value: 'Ali', label: 'Ali' },
    { value: 'Umair', label: 'Umair' },
    { value: 'Faizan', label: 'Faizan' },
  ];

  const multiOptions = [
    {
      options: [
        { value: '1', label: 'Ali' },
        { value: '2', label: 'Umair' },
        { value: '3', label: 'Faizan' },
      ],
      label: 'HR',
    },
    {
      options: [
        { value: '4', label: 'Ibtassam' },
        { value: '5', label: 'Suleman' },
        { value: '6', label: 'Haseeb' },
      ],
      label: 'IT',
    },
    {
      options: [
        { value: '7', label: 'Maira' },
        { value: '8', label: 'Huda' },
        { value: '9', label: 'Fatima' },
      ],
      label: 'SE',
    },
  ];

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
            handleClick={() => setOpenAddPolice(true)}
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

      <DeletePopup setOpen={setOpen} open={open} />
      {/* <AddPolicy /> */}
      <Modal
        open={openAddPolice}
        text="Done"
        iconEnd={undefined}
        title="Add Policy"
        handleClose={() => setOpenAddPolice(false)}
      >
        <div className={style.gridView}>
          <TextField label="Name" placeholder="Enter Policy Name" star=" *" />
          <TextField label="Policy Number" placeholder="Enter Policy Name" star=" *" />
        </div>
        <div className={style.gridView}>
          <TextField label="Version" placeholder="Enter Policy Version" star=" *" />
          <TextField label="Category" placeholder="Enter Policy Category" star=" *" />
        </div>
        <div className={style.gridView}>
          <DatePicker label="Effective Date" control={control} name="Effective Date" star=" *" />
          <Selection
            wraperSelect={style.wraperSelect}
            label="Prepared By"
            placeholder="Prepared By"
            options={options}
            star=" *"
            onChange={(item) => console.log(item)}
          />
        </div>
        <div className={style.gridView}>
          <Selection
            wraperSelect={style.wraperSelect}
            label="Reviewed By"
            placeholder="Reviewed By"
            options={options}
            star=" *"
            onChange={(item) => console.log(item)}
          />

          <Selection
            wraperSelect={style.wraperSelect}
            label="Approved By"
            placeholder="Approved By"
            options={options}
            star=" *"
            onChange={(item) => console.log(item)}
          />
        </div>

        <div className={style.gridView}>
          {/* <TextField label="Applies to" placeholder="MSDD  Applies to" star=" *" /> */}

          <Selection
            wraperSelect={style.wraperSelect}
            label="Applies to"
            placeholder="Applies to"
            options={multiOptions}
            star=" *"
            onChange={(item) => console.log(item)}
            closeMenuOnSelect={false}
            isMulti={true}
          />
          <ProfileUpload />
        </div>
        <div className={style.gridView1}>
          <TextArea label="Discription" placeholder="Enter Discription" star=" *" />
        </div>
      </Modal>
    </>
  );
};

export default Policy;
