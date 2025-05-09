import HttpService from './http.service';
import type { SignoutResponse } from 'src/interfaces/signout.interface';

class SignoutService {
  async deleteSignout(): Promise<SignoutResponse> {
    return await HttpService.delete<SignoutResponse>('/v2/auth/signout');
  }
}

export default new SignoutService();
