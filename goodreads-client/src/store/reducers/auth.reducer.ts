import { createReducer } from '@reduxjs/toolkit'
import { loginResponse, logout  } from '../actions/auth.action'

export type AuthState = {
  loading: boolean;
  errors: any[];
  isLogged: boolean;
  data: any,
}

const initialState: AuthState = {
  loading: false,
  errors: null,
  isLogged: false,
  data: {},
};

export const authReducer = createReducer<AuthState>(initialState, builder =>
  builder
  .addCase(loginResponse, (state, action) => {
    return {
      ...state,
      loading: false,
      errors: action.payload.error ?  action.payload.error : null, 
      data: {...action.payload.result},
      isLogged : true,
    }
  })
  .addCase(logout, (state, action) => {
    return {
      ...state,
      loading: false,
      errors: null,
      data: {},
      isLogged : false,
    }
  })
);