import { createAction } from '@reduxjs/toolkit';
import { LoginResponse } from '../../models/auth/login.response';

export const LOGIN_RESPONSE = '[Auth] Login Response';
export const LOGOUT = '[Auth] Logout';

export const loginResponse = createAction<LoginResponse>(LOGIN_RESPONSE);

export const logout = createAction<null>(LOGOUT);
