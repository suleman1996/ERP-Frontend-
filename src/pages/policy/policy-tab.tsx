import React, { useEffect, useState } from 'react';

import Button from 'components/button';

import CardContainer from 'components/card-container';

import plusIcon from 'assets/plusIcon.svg';
import del from 'assets/close.svg';
import filter from 'assets/filter.svg';

import style from './request.module.scss';
import RenderPolicy from 'components/policy-card';
import TextField from 'components/textfield';
import { useForm } from 'react-hook-form';

import DeletePopup from 'components/delete-modal';
import DatePicker from 'components/date-picker';

import Modal from 'components/modal';
import TextArea from 'components/textarea';
import ProfileUpload from 'components/profile-upload';
import Selection from 'components/select';
import RenderPolicySearchView from './policies-search';
import ViewPolicy from './view-policy';
import PdfViewModal from 'components/pdf-viewer';
import { sampleBase64pdf } from './pdfSample';
import PolicyService from 'services/policy-service';
import { setErrors } from 'helper';
import { createNotification } from 'common/create-notification';
import EmployeeService from 'services/employee-service';

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
}) => {
  return (
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
};

export default RenderPoliciesTab;
