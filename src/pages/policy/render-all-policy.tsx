import React, { useEffect } from 'react';

import RenderPolicy from 'components/policy-card';

import PolicyService from 'services/policy-service';

import RenderPoliciesTab from './policy-tab';
import CardContainer from 'components/card-container';

import style from './request.module.scss';

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
  setLoading,
}: {
  setOpen: any;
  setSelectedTab: any;
  [key: string]: any;
}) => {
  const [policies, setPolicies] = React.useState([]);
  const [search, setSearch] = React.useState({ nameNumber: '', addedBy: '', categoryId: '' });

  useEffect(() => {
    getPoliciesService();
  }, [render, search]);

  const getPoliciesService = async () => {
    try {
      setLoading(true);
      const result = await PolicyService.getAllPolicies({
        ...(search?.nameNumber && { search: search?.nameNumber }),
        ...(search?.categoryId && { category: search?.categoryId?.label }),
        ...(search?.addedBy && { addedBy: search?.addedBy?.value }),
      });
      setPolicies(result?.data?.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <CardContainer className={style.className}>
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
        length={policies?.length > 0 && policies?.length}
        setSearch={setSearch}
      />
      <div className={style.policyGridView}>
        {policies?.length > 0 ? (
          policies?.map((item) => (
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
          ))
        ) : (
          <p className={style.emptyMessage}>No Policy Found</p>
        )}
      </div>
    </CardContainer>
  );
};

export default RenderAllPolicies;
