import React, { useEffect, useState } from 'react';

import style from './request.module.scss';
import RenderPolicy from 'components/policy-card';

import RenderPoliciesTab from './policy-tab';

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

export default RenderObsolete;
