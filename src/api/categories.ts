import { AxiosResponse } from 'axios';
import { axiosInstance } from './axiosInstance';
import { APIResponse } from '../types/api';
import { PlaceCategoriesData } from '../types/categories';
import { placeCategoriesDataSchema } from '../schema/categoriesSchema';

export async function fetchCategories(): Promise<PlaceCategoriesData> {
  const response = (await axiosInstance.get(
    `api/v1/place/category`
  )) as AxiosResponse<APIResponse<PlaceCategoriesData>>;

  placeCategoriesDataSchema.parse(response.data.data);

  return response.data.data;
}
