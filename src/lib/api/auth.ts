import apiClient from "./client";

export interface LoginCredentials {
    username: string,
    password: string
}

export interface AuthResponse {
    token: string,
    expiresAt: string,
    attachmentToken: string
}

export const authApi = {
    login: async (credentials: LoginCredentials) : Promise<AuthResponse> => {
        const response = await apiClient.post('/v1/users/login', credentials);
        return response.data;
    }
}