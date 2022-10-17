import React, { useRef } from 'react';

import arrowRight from 'assets/arrowRight.svg';
import menu from 'assets/menu.svg';

import style from './request.module.scss';
import { useOutsideAlerter } from 'hooks/useOutsideClick';

const RenderPolicy = ({ setSelectedTab, setOpen, setOpenAddPolice, setEditPolicy }: any) => {
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideAlerter(ref, () => setIsMenuVisible(false));
  return (
    <div className={style.policyView}>
      {isMenuVisible && (
        <div className={style.menuBox} ref={ref}>
          <div
            onClick={() => {
              setOpenAddPolice(true);
              setIsMenuVisible(false);
              setEditPolicy(true);
            }}
            className={style.menuViewBox}
          >
            <p style={{ fontSize: '8px', fontWeight: '500', color: '#2D2D32' }}>Edit</p>
            <img src={arrowRight} alt="" className={style.img} />
          </div>
          <div
            onClick={() => {
              setOpen(true);
            }}
            className={style.menuViewBox}
          >
            <p style={{ fontSize: '8px', fontWeight: '500', color: '#2D2D32' }}>Delete</p>
            <img src={arrowRight} alt="" className={style.img} />
          </div>

          <div className={style.menuViewBox}>
            <p style={{ fontSize: '8px', fontWeight: '500', color: '#2D2D32', cursor: 'pointer' }}>
              Add Revision
            </p>
            <img src={arrowRight} alt="" className={style.img} />
          </div>

          <div className={style.menuViewBox}>
            <p
              onClick={() => {
                setSelectedTab(1);
                setIsMenuVisible(false);
              }}
              style={{ fontSize: '8px', fontWeight: '500', color: '#2D2D32', cursor: 'pointer' }}
            >
              Obsolete
            </p>
            <img src={arrowRight} alt="" className={style.img} />
          </div>
        </div>
      )}
      <div className={style.policyHeaderView}>
        <div className={style.policyHeaderTitleView}>
          <p style={{ fontSize: '15px', fontWeight: 600, color: '#2D2D32' }}>All Policies</p>
          <p style={{ fontSize: '10px', fontWeight: 400, color: '#2D2D32' }}>
            Effective Date: 10 April, 2022
          </p>
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
            { q: 'Policy Number', v: 'BFFF334r' },
            { q: 'Version', v: '0.1.8' },
            { q: 'Category', v: 'Holidays' },
            { q: 'Prepared by ', v: 'Maira Ashraf' },
            { q: 'Reviewed by', v: 'Suleman Amjad' },
            { q: 'Approved by', v: 'Faizan Khan' },
            { q: 'Added by', v: 'Umair Leo' },
          ].map((item) => (
            <li>
              {item?.q} : {item?.v}
            </li>
          ))}
        </ul>
      </div>

      <div className={style.policyButtonView}>
        <div className={style.policyButton}>
          <p style={{ fontWeight: '500', fontSize: 11, color: '#ffffff' }}>View Policy</p>
        </div>
      </div>
    </div>
  );
};

export default RenderPolicy;
