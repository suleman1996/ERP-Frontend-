import React, { useEffect, useState } from 'react';

import RenderPolicy from 'components/policy-card';

import RenderPoliciesTab from './policy-tab';
import PolicyService from 'services/policy-service';
import CardContainer from 'components/card-container';

import style from './request.module.scss';

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
  reset,
  setSelectedPolicy,
  type,
  renderObselete,
  setRenderObselete,
  policyCategory,
  setLoading,
}: {
  [key: string]: any;
}) => {
  const [obseletePolicies, setObseletePolicies] = useState([]);
  const [search, setSearch] = React.useState({ nameNumber: '', addedBy: '', categoryId: '' });

  useEffect(() => {
    getObseletePolocies();
  }, [renderObselete, search]);

  const getObseletePolocies = async () => {
    try {
      setLoading(true);
      const result = await PolicyService.getAllPolicies({
        obselete: true,
        ...(search?.nameNumber && { search: search?.nameNumber }),
        ...(search?.categoryId && { category: search?.categoryId?.label }),
        ...(search?.addedBy && { addedBy: search?.addedBy?.value }),
      });
      setObseletePolicies(result?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <CardContainer className={style.className}>
      <RenderPoliciesTab
        reset={reset}
        control={control}
        selectedTab={selectedTab}
        setOpenAddPolice={setOpenAddPolice}
        setSelectedTab={setSelectedTab}
        setShowFilterView={setShowFilterView}
        showFilterView={showFilterView}
        options={options}
        setEditPolicy={setEditPolicy}
        policyCategory={policyCategory}
        setSearch={setSearch}
        ObseleteLength={obseletePolicies?.length > 0 && obseletePolicies?.length}
      />
      <div className={style.policyGridView}>
        {obseletePolicies?.length > 0 ? (
          obseletePolicies?.map((item) => (
            <RenderPolicy
              setRenderObselete={setRenderObselete}
              type={type}
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

export default RenderObsolete;
