import { AxiosResponse } from 'axios';
import { APIResponse } from '../interface/api';
import { AcceptedRecommend } from '../interface/my-page';
import { axiosInstance } from './axiosInstance';

export async function getAcceptedRecommendList(
  page?: number
): Promise<AxiosResponse<APIResponse<AcceptedRecommend>>> {
  const pageQuery = page ? `?page=${page}` : '';
  return axiosInstance.get(`api/v1/recommend/ACCEPTED${pageQuery}`);
}
