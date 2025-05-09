import type { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { HttpErrorFactory } from '../interfaces/http.interface';
import { envBaseUrl } from '../shared/constants/Environment';

class HttpService {
  private http: AxiosInstance;
  private accessToken = '';

  constructor() {
    this.http = axios.create({
      baseURL: envBaseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors(this.http);
  }

  private setupInterceptors(instance: AxiosInstance): void {
    instance.interceptors.request.use((request: InternalAxiosRequestConfig) => {
      if (this.accessToken) {
        request.headers.Authorization = `Bearer ${this.accessToken}`;
      }
      return request;
    });

    instance.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      (error: AxiosError) => {
        const httpError = HttpErrorFactory.fromAxiosError(error);
        const rejectionError = new Error(httpError.message);
        rejectionError.name = 'HttpError';
        Object.assign(rejectionError, httpError);

        return Promise.reject(rejectionError);
      },
    );
  }

  public setToken(token: string): void {
    this.accessToken = token;
  }

  public async get<T>(url: string, config?: InternalAxiosRequestConfig): Promise<T> {
    return this.http.get<T, T>(url, config);
  }

  public async post<T, K>(url: string, data?: K, config?: InternalAxiosRequestConfig): Promise<T> {
    return this.http.post<T, T>(url, data, config);
  }

  public async put<T, K>(url: string, data?: K, config?: InternalAxiosRequestConfig): Promise<T> {
    return this.http.put<T, T>(url, data, config);
  }

  public async delete<T>(url: string, config?: InternalAxiosRequestConfig): Promise<T> {
    return this.http.delete<T, T>(url, config);
  }

  public async upload<T>(url: string, file: FormData): Promise<T> {
    return this.http.post<T, T>(url, file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export default new HttpService();
