import { createAction } from '@reduxjs/toolkit'
import { LoginRequest } from '../../models/auth/login.request';
import { LoginResponse } from '../../models/auth/login.response';

// Here in every file will be action types at the top
export const LOGIN_REQUEST = '[Auth] Login Request'
export const LOGIN_RESPONSE = '[Auth] Login Response'

// Here will be actions with the payload to dispatch TODO
export const loginRequest = createAction<LoginRequest>(LOGIN_REQUEST);
export const loginResponse = createAction<LoginResponse>(LOGIN_RESPONSE);
// here -> { type: 'LOGIN_REQUEST', payload: <- comes from loginRequest(HERE) parameter as action.payload }