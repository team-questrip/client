import { AxiosResponse } from 'axios';
import { APIResponse } from '../types/api';
import { AcceptedRecommend } from '../types/my-page';
import { axiosInstance } from './axiosInstance';

export async function getAcceptedRecommendList(
  page?: number
): Promise<AxiosResponse<APIResponse<AcceptedRecommend>>> {
  const pageQuery = page ? `?page=${page}` : '';
  return axiosInstance.get(`api/v1/recommend/ACCEPTED${pageQuery}`);
}
