export interface APIResponse<T> {
  data: T;
  message: string;
  status: 'SUCCESS' | 'ERROR';
}

export interface APIErrorResponse {
  message: string;
  [key: string]: unknown;
}
