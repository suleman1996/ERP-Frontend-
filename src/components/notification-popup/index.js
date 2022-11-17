import React from 'react';

import style from './notification.module.scss';

const NotificationPopup = ({ plainText, hyperlink, open, handleClick }) => {
  return (
    <>
      <div
        className={`${style.wrapper}   `}
        style={{
          position: 'absolute',
          top: open ? '150px' : '-100%',
        }}
      >
        <span>
          {`${plainText} `}{' '}
          <span
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
            className={style.customEffect}
            onClick={handleClick && handleClick}
          >
            {hyperlink}
          </span>
        </span>
      </div>
    </>
  );
};

export default NotificationPopup;
