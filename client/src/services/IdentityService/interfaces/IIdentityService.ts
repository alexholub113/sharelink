export type AccessTokenResponse = {
    tokenType: string;
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

export type RegisterRequest = {
    nickname: string;
    email: string;
    password: string;
};

export type RefreshRequest = {
    refreshToken: string;
};

interface IIdentityService {
    register(request: RegisterRequest): Promise<void>;
    login(request: LoginRequest): Promise<AccessTokenResponse>;
    refresh(request: RefreshRequest): Promise<AccessTokenResponse>;
}

export default IIdentityService;
