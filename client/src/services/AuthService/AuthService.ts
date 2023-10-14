import IAuthService, { AuthResponse } from './interfaces/IAuthService.ts';

class AuthService implements IAuthService {
    // @ts-ignore
    login(email: string, password: string): Promise<AuthResponse> {
        return Promise.resolve({token: '123'});
    }

    // @ts-ignore
    register(nickname: string, email: string, password: string): Promise<AuthResponse> {
        return Promise.resolve({token: '123'});
    }
}

export default AuthService;
