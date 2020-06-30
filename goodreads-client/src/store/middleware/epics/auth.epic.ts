import { switchMap } from 'rxjs/operators';
import { of, Observable } from "rxjs";
import { ofType } from "redux-observable";
import { Action } from 'redux-actions'

import { LOGIN_RESPONSE } from "../../actions/auth.action";
import { RootState } from "../../reducers/root.reducer";
import { LoginResponse } from '../../../models/auth/login.response';
import { shelvesRequest } from '../../actions/profile.action';

export const loginResponseEpic = (action$: Observable<Action<LoginResponse>>, store: RootState) =>
  action$.pipe(
    ofType(LOGIN_RESPONSE),
    switchMap((action: { payload: any }) => {
      return of(shelvesRequest());
    })
  );

export default [
  loginResponseEpic,
];