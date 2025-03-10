import axios from 'axios';
import { IHttpService } from './interfaces/http.service.interface';

export class HttpService implements IHttpService {
  constructor() {}

  async post<T>(url: string, payload: T): Promise<void> {
    try {
      await axios.post(url, payload);
    } catch (error) {
      throw error;
    }
  }
}
