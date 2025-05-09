import HttpService from './http.service';
import type { UserLogin, UserLoginResponse } from '../interfaces/login.interface';

class LoginService {
  async login(credentials: UserLogin): Promise<UserLoginResponse> {
    return await HttpService.post<UserLoginResponse, UserLogin>('/v2/auth/signin', credentials);
  }
}

export default new LoginService();
