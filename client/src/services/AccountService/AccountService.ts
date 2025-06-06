
import HttpClient from '../HttpClient/HttpClient.ts';
import IAccountService, {
    AccessTokenResponse,
    LoginRequest,
    RefreshRequest,
    RegisterRequest
} from './interfaces/IAccountService.ts';
import UserInfo from '../../models/UserInfo.ts';


class AccountService implements IAccountService {
    private readonly baseUrl = `${import.meta.env.VITE_SHARELINK_API_BASE_URL}/api/v1/identity`;

    constructor(private readonly httpClient: HttpClient) {
    }

    async register(request: RegisterRequest): Promise<void> {
        await this.httpClient.post<RegisterRequest, {}>(`${this.baseUrl}/signup`, request);
    }

    async login(request: LoginRequest): Promise<AccessTokenResponse> {
        const response = await this.httpClient.post<LoginRequest, AccessTokenResponse>(`${this.baseUrl}/signin`, request);

        return response.data;
    }

    async refresh(request: RefreshRequest): Promise<AccessTokenResponse> {
        const response = await this.httpClient.post<RefreshRequest, AccessTokenResponse>(`${this.baseUrl}/refresh`, request);

        return response.data;
    }

    async userInfo(): Promise<UserInfo | null> {
        const response = await this.httpClient.get<UserInfo>(`${this.baseUrl}/getuserInfo`);

        return response.data;
    }

    async signOut(): Promise<void> {
        await this.httpClient.post(`${this.baseUrl}/signout`, {});
    }
}

export default AccountService;