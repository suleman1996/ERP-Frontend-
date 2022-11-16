import React, { useEffect, useState } from 'react';

import style from './request.module.scss';
import RenderPolicy from 'components/policy-card';

import PolicyService from 'services/policy-service';

import RenderPoliciesTab from './policy-tab';

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
  render,
  setSelectedPolicy,
  handleEdit,
  reset,
  policyCategory,
}: {
  setOpen: any;
  setSelectedTab: any;
  [key: string]: any;
}) => {
  const [policies, setPolicies] = React.useState([]);
  const [search, setSearch] = React.useState({ nameNumber: '', addedBy: '', categoryId: '' });

  useEffect(() => {
    getPoliciesService();
    // return () => {
    //   setSearch({ nameNumber: '', addedBy: '', categoryId: '' });
    // };
  }, [render, search]);

  const getPoliciesService = async () => {
    try {
      const result = await PolicyService.getAllPolicies({
        ...(search?.nameNumber && { search: search?.nameNumber }),
        ...(search?.categoryId && { category: search?.categoryId?.label }),
        ...(search?.addedBy && { addedBy: search?.addedBy?.value }),
      });
      // console.log('Here are all policies ', result?.data?.data);
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
        reset={reset}
        policyCategory={policyCategory}
        length={policies.length}
        setSearch={setSearch}
      />
      <div className={style.policyGridView}>
        {policies?.map((item) => (
          <RenderPolicy
            handleEdit={handleEdit}
            setSelectedPolicy={setSelectedPolicy}
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

export default RenderAllPolicies;
