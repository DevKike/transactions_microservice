export interface ILogRequest {
  service: string;
  payload: { [key: string]: any };
  type: string;
  content: string;
}
