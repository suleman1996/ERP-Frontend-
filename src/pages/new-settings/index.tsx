import { useState } from 'react'

import Button from 'components/button'
import ManageUser from './manage-user'
import AccessLevel from './access-level'
import AccountSetting from './account-setting'
import GeneralSetting from './general-setting/index'
import CardContainer from 'components/card-container'

import style from './settings.module.scss'
import addIcon from 'assets/whiteAdd.svg'

const Settings = () => {
  const [index, setIndex] = useState(0)
  const [newUser, setNewUser] = useState(false)
  const [btnHideSHow, setBtnHideShow] = useState(false)

  return (
    <CardContainer className={style.card}>
      <div className={style.header}>
        <div className={style.navBar}>
          {settingOptions?.map((setting, i) => {
            return (
              <>
                <p
                  key={setting}
                  onClick={() => setIndex(i)}
                  className={i === index ? style.activeClass : ''}
                >
                  {setting}
                </p>
              </>
            )
          })}
        </div>
        <div className={style.addBtn}>
          {index === 1 && (
            <div>
              {!btnHideSHow && (
                <Button
                  iconStart={addIcon}
                  text="New User"
                  type="submit"
                  btnClass={style.btnClass}
                  handleClick={() => {
                    setNewUser(true)
                    setBtnHideShow(true)
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>
      <div>
        {index === 0 && <AccountSetting />}
        {index === 1 && (
          <ManageUser
            newUser={newUser}
            setNewUser={setNewUser}
            setBtnHideShow={setBtnHideShow}
          />
        )}
        {index === 2 && <GeneralSetting />}
        {index === 3 && <AccessLevel />}
      </div>
    </CardContainer>
  )
}

export default Settings

const settingOptions = [
  'Account Setting',
  'Manage User',
  'General Setting',
  'Access Level',
]
