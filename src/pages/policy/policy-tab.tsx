import Button from 'components/button';

import plusIcon from 'assets/plusIcon.svg';
import filter from 'assets/filter.svg';

import style from './request.module.scss';

import RenderPolicySearchView from './policies-search';

const RenderPoliciesTab = ({
  selectedTab,
  setSelectedTab,
  setShowFilterView,
  showFilterView,
  control,
  setOpenAddPolice,
  options,
  setEditPolicy,
  reset,
  policyCategory,
  length,
  setSearch,
  ObseleteLength,
}: {
  selectedTab: any;
  setSelectedTab: any;
  setShowFilterView: any;
  showFilterView: any;
  control: any;
  setOpenAddPolice: any;
  options: any;
  setEditPolicy: any;
  length: any;
  setSearch: any;
  ObseleteLength: any;
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
              color: selectedTab === 0 ? '#2D2D32' : '#CACACA',
              cursor: 'pointer',
            }}
          >
            All Policies
          </p>
          {length && (
            <div className={style.policyCount}>
              <p
                style={{
                  color: '#000000',
                }}
              >
                {length}
              </p>
            </div>
          )}
          <p
            onClick={() => setSelectedTab(1)}
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: selectedTab == 1 ? '#2D2D32' : '#CACACA',
              marginLeft: 20,
              cursor: 'pointer',
            }}
          >
            Obsolete
          </p>
          {ObseleteLength && (
            <div className={style.policyCount}>
              <p
                style={{
                  color: '#000000',
                }}
              >
                {ObseleteLength}
              </p>
            </div>
          )}
        </div>
        <div className={style.addPolicyView}>
          <img
            onClick={() => setShowFilterView(!showFilterView)}
            style={{ cursor: 'pointer', height: 35, width: 35, marginRight: '25px' }}
            src={filter}
            alt=""
            className={style.img}
          />
          <Button
            handleClick={() => {
              reset({});
              setOpenAddPolice(true);
              setEditPolicy({ bool: false, label: 'Add Policy' });
            }}
            iconStart={plusIcon}
            text="Add Policy"
          />
        </div>
      </div>
      {showFilterView && (
        <RenderPolicySearchView policyCategory={policyCategory} setSearch={setSearch} />
      )}
    </>
  );
};

export default RenderPoliciesTab;
