export interface IHttpService {
  post<T>(url: string, payload: T): Promise<void>;
}
