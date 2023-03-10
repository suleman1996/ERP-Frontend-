import { StoreDispatch } from 'interfaces';
import EmployeeService from 'services/employee-service';
import { appSlice } from './app-splice';

export const getAllSettings = () => async (dispatch: StoreDispatch) => {
  const res = await EmployeeService.getGenders();

  if (res.status === 200) {
    dispatch(appSlice.actions.setAllGenders(res?.data?.profileSetting?.gender));
    dispatch(appSlice.actions.setAllSeries(res?.data?.profileSetting?.series));
  }
};

export const getAllDepartments = () => async (dispatch: StoreDispatch) => {
  const res = await EmployeeService.getDepartments();

  if (res.status === 200) {
    dispatch(appSlice.actions.setAllDepartments(res?.data?.department));
  }
};

export const getAllDesignations =
  ({ id }: { id: string }) =>
  async (dispatch: StoreDispatch) => {
    const res = await EmployeeService.getDesignation(id);

    if (res.status === 200) {
      dispatch(appSlice.actions.setAllDesignation(res?.data?.Designation));
    }
  };

export const getAllLeaves = () => async (dispatch: StoreDispatch) => {
  const res = await EmployeeService.getLeaves();

  if (res.status === 200) {
    dispatch(appSlice.actions.setAllLeaves(res?.data?.Leave));
  }
};

export const getAllAllowence = () => async (dispatch: StoreDispatch) => {
  const res = await EmployeeService.getAllowence();
  if (res.status === 200) {
    dispatch(appSlice.actions.setAllAllowence(res?.data?.Allownce));
  }
};
