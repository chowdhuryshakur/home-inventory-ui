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

export interface UserResponse {
    id: string,
    name: string,
    email: string,
    isSuperuser: boolean,
    groupId: string,
    groupName: string,
    isOwner: boolean,
    oidcIssuer: string,
    oidcSubject: string
}

export const authApi = {
    login: async (credentials: LoginCredentials) : Promise<AuthResponse> => {
        const response = await apiClient.post('/v1/users/login', credentials);
        return response.data;
    },
    self: async () : Promise<UserResponse> => {
        const response = await apiClient.get('/v1/users/self')
        return response.data?.item
    }
}