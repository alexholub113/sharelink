import UserInfo from '../../../models/UserInfo.ts';


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

interface IAccountService {
    register(request: RegisterRequest): Promise<void>;
    login(request: LoginRequest): Promise<AccessTokenResponse>;
    signOut(): Promise<void>;
    refresh(request: RefreshRequest): Promise<AccessTokenResponse>;
    userInfo(): Promise<UserInfo | null>;
}

export default IAccountService;