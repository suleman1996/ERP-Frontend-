import React, { useEffect, useState } from 'react';

import style from './request.module.scss';
import RenderPolicy from 'components/policy-card';

import RenderPoliciesTab from './policy-tab';
import PolicyService from 'services/policy-service';
import Loading from 'components/loading';

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
  const [obseletePolicies, setObseletePolicies] = useState([]);

  useEffect(() => {
    getObseletePolocies();
  }, []);

  const getObseletePolocies = async () => {
    try {
      const result = await PolicyService.getAllPolicies({ obselete: true });
      console.log('Here are the obselete policies ', result?.data?.data);
      setObseletePolicies(result?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.policyMainView}>
      <Loading />
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
        {obseletePolicies.map((item) => (
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
