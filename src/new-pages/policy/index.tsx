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

import Modal from 'new-components/modal';
import TextArea from 'new-components/textarea';
import ProfileUpload from 'new-components/profile-upload';
import Selection from 'my-components/select';
import RenderPolicySearchView from './policies-search';
import ViewPolicy from './view-policy';
import PdfViewModal from 'new-components/pdf-viewer';
import { sampleBase64pdf } from './pdfSample';

const Policy = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [showFilterView, setShowFilterView] = useState(false);
  const [editPoplicy, setEditPolicy] = useState(false);

  const [open, setOpen] = useState(false);
  const [openAddPolice, setOpenAddPolice] = useState(false);
  const [openPolicyPdfView, setOpenViewPdfPolicy] = useState(false);

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

  return (
    <>
      <CardContainer>
        {selectedTab == 0 ? (
          <RenderAllPolicies
            setOpen={setOpen}
            setSelectedTab={setSelectedTab}
            control={control}
            selectedTab={selectedTab}
            setOpenAddPolice={setOpenAddPolice}
            setShowFilterView={setShowFilterView}
            showFilterView={showFilterView}
            options={options}
            setEditPolicy={setEditPolicy}
            setOpenViewPdfPolicy={setOpenViewPdfPolicy}
          />
        ) : (
          <RenderObsolete
            setOpen={setOpen}
            control={control}
            selectedTab={selectedTab}
            setOpenAddPolice={setOpenAddPolice}
            setSelectedTab={setSelectedTab}
            setShowFilterView={setShowFilterView}
            showFilterView={showFilterView}
            options={options}
            setEditPolicy={setEditPolicy}
            setOpenViewPdfPolicy={setOpenViewPdfPolicy}
          />
        )}
      </CardContainer>

      <DeletePopup setOpen={setOpen} open={open} />
      {/* <AddPolicy /> */}
      <Modal
        open={openAddPolice}
        text="Done"
        iconEnd={undefined}
        title={editPoplicy ? 'Update Policy' : 'Add Policy'}
        handleClose={() => setOpenAddPolice(false)}
      >
        <div className={style.gridView}>
          <TextField label="Name" placeholder="Enter Policy Name" star=" *" />
          <TextField label="Policy Number" placeholder="Enter Policy Name" star=" *" />
        </div>
        <div className={style.gridView}>
          <TextField label="Version" placeholder="Enter Policy Version" star=" *" />
          {/* <TextField label="Category" placeholder="Enter Policy Category" star=" *" /> */}
          <Selection
            wraperSelect={style.wraperSelect}
            label="Category"
            placeholder="Category"
            options={options}
            star=" *"
            onChange={(item) => console.log(item)}
          />
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
          <div>
            <div style={{ display: 'flex' }}>
              <p style={{ fontSize: 17, color: '#2d2d32', marginRight: 5 }}>Attach Pdf </p>
              <b style={{ color: 'red' }}> *</b>
            </div>
            <ProfileUpload
              name={'frontPic'}
              // register={register}
              type="application/pdf,application/vnd.ms-excel"
              id={'frontPic'}
              // errorMessage={'errors?.frontPic?.message'}
              // selectedFileName={selectedFileName}
              // setSelectedFileName={setSelectedFileName}
            />
          </div>
        </div>
        <div className={style.gridView1}>
          <TextArea label="Discription" placeholder="Enter Discription" star=" *" />
        </div>
      </Modal>
      <PdfViewModal
        openPolicyPdfView={openPolicyPdfView}
        setOpenViewPdfPolicy={setOpenViewPdfPolicy}
        pdf={sampleBase64pdf}
      />
    </>
  );
};

const RenderAllPolicies = ({
  setOpen,
  control,
  selectedTab,
  setOpenAddPolice,
  setSelectedTab,
  setShowFilterView,
  showFilterView,
  options,
  setEditPolicy,
  setOpenViewPdfPolicy,
}: {
  setOpen: any;
  setSelectedTab: any;
  [key: string]: any;
}) => (
  <div className={style.policyMainView}>
    <RenderPoliciesTab
      control={control}
      selectedTab={selectedTab}
      setOpenAddPolice={setOpenAddPolice}
      setSelectedTab={setSelectedTab}
      setShowFilterView={setShowFilterView}
      showFilterView={showFilterView}
      options={options}
      setEditPolicy={setEditPolicy}
    />
    <div className={style.policyGridView}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
        <RenderPolicy
          setOpenAddPolice={setOpenAddPolice}
          setOpen={setOpen}
          setSelectedTab={setSelectedTab}
          setEditPolicy={setEditPolicy}
          setOpenViewPdfPolicy={setOpenViewPdfPolicy}
        />
      ))}
    </div>
  </div>
);

const RenderObsolete = ({
  setOpen,
  control,
  selectedTab,
  setOpenAddPolice,
  setSelectedTab,
  setShowFilterView,
  showFilterView,
  options,
  setEditPolicy,
  setOpenViewPdfPolicy,
}: {
  [key: string]: any;
}) => (
  <div className={style.policyMainView}>
    <RenderPoliciesTab
      control={control}
      selectedTab={selectedTab}
      setOpenAddPolice={setOpenAddPolice}
      setSelectedTab={setSelectedTab}
      setShowFilterView={setShowFilterView}
      showFilterView={showFilterView}
      options={options}
      setEditPolicy={setEditPolicy}
    />
    <div className={style.policyGridView}>
      {[1, 2, 3, 4, 5].map((item) => (
        <RenderPolicy
          setOpenAddPolice={setOpenAddPolice}
          setOpen={setOpen}
          setSelectedTab={setSelectedTab}
          setEditPolicy={setEditPolicy}
          setOpenViewPdfPolicy={setOpenViewPdfPolicy}
        />
      ))}
    </div>
  </div>
);

const RenderPoliciesTab = ({
  selectedTab,
  setSelectedTab,
  setShowFilterView,
  showFilterView,
  control,
  setOpenAddPolice,
  options,
  setEditPolicy,
}: {
  selectedTab: any;
  setSelectedTab: any;
  setShowFilterView: any;
  showFilterView: any;
  control: any;
  setOpenAddPolice: any;
  options: any;
  setEditPolicy: any;
}) => (
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
          style={{ cursor: 'pointer', height: 35, width: 35 }}
          src={filter}
          alt=""
          className={style.img}
        />
        <Button
          handleClick={() => {
            setOpenAddPolice(true);
            setEditPolicy(false);
          }}
          iconStart={plusIcon}
          text="Add Policy"
        />
      </div>
    </div>
    {showFilterView && <RenderPolicySearchView options={options} control={control} />}
  </>
);

export default Policy;
