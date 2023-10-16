import IAuthService from '../services/AuthService/interfaces/IAuthService.ts';
import AuthService from '../services/AuthService/AuthService.ts';

type UserStoreState = {
    userName: string;
};

class UserStore {
    private readonly authService: IAuthService;
    
    constructor(authService: IAuthService | null = null) {
        this.authService = authService ?? new AuthService();
    }
    
    state: UserStoreState = {
        userName: 'Jack Richer'
    };
    
    public async logIn(username: string, password: string): Promise<void> {
        await this.authService.login(username, password);
    }

    public async register(nickname: string, username: string, password: string): Promise<void> {
        await this.authService.register(nickname, username, password);
    }
}

export default UserStore;
