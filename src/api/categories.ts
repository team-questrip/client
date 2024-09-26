import { AxiosResponse } from 'axios';
import { axiosInstance } from './axiosInstance';
import { APIResponse } from '../types/api';
import { PlaceCategoriesData } from '../types/categories';

export async function fetchCategories(): Promise<PlaceCategoriesData> {
  return axiosInstance
    .get(`api/v1/place/category`)
    .then(
      (res: AxiosResponse<APIResponse<PlaceCategoriesData>>) => res.data.data
    );
}
