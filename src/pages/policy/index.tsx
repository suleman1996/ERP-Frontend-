import React, { useEffect, useState } from 'react';

import CardContainer from 'components/card-container';

import style from './request.module.scss';

import TextField from 'components/textfield';
import { useForm } from 'react-hook-form';
import moment from 'moment';

import DeletePopup from 'components/delete-modal';
import DatePicker from 'components/date-picker';

import Modal from 'components/modal';
import TextArea from 'components/textarea';
import ProfileUpload from 'components/profile-upload';
import Selection from 'components/selection';
import PdfViewModal from 'components/pdf-viewer';
import { sampleBase64pdf } from './pdfSample';
import PolicyService from 'services/policy-service';
import { setErrors } from 'helper';
import { createNotification } from 'common/create-notification';
import EmployeeService from 'services/employee-service';
import RenderAllPolicies from './render-all-policy';
import RenderObsolete from './render-obselete-policy';
import { convertBase64Image } from 'main-helper';
import SettingsService from 'services/settings-service';

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
  const [policyCategory] = React.useState<any>([]);
  const [employeesWithDep] = React.useState<any>([]);

  const { control, register, errors, setError, clearErrors, handleSubmit, reset } = useForm({
    mode: 'all',
  });

  React.useEffect(() => {
    getAllEmployees();
    getEmployeesWithDep();
    getPolicyCategory();
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

  const getEmployeesWithDep = async () => {
    try {
      const result = await EmployeeService.getEmployeesWithDepApi();
      console.log('Her are all employees with departments ', result?.data?.employeesWithDepartment);
      result?.data?.employeesWithDepartment?.map((item: any) => {
        employeesWithDep.push({
          options: item?.employees?.map((ite: any) => ({ value: ite?._id, label: ite?.fullName })),
          label: item?._id?.name,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getPolicyCategory = async () => {
    try {
      const result = await SettingsService.getPolicyCat();
      console.log('Her are all policy category ', result?.data?.policyCategory);
      result?.data?.policyCategory?.map((item: any) =>
        policyCategory?.push({ value: item?._id, label: item?.name }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddPolicy = async (data: any) => {
    console.log('Here is the add policy form ', data);

    const pdffile = await convertBase64Image(data?.pdf[0]);

    try {
      const policyData = {
        name: data?.name,
        policyNumber: data?.policyNumber,
        version: Number(data?.version),
        categoryId: data?.categoryId?.value,
        effectiveDate: moment(new Date(data?.effectiveDate)).format('YYYY-MM-DD'),
        preparedBy: data?.preparedBy?.value,
        approvedBy: data?.approvedBy?.value,
        reviewers: [data?.reviewers?.value],
        appliesTo: data?.appliesTo ? data?.appliesTo.map((item: any) => item?.value) : [],
        description: data?.discription,
        file: pdffile,
      };

      const result = await PolicyService.addPolicyApi(policyData);

      console.log('Here is the success add policy msg ', result);
      setRender(!render);
      setOpenAddPolice(false);
    } catch (err: any) {
      console.log('error from add policy ', err?.response?.data);
      if (err?.response?.data?.error) {
        setErrors(err?.response?.data?.error, setError);
      }
      createNotification('error', 'Error', err?.response?.data?.msg);
      // setBtnLoader(false);
    }
  };

  const deletePolicy = async () => {
    try {
      const result = await PolicyService.deletePolicy(selectedPolicy?._id);
      console.log('HEre is the delete policy result  ', result);
      setRender(!render);
      setOpen(false);
      // console.log(' selectedPolicy ', selectedPolicy);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (data: any) => {
    const {
      appliesTo,
      approvedBy,
      categoryId,
      effectiveDate,
      name,
      policyNumber,
      preparedBy,
      reviewers,
      version,
    } = data;

    let temp = [];
    appliesTo?.map((item: amy) => temp?.push({ label: item?.fullName, value: item?._id }));

    reset({
      appliesTo: temp,
      approvedBy: { value: approvedBy?._id, label: approvedBy?.fullName },
      categoryId: { value: categoryId?._id, label: categoryId?.name },
      // effectiveDate,
      name,
      policyNumber,
      preparedBy: { value: preparedBy?._id, label: preparedBy?.fullName },
      reviewers: { value: reviewers[0]?._id, label: reviewers[0]?.fullName },
      version,
    });
    console.log('all values ', data);

    // console.log('Edit function called ', dat);
  };

  const updatePolicy = async (data: any) => {
    const pdffile = await convertBase64Image(data?.pdf[0]);
    console.log('update data ', selectedPolicy?._id);

    try {
      const policyData = {
        name: data?.name,
        policyNumber: data?.policyNumber,
        version: Number(data?.version),
        categoryId: data?.categoryId?.value,
        effectiveDate: moment(new Date(data?.effectiveDate)).format('YYYY-MM-DD'),
        preparedBy: data?.preparedBy?.value,
        approvedBy: data?.approvedBy?.value,
        reviewers: [data?.reviewers?.value],
        appliesTo: data?.appliesTo ? data?.appliesTo.map((item: any) => item?.value) : [],
        description: data?.discription,
        file: pdffile,
      };

      const result = await PolicyService.updatePolicyApi(policyData, selectedPolicy?._id);

      console.log('Here is the success add update policy ', result);
      setRender(!render);
      setOpenAddPolice(false);
    } catch (err: any) {
      console.log('error from add policy ', err?.response?.data);
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
            render={render}
            reset={reset}
            handleEdit={handleEdit}
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
            reset={reset}
            handleEdit={handleEdit}
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
            editPoplicy ? handleSubmit(updatePolicy)(e) : handleSubmit(handleAddPolicy)(e);
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
              options={policyCategory}
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
              placeholder="Effective Date"
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
              options={employeesWithDep}
              star=" *"
              // onChange={(item) => console.log(item)}
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
                id={'file'}
                errorMessage={errors?.pdf?.message}
                // selectedFileName={selectedFileName}
                // setSelectedFileName={setSelectedFileName}
              />
            </div>
          </div>
          <div className={style.gridView1}>
            <TextArea
              label="Description"
              placeholder="Enter Description"
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
