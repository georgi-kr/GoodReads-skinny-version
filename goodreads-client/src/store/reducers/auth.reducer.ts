import { createReducer } from '@reduxjs/toolkit'
import { loginRequest, loginResponse  } from '../actions/auth.action'

export type AuthState = {
  username: string;
  email: string;
  loading: boolean;
  errors: any[];
}

const initialState: AuthState = {
  username: null,
  email: null,
  loading: false,
  errors: null
};

export const authReducer = createReducer<AuthState>(initialState, builder =>
  builder
  .addCase(loginRequest, (state, action) => {
    return {
      ...state,
      errors: null,
      loading: true
    };
  })
  .addCase(loginResponse, (state, action) => {
    return {
      ...state,
      loading: false,
      errors: action.payload.error ?  action.payload.error : null, 
      ...action.payload.result
    }
  })
);