import apiClient from "./client"
import { Location } from "./locations";

export interface Item {
    id: string;
    name: string;
    description?: string;
    quantity: number;
    purchasePrice: number;
    location?: Location;
    labels?: [];
    notes?: string;
    purchaseTime: string;
    warrantyExpires: string;
    createdAt: string;
    updatedAt: string;
  }

export interface ItemsResponse {   
    page: number,
    pageSize: number,
    total: number,
    items: []
}
export interface ItemsParams {
    page?: number;
    pageSize?: number;
    q?: string;
    locations?: [];
    labels?: [];
    parentIds?: [];
}

export const itemsApi = {
    getAllItems: async (params: ItemsParams) : Promise<ItemsResponse> => {
        const response = await apiClient.get('/v1/items', { params })
        return response.data
    },

    getItemById: async (id: string): Promise<Item> => {
        const response = await apiClient.get(`/api/v1/items/${id}`);
        return response.data;
    }
}