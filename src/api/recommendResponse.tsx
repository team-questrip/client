import { RecommendResponse } from '../interface/recommendResponse';
import { axiosInstance } from './axiosInstance';

const postRecommendResponse = async (
  placeId: string,
  status: string
): Promise<RecommendResponse> => {
  const response = await axiosInstance.post<RecommendResponse>(
    `api/v1/recommend`,
    {
      placeId: placeId,
      status: status,
    }
  );

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error('Unexpected response status');
  }
};

export default postRecommendResponse;
