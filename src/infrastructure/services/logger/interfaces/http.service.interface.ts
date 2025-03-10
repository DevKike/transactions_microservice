import { AxiosResponse } from 'axios';

export interface IHttpService {
  post<T>(url: string, payload: T): Promise<AxiosResponse>;
}
