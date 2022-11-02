import React, { useEffect, useState } from 'react';

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
import PolicyService from 'services/policy-service';
import { setErrors } from 'helper';
import { createNotification } from 'common/create-notification';
import EmployeeService from 'services/employee-service';

const Policy = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [showFilterView, setShowFilterView] = useState(false);
  const [editPoplicy, setEditPolicy] = useState(false);

  const [open, setOpen] = useState(false);
  const [openAddPolice, setOpenAddPolice] = useState(false);
  const [openPolicyPdfView, setOpenViewPdfPolicy] = useState(false);

  const [employees] = React.useState<any>([]);

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

  const { control, register, errors, setError, clearErrors, handleSubmit } = useForm({
    mode: 'all',
  });

  React.useEffect(() => {
    getAllEmployees();
  }, []);

  const getAllEmployees = async () => {
    try {
      const result = await EmployeeService.getAllEmployees();
      console.log('Her are all employees ', result?.data?.employees[0]?.data);
      result?.data?.employees[0]?.data?.map((item: any) =>
        employees.push({ value: item?._id, label: item?.fullName }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddPolicy = async (data: any) => {
    console.log('fffhj fdj ', data);

    try {
      const policyData = {
        name: 'Leave policy 20',
        policyNumber: 'LP1',
        version: 1,
        categoryId: '634d56b223c6560844875f33',
        effectiveDate: '2022-10-17',
        preparedBy: '634d794828e365a9e7bae18b',
        approvedBy: '634d794828e365a9e7bae18b',
        reviewers: ['634e4a3ab0cd54de3c7f30a7', '634e5889ca126baa62c8c7f7'],
        appliesTo: ['634d794828e365a9e7bae18b', '634e6dceb3ad4b4f49eeaeea'],
        description: 'Policy relating leaves',
      };
      const result = await PolicyService.addPolicyApi('');
      console.log(result);
    } catch (err: any) {
      console.log('error ', err.response.data);
      if (err?.response?.data?.error) {
        setErrors(err?.response?.data?.error, setError);
      }
      createNotification('error', 'Error', err?.response?.data?.msg);
      // setBtnLoader(false);
    }
  };

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
            options={employees}
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
            options={employees}
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
        type="submit"
        form="AddPolicy"
      >
        <form
          onSubmit={(e) => {
            clearErrors();
            handleSubmit(handleAddPolicy)(e);
          }}
          id="AddPolicy"
        >
          <div className={style.gridView}>
            <TextField
              register={register}
              label="Name"
              placeholder="Enter Policy Name"
              star=" *"
              name="name"
              errorMessage={errors?.name?.message}
            />
            <TextField
              register={register}
              label="Policy Number"
              placeholder="Enter Policy Name"
              star=" *"
              name="policyNumber"
              errorMessage={errors?.policyNumber?.message}
            />
          </div>
          <div className={style.gridView}>
            <TextField
              register={register}
              label="Version"
              placeholder="Enter Policy Version"
              star=" *"
              name="version"
              errorMessage={errors?.version?.message}
            />
            {/* <TextField label="Category" placeholder="Enter Policy Category" star=" *" /> */}
            <Selection
              wraperSelect={style.wraperSelect}
              label="Category"
              placeholder="Category"
              options={employees}
              star=" *"
              onChange={(item) => console.log(item)}
              name="categoryId"
              errorMessage={errors?.categoryId?.message}
              control={control}
            />
          </div>
          <div className={style.gridView}>
            <DatePicker
              label="Effective Date"
              control={control}
              errorMessage={errors?.effectiveDate?.message}
              name="effectiveDate"
              star=" *"
            />
            <Selection
              control={control}
              errorMessage={errors?.preparedBy?.message}
              wraperSelect={style.wraperSelect}
              label="Prepared By"
              placeholder="Prepared By"
              options={employees}
              star=" *"
              onChange={(item) => console.log(item)}
              name="preparedBy"
            />
          </div>
          <div className={style.gridView}>
            <Selection
              name="reviewers"
              errorMessage={errors?.reviewers?.message}
              control={control}
              wraperSelect={style.wraperSelect}
              label="Reviewed By"
              placeholder="Reviewed By"
              options={employees}
              star=" *"
              onChange={(item) => console.log(item)}
            />

            <Selection
              control={control}
              errorMessage={errors?.approvedBy?.message}
              wraperSelect={style.wraperSelect}
              label="Approved By"
              placeholder="Approved By"
              options={employees}
              star=" *"
              onChange={(item) => console.log(item)}
              name="approvedBy"
            />
          </div>

          <div className={style.gridView}>
            <Selection
              control={control}
              errorMessage={errors?.appliesTo?.message}
              wraperSelect={style.wraperSelect}
              label="Applies to"
              placeholder="Applies to"
              options={multiOptions}
              star=" *"
              onChange={(item) => console.log(item)}
              closeMenuOnSelect={false}
              isMulti={true}
              name="appliesTo"
            />
            <div>
              <div style={{ display: 'flex' }}>
                <p style={{ fontSize: 17, color: '#2d2d32', marginRight: 5 }}>Attach Pdf </p>
                {/* <b style={{ color: 'red' }}> *</b> */}
              </div>
              <ProfileUpload
                name={'pdf'}
                register={register}
                type="application/pdf,application/vnd.ms-excel"
                id={'frontPic'}
                errorMessage={errors?.pdf?.message}
                // selectedFileName={selectedFileName}
                // setSelectedFileName={setSelectedFileName}
              />
            </div>
          </div>
          <div className={style.gridView1}>
            <TextArea
              label="Discription"
              placeholder="Enter Discription"
              // star=" *"
              register={register}
              name="discription"
              errorMessage={errors?.discription?.message}
            />
          </div>
        </form>
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
}) => {
  const [policies, setPolicies] = React.useState([]);

  useEffect(() => {
    getPoliciesService();
  }, []);

  const getPoliciesService = async () => {
    try {
      const result = await PolicyService.getAllPolicies();
      console.log('Here are all policies ', result?.data?.data);
      setPolicies(result?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
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
        {policies?.map((item) => (
          <RenderPolicy
            data={item}
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
};

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
}) => {
  return (
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
            data={item}
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
};

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
