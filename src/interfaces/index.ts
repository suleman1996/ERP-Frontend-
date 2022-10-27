import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { AppSliceState } from 'store/app-splice';

export interface Link {
  title: string;
  left?: string;
  link?: string;
}

export type StoreDispatch = ThunkDispatch<
  {
    app: AppSliceState;
  },
  undefined,
  AnyAction
> &
  Dispatch<AnyAction>;
