import { useEffect, useState } from 'react'
import CardContainer from 'components/card-container'

import AccordianSwitch from 'components/accordian'
import Button from 'components/button'
import Modal from 'components/modal'

import addIcon from 'assets/add.svg'
import longArrowIcon from 'assets/long-arrow.svg'
import threeDots from 'assets/three.svg'
import style from './access.module.scss'
import Selection from 'components/selection'
import { useForm } from 'react-hook-form'
import SettingsService from 'services/settings-service'
import AddRole from './add-role'

const AccessLevel = () => {
  const { errors, control } = useForm()
  const [toggle, setToggle] = useState(0)
  const [newUser, setNewUser] = useState(false)
  const [menu, setMenu] = useState(false)
  const [delModal, setDelModal] = useState(false)
  const [openAccordian, setOpenAccordian] = useState(-1)
  const [editIndex, setEditIndex] = useState(-1)
  const [allAccessLevels, setAllAccessLevels] = useState()
  const [allCustomRoles, setAllCustomRoles] = useState()
  const [roleId, setRoleId] = useState()

  useEffect(() => {
    getAllAccessLevels()
    getAllCustomRoles()
  }, [])

  const getAllCustomRoles = async () => {
    const res = await SettingsService?.getAllCustomRoles()
    setAllCustomRoles(res?.data?.customRoles)
  }

  const getAllAccessLevels = async () => {
    const res = await SettingsService.getAllAccessLevels()
    setAllAccessLevels(res?.data?.accessLevels)
  }

  return (
    <div>
      <CardContainer className={style.card}>
        <div className={style.innderDivs}>
          <div>
            <div className={style.rolesAddText}>
              <div className={style.rolesDiv}>
                <p>Roles</p>
                <span style={{ marginLeft: '10px' }}>
                  {allCustomRoles?.length}
                </span>
              </div>
              <div className={style.iconDiv} onClick={() => setNewUser(true)}>
                <img src={addIcon} />
                <span>Add New Role</span>
              </div>
            </div>
            <div>
              {allCustomRoles?.map((role, index) => {
                return (
                  <>
                    <div
                      key={index}
                      className={`${style.blocks}  ${
                        toggle === index ? style.activeClass : ''
                      } `}
                      onClick={() => setToggle(index)}
                    >
                      {role?.name}
                      <div>
                        <img src={threeDots} onClick={() => setMenu(!menu)} />
                        {menu && toggle === index && (
                          <div className={style.menuOptions}>
                            <div
                              className={style.optionBorder}
                              onClick={() => {
                                setEditIndex(index)
                                setMenu(false)
                              }}
                            >
                              Rename
                            </div>
                            <div
                              className={style.optionWithoutBorder}
                              onClick={() => {
                                setRoleId(role?._id)
                                setDelModal(true)
                                setMenu(false)
                              }}
                            >
                              Delete
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* //////////////////// Edit Role ////////////////////// */}
                    {editIndex === index && (
                      <AddRole
                        setNewUser={setNewUser}
                        setEditIndex={setEditIndex}
                        getAllCustomRoles={getAllCustomRoles}
                        roleId={roleId}
                      />
                    )}
                    {/* ///////////////////////////////////////////////////// */}
                  </>
                )
              })}

              {newUser && (
                <AddRole
                  setNewUser={setNewUser}
                  getAllCustomRoles={getAllCustomRoles}
                />
              )}
            </div>
          </div>

          <div className={style.accessHeader}>
            <p>Access</p>
            {allAccessLevels?.map((data, index) => {
              return (
                <AccordianSwitch
                  key={index}
                  title={data?.name}
                  switchBtn
                  bodyDataName={addProfileData.map((item) => item?.name)}
                  index={index}
                  id={data?.id}
                  openAccordian={openAccordian}
                  setOpenAccordian={setOpenAccordian}
                />
              )
            })}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button text="Save" type="submit" btnClass={style.submitBtn} />
        </div>

        <Modal
          open={delModal}
          title={'Change Roles'}
          handleClose={() => setDelModal(false)}
        >
          <div>
            <span>
              This role is assign to the following users. Please select the new
              role for the others.
            </span>

            <div className={style.parentDiv}>
              <div className={style.childDiv}>
                <div className={style.modalRoleDiv}>
                  <h4>Old Role</h4>
                  <h4>New Role</h4>
                </div>
                <div
                  className={style.modalRoleDiv}
                  style={{ margin: '7px 0px' }}
                >
                  <div className={style.innerDiv}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <h4>UI/UX Designer</h4>
                      <div className={style.roundDiv}>05</div>
                      <span>Users</span>
                    </div>
                    <img src={longArrowIcon} style={{ marginRight: '30px' }} />
                  </div>
                  <Selection
                    control={control}
                    name={'role'}
                    errorMessage={errors?.employeeId?.message}
                    options={series.map((item) => {
                      return { label: item?.name, value: item?._id }
                    })}
                  />
                </div>
              </div>
            </div>

            <div className={style.modalButton}>
              <Button text={'Done'} type={'submit'} />
            </div>
          </div>
        </Modal>
      </CardContainer>
    </div>
  )
}

export default AccessLevel

const series = [
  { label: 'yes', value: 1 },
  { label: 'okay', value: 2 },
  { label: 'modal', value: 3 },
  { label: 'hello', value: 4 },
]

// const roles = [
//   'CEO',
//   'Director',
//   'CTO',
//   'Operational Manager',
//   'Human Resource Manager',
//   'Frontend Developer',
//   'Backend Developer',
//   'UX | UI Designer',
//   'SQA Engineer',
//   'SQA Engineer',
// ]

const addProfileData = [
  { name: 'Add Employeeeeeee' },
  // { name: 'Edit Employee' },
  // { name: 'View Employee' },
  // { name: 'Delete Employee' },
  // { name: 'CV View' },
  // { name: 'Profile View' },
]

// const totalAccordian = [
//   { name: '1', id: 1 },
//   { name: '1', id: 2 },
//   { name: '1', id: 3 },
// ]
