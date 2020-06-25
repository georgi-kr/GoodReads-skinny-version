export type LoginResponse = {
  error: any[];
  result: LoginResponseData; 
}

export type LoginResponseData = {
  success: boolean; // Or whatever we make it return
}