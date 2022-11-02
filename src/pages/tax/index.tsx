import React, { useState } from 'react';

import TaxSlab from './tax-slab';
import NavLinks from 'components/nav-links';
import CardContainer from 'components/card-container';
import TaxCalculation from './tax-calculation';
import style from './tax.module.scss';
import Loading from 'components/loading';

import Button from 'components/button';
import MobileButton from 'components/button/mobile-button';
import plusIcon from 'assets/plusIcon.svg';

const Tax = () => {
  const [active, setActive] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [singleId, setSingleId] = useState('');

  return (
    <>
      <CardContainer>
        <div className={style.header}>
          <h2>Tax Groups</h2>
          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div className={style.addTaxBtnDiv}>
              <div className={style.addTaxBtnChildDiv}>
                <Button
                  text="Add Tax-Slab"
                  handleClick={() => {
                    setOpen(true);
                    setSingleId('');
                  }}
                />
              </div>
            </div>

            <div className={style.mobileAddTaxBtnDiv}>
              <MobileButton
                mobileIcon={plusIcon}
                handleClick={() => {
                  setOpen(true);
                }}
              />
            </div>
          </div>
        </div>
        {isLoading && (
          <div className={style.loaderDiv}>
            <Loading loaderClass={style.loadingStyle} />
          </div>
        )}
        {/* {active === 0 && <TaxCalculation setIsLoading={setIsLoading} />} */}
        {active === 0 && (
          <TaxSlab
            setIsLoading={setIsLoading}
            open={open}
            setOpen={setOpen}
            singleId={singleId}
            setSingleId={setSingleId}
          />
        )}
      </CardContainer>
    </>
  );
};

export default Tax;

const links = [
  // { title: 'Tax-Calculation', left: '41px' },
  { title: 'Tax-Slab', left: '60px' },
];
