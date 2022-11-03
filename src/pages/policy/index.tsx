import React, { useState } from 'react';

import CardContainer from 'components/card-container';

import style from './request.module.scss';

import TextField from 'components/textfield';
import { useForm } from 'react-hook-form';

import DeletePopup from 'components/delete-modal';
import DatePicker from 'components/date-picker';

import Modal from 'components/modal';
import TextArea from 'components/textarea';
import ProfileUpload from 'components/profile-upload';
import Selection from 'components/select';
import PdfViewModal from 'components/pdf-viewer';
import { sampleBase64pdf } from './pdfSample';
import PolicyService from 'services/policy-service';
import { setErrors } from 'helper';
import { createNotification } from 'common/create-notification';
import EmployeeService from 'services/employee-service';
import RenderAllPolicies from './render-all-policy';
import RenderObsolete from './render-obselete-policy';

const Policy = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [showFilterView, setShowFilterView] = useState(false);
  const [editPoplicy, setEditPolicy] = useState(false);

  const [open, setOpen] = useState(false);
  const [openAddPolice, setOpenAddPolice] = useState(false);
  const [openPolicyPdfView, setOpenViewPdfPolicy] = useState(false);
  const [render, setRender] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState({ _id: '' });

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
      const result = await PolicyService.addPolicy('');
      console.log(result);
    } catch (err: any) {
      console.log('error ', err?.response?.data);
      if (err?.response?.data?.error) {
        setErrors(err?.response?.data?.error, setError);
      }
      createNotification('error', 'Error', err?.response?.data?.msg);
      // setBtnLoader(false);
    }
  };

  const deletePolicy = async () => {
    console.log('going to delete this policy ', selectedPolicy?._id);

    try {
      const result = await PolicyService.deletePolicy(selectedPolicy?._id);
      console.log('HEre is the delete policy result  ', result);
      setRender(!render);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CardContainer>
        {selectedTab == 0 ? (
          <RenderAllPolicies
            render={render}
            setSelectedPolicy={setSelectedPolicy}
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

      <DeletePopup handleDelete={() => deletePolicy()} setOpen={setOpen} open={open} />
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

export default Policy;
