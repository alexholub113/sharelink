export type AuthResponse = {
    token: string;
};

interface IAuthService {
    login(email: string, password: string): Promise<AuthResponse>;
    register(nickname: string, email: string, password: string): Promise<AuthResponse>;
}

export default IAuthService;
