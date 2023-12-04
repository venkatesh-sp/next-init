import axios from 'axios';
// endpoints
import {AUTH_LOGIN, SEARCH_TENANTS} from '@/constants/endpoints';

import APIService from './api.service';

class AuthService extends APIService {
  login(data: any) {
    return this.post(AUTH_LOGIN, data)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data;
      });
  }

  searchTenant(data: any) {
    return this.post(SEARCH_TENANTS, data)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data;
      });
  }
}

export default AuthService;
