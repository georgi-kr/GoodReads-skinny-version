import { switchMap, map, catchError } from 'rxjs/operators';
import { AjaxResponse } from 'rxjs/ajax';
import { of, Observable } from "rxjs";
import { ofType } from "redux-observable";
import { Action } from 'redux-actions'

import { LOGIN_REQUEST, loginResponse } from "../../actions/auth.action";
import { LoginRequest } from "../../../models/auth/login.request";
import { RootState } from "../../reducers/root.reducer";
import { loginServiceRequest } from '../../../services/auth.service';
import { LoginResponse } from '../../../models/auth/login.response';


export const loginRequestEpic = (action$: Observable<Action<LoginRequest>>, store: RootState) =>
  action$.pipe(
    ofType(LOGIN_REQUEST),
    switchMap((action: { payload : LoginRequest}) => {
    return loginServiceRequest(action.payload).pipe(
      map((response: AjaxResponse) => {  
        return loginResponse(response.response as LoginResponse);
      }),
      catchError((error) =>
        of({
          error: error ? error : null,
          result: null
        })
      ),
    );
  })
);

export default [
  loginRequestEpic,
];