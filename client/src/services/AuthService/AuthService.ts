import IAuthService, { AuthResponse } from './interfaces/IAuthService.ts';

class AuthService implements IAuthService {
    login(email: string, password: string): Promise<AuthResponse> {
        console.log({email, password});
        return Promise.resolve({token: '123'});
    }

    register(nickname: string, email: string, password: string): Promise<AuthResponse> {
        console.log({nickname, email, password});
        return Promise.resolve({token: '123'});
    }
}

export default AuthService;
