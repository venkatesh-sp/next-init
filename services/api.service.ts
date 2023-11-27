import axios, {AxiosPromise} from 'axios';
import cookie from 'js-cookie';
import Moment from 'moment';

abstract class APIService {
  private baseUrl: any =
    process.env.NEXT_PUBLIC_APP_ENV === 'production'
      ? process.env.NEXT_PUBLIC_BASE_PROD
      : process.env.NEXT_PUBLIC_APP_ENV === 'staging'
        ? process.env.NEXT_PUBLIC_BASE_STAGING
        : process.env.NEXT_PUBLIC_BASE_LOCAL;

  private date = new Date();
  private expiry = Moment(this.date).add(7, 'days');

  private getAxiosHeaders(): any {
    const token = cookie.get('accessToken');
    return {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    };
  }

  setAccessToken(token: any): void {
    cookie.set('accessToken', token, {expires: this.expiry.toDate()});
  }

  setRefreshToken(token: string): void {
    cookie.set('refreshToken', token, {expires: this.expiry.toDate()});
  }

  purgeAuth(): void {
    cookie.remove('accessToken');
    cookie.remove('refreshToken');
    cookie.remove('next-auth.callback-url');
    cookie.remove('next-auth.csrf-token');
    cookie.remove('session');
  }

  private buildUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
  }

  get(url: string): AxiosPromise<any> {
    return axios({method: 'GET', url: this.buildUrl(url), headers: this.getAxiosHeaders()});
  }

  post(url: string, data = {}, headers?: any): AxiosPromise<any> {
    return axios({
      method: 'POST',
      url: this.buildUrl(url),
      data,
      headers: headers
        ? {
            ...this.getAxiosHeaders(),
            ['Content-Type']: headers['Content-Type'],
          }
        : this.getAxiosHeaders(),
    });
  }

  put(url: string, data = {}): AxiosPromise<any> {
    return axios({
      method: 'PUT',
      url: this.buildUrl(url),
      data,
      headers: this.getAxiosHeaders(),
    });
  }

  delete(url: string): AxiosPromise<any> {
    return axios({
      method: 'DELETE',
      url: this.buildUrl(url),
      headers: this.getAxiosHeaders(),
    });
  }
}

export default APIService;
