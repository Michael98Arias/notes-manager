import HttpService from './http.service';
import type { ProfileData } from 'src/interfaces/profile.interface';

class ProfileService {
  async getProfile(): Promise<ProfileData> {
    return await HttpService.get<ProfileData>('/v2/user/getprofile');
  }
}

export default new ProfileService();
