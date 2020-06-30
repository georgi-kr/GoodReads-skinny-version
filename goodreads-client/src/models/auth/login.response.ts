export type LoginResponse = {
  error: any[];
  result: LoginResponseData; 
}

export type LoginResponseData = {
  googleId: string,
  tokenObj: {
    access_token: string,
    token_type: string
  }
}