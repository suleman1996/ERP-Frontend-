import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import moment from 'moment';

import { useAppSelector } from 'store/hooks';
import profile1 from 'assets/img1.svg';
import style from './notification.module.scss';
interface Props {
  setNotificationMenu: Dispatch<SetStateAction<boolean>>;
}

const NotificationMenu = ({ setNotificationMenu }: Props) => {
  const { notificationData } = useAppSelector((state) => state?.app);

  const [notificationsArr, setNotificationsArr] = useState<any[]>([]);

  useEffect(() => {
    setNotificationsArr([{ title: 'Today', posts: notificationData }]);
  }, [notificationData]);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.nativeEvent.stopImmediatePropagation();
    setNotificationMenu(false);
  };

  return (
    <div className={style.mainDiv} onClick={handleClick}>
      <div className={style.notificationMenuMain} onClick={(e) => e.stopPropagation()}>
        <span className={style.notificationMenuTitle}>Notifications</span>
        <div className={style.notificationMenuDayContainer}>
          {notificationsArr.length &&
            notificationsArr.map(({ title, posts }) => (
              <div className={style.notificationMenuDay} key={title}>
                <span className={style.notificationMenuDayTitle}>{title}</span>
                {posts.map(({ _id, name, date, employee, description }: any) => (
                  <div className={style.notificationMenuPost} key={_id}>
                    <div className={style.profileContainer}>
                      <img
                        className={style.profileImg}
                        src={employee[0]?.img ? employee[0]?.img : profile1}
                        alt={'profile' + _id}
                      />
                    </div>
                    <div className={style.notificationPostContent}>
                      <div className={style.notificationPostContentHead}>
                        <span className={style.postUserName}>{name}</span>
                        <span className={style.postDate}>
                          {moment(new Date(date)).format('YYYY-MM-DD')}
                        </span>
                      </div>
                      <span className={style.postText}>{description}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationMenu;
