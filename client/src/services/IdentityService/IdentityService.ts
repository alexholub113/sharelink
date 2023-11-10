import IIdentityService, {
    AccessTokenResponse,
    LoginRequest, RefreshRequest,
    RegisterRequest
} from './interfaces/IIdentityService.ts';
import HttpClient from '../HttpClient/HttpClient.ts';
import UserInfo from './interfaces/UserInfo.ts';

class IdentityService implements IIdentityService {
    private readonly baseUrl = `${import.meta.env.VITE_SHARELINK_API_BASE_URL}/identity`;

    constructor(private readonly httpClient: HttpClient) {
    }

    async register(request: RegisterRequest): Promise<void> {
        await this.httpClient.post<RegisterRequest, {}>(`${this.baseUrl}/register`, request);
    }

    async login(request: LoginRequest): Promise<AccessTokenResponse> {
        const response = await this.httpClient.post<LoginRequest, AccessTokenResponse>(`${this.baseUrl}/login`, request);

        return response.data;
    }

    async refresh(request: RefreshRequest): Promise<AccessTokenResponse> {
        const response = await this.httpClient.post<RefreshRequest, AccessTokenResponse>(`${this.baseUrl}/refresh`, request);

        return response.data;
    }

    async userInfo(): Promise<UserInfo | null> {
        const response = await this.httpClient.get<UserInfo | null>(`${this.baseUrl}/userInfo`);

        return response.data;
    }
}

export default IdentityService;