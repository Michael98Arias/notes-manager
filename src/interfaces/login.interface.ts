export interface UserLogin {
  email: string;
  password: string;
}
export interface UserLoginResponse {
  apiKey?: string;
  statusCode?: number;
  error?: string;
}
