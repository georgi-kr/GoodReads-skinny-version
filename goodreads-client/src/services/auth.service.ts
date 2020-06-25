import { ajax } from "rxjs/ajax"
import { LoginRequest } from "../models/auth/login.request"

export const loginServiceRequest = (data: LoginRequest) => {
  // This way we can extract Http calls like a service
  return ajax.post('http://localhost:3000/login', data, {});
}