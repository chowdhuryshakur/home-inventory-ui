import apiClient from "./client"

export interface Location {
    id: string,
    name: string,
    description: string,
    createdAt: string,
    updatedAt: string,
    children: [],
    totalPrice: number,
    item_count: number
}

export const locationApis = {
    getLocations: async (): Promise<Location[]> => {
        const response = await apiClient.get('/api/v1/locations');
        return response.data;
    },
    
    getLocationById: async (id: string): Promise<Location> => {
        const response = await apiClient.get(`/v1/locations/${id}`);
        return response.data;
    }
}