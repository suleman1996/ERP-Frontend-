import Button from 'components/button';
import Loading from 'components/loading';
import Pagination from 'components/pagination';
import DeletePopup from 'components/delete-modal';
import NewTable from 'components/table/new-table';
import MobileButton from 'components/button/mobile-button';

import AddEmployee from 'pages/settings/manage-accounts/add-employee';
import EditEmployee from './edit-employee';

import { columns, useManageAccountHelper } from './manage-accounts-helper';
import SettingsService from 'services/settings-service';

import addSvg from 'assets/logo5.svg';
import plusIcon from 'assets/mobile-view/plusIcon.svg';
import style from './manage-accounts.module.scss';

const ManageAccounts = () => {
  const {
    page,
    count,
    sorts,
    loading,
    filters,
    pageSize,
    btnLoader,
    employees,
    addEmployee,
    editEmployee,
    deleteModalOpen,
    manageAccountsTable,
    setPage,
    navigate,
    setSorts,
    setFilters,
    handleEdit,
    setSingleId,
    removeEmployee,
    getEmployeesData,
    setDeleteModalOpen,
  } = useManageAccountHelper();

  return (
    <>
      {loading && (
        <div className={style.loaderDiv}>
          <Loading loaderClass={style.loadingStyle} />
        </div>
      )}
      {manageAccountsTable && (
        <>
          <div style={{ padding: '0 10px' }}>
            <NewTable
              columns={columns}
              rows={employees}
              loading={loading}
              tableHeight={style.manageAccountsTableHeight}
              handleDelete={(id: string) => setSingleId(id)}
              handleEdit={(id: string) => handleEdit(id)}
              handleModalOpen={() => setDeleteModalOpen(true)}
              apiCall={SettingsService.getAllUsers}
              filters={filters}
              setFilters={setFilters}
              sorts={sorts}
              setSorts={setSorts}
              minWidth="955px"
            />
          </div>
          <Pagination setPage={setPage} count={count} pageSize={pageSize} page={page} />
          <div className={style.addEmployeeBtnDiv}>
            <div className={style.addEmployeeChildDiv}>
              <Button
                text="Add Employee"
                icon={addSvg}
                handleClick={() => navigate('/settings/add')}
              />
            </div>
          </div>
          <div>
            <MobileButton mobileIcon={plusIcon} handleClick={() => navigate('/settings/add')} />
          </div>
        </>
      )}
      {addEmployee && (
        <AddEmployee editForm={false} employees={employees} getEmployeesData={getEmployeesData} />
      )}
      {editEmployee && <EditEmployee employees={employees} getEmployeesData={getEmployeesData} />}
      <DeletePopup
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        handleDelete={removeEmployee}
        btnLoader={btnLoader}
      />
    </>
  );
};
export default ManageAccounts;
