export interface APIResponse<T> {
  data: T;
  message: string;
  status: 'SUCCESS' | 'ERROR';
}

export interface APIErrorResponse {
  data: APIErrorMessage[];
}

export interface APIErrorMessage {
  message: string;
  [key: string]: unknown;
}
