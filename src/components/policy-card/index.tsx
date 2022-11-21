import React, { useRef } from 'react';
import moment from 'moment';

import { useOutsideAlerter } from 'hooks/useOutsideClick';

import PolicyService from 'services/policy-service';

import style from './request.module.scss';
import menu from 'assets/menu.svg';

const RenderPolicy = ({
  setSelectedTab,
  setOpen,
  setOpenAddPolice,
  setEditPolicy,
  data,
  setSelectedPolicy,
  handleEdit,
  type,
}: any) => {
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideAlerter(ref, () => setIsMenuVisible(false));

  const handleObseletePolicy = async () => {
    try {
      const result = await PolicyService.addObseletePolicyApi(data?._id);
      console.log('Her is the result from obselete policy ', result?.data);
      setSelectedTab(1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.policyView}>
      {isMenuVisible && (
        <div className={style.menuBox} ref={ref}>
          {type !== 'Obselete' && (
            <div
              onClick={() => {
                setOpenAddPolice(true);
                setIsMenuVisible(false);

                setEditPolicy({ bool: false, label: 'Update Policy' });
                handleEdit(data);
                setSelectedPolicy(data);
              }}
              className={style.menuViewBox}
            >
              <p style={{ fontSize: '8px', fontWeight: '500', color: '#2D2D32' }}>Edit</p>
            </div>
          )}
          <div
            onClick={() => {
              setOpen(true);
              setSelectedPolicy(data);
            }}
            className={style.menuViewBox}
          >
            <p style={{ fontSize: '8px', fontWeight: '500', color: '#2D2D32' }}>Delete</p>
          </div>
          {type !== 'Obselete' && (
            <div
              onClick={() => {
                setOpenAddPolice(true);
                setIsMenuVisible(false);
                handleEdit(data);
                setEditPolicy({ bool: true, label: 'Add Revision' });
                setSelectedPolicy(data);
              }}
              className={style.menuViewBox}
            >
              <p
                style={{ fontSize: '8px', fontWeight: '500', color: '#2D2D32', cursor: 'pointer' }}
              >
                Add Revision
              </p>
            </div>
          )}

          {type !== 'Obselete' && (
            <div className={style.menuViewBox}>
              <p
                onClick={() => {
                  setIsMenuVisible(false);
                  handleObseletePolicy();
                }}
                style={{ fontSize: '8px', fontWeight: '500', color: '#2D2D32', cursor: 'pointer' }}
              >
                Obsolete
              </p>
            </div>
          )}
        </div>
      )}
      <div className={style.policyHeaderView}>
        <div className={style.policyHeaderTitleView}>
          <p
            style={{
              fontSize: '15px',
              fontWeight: 600,
              color: '#2D2D32',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {data?.name || 'All Policies'}
          </p>
          {data?.effectiveDate ? (
            <p style={{ fontSize: '10px', fontWeight: 400, color: '#2D2D32' }}>
              Effective Date: {moment(data?.effectiveDate).format('DD MMM, YYYY')}
            </p>
          ) : (
            <p style={{ fontSize: '10px', fontWeight: 400, color: '#2D2D32' }}>
              Effective Date: 10 April, 2022
            </p>
          )}
        </div>
        <div className={style.policyMenuView}>
          <img
            style={{ cursor: 'pointer', padding: '10px' }}
            src={menu}
            alt=""
            className={style.img}
            onClick={() => setIsMenuVisible(!isMenuVisible)}
          />
        </div>
      </div>
      <div className={style.policyDescriptionView}>
        <ul>
          {[
            { q: 'Policy Number', v: data?.policyNumber },
            { q: 'Version', v: data?.version },
            { q: 'Category', v: data?.categoryId?.name },
            { q: 'Prepared by ', v: data?.preparedBy?.fullName },
            { q: 'Reviewed by', v: data?.reviewers[0]?.fullName },
            { q: 'Approved by', v: data?.approvedBy?.fullName },
            { q: 'Added by', v: data?.addedBy[0]?.name },
          ].map((item) => (
            <li>
              {item?.q} : {item?.v}
            </li>
          ))}
        </ul>
        <div className={style.leftCircle} />
        <div className={style.rightCircle} />
      </div>

      <div className={style.policyButtonView}>
        <div className={style.policyButton}>
          <a
            style={{
              textDecoration: 'none',
              width: '100%',
            }}
            target={'_blank'}
            href={data?.fileId[0]?.file}
          >
            <p style={{ fontWeight: '500', fontSize: 11, color: '#ffffff', textAlign: 'center' }}>
              View Policy
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RenderPolicy;
