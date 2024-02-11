import {makeAutoObservable, runInAction} from 'mobx';
import Events from '../constants/events.ts';
import IAccountService from '../services/AccountService/interfaces/IAccountService.ts';
import UserInfo from '../models/UserInfo.ts';

type UserStoreState = {
    info?: UserInfo | undefined | null;
    expireDate?: Date | undefined | null;
    showLoginModal: boolean;
};

const expirationTime = 15 * 24 * 60 * 60 * 1000;

class UserStore {
    constructor(private readonly accountService: IAccountService) {
        makeAutoObservable(this);

        // Register event listener for unauthorized responses
        window.addEventListener(Events.UnauthorizedResponseReceived, this.handleUnauthorizedResponse);
    }

    state: UserStoreState = {
        showLoginModal: false,
    };

    get isAuthenticated(): boolean {
        if (this.state.expireDate) {
            if (this.isExpired(this.state.expireDate)) {
                return false;
            }
        }

        const expireDateCookie = localStorage.getItem('expireDate');
        if (!expireDateCookie) {
            return false;
        }

        const expireDate = new Date(expireDateCookie);
        if (this.isExpired(expireDate)) {
            return false;
        }

        return !!this.state.info?.nickname;
    }

    handleUnauthorizedResponse = () => {
        console.log('Unauthorized response received');
        this.state = {
            showLoginModal: true,
            info: undefined,
            expireDate: undefined,
        }
    };

    public init = async (): Promise<void> => {
        const userInfo = await this.accountService.userInfo();
        localStorage.setItem('user', JSON.stringify(userInfo));
        const expireDate = new Date();
        expireDate.setTime(expireDate.getTime() + expirationTime);
        localStorage.setItem('expireDate', expireDate.toString());

        runInAction(() => {
            this.state = {
                ...this.state,
                expireDate,
                info: userInfo,
            };
        });
    }

    public logIn = async (email: string, password: string): Promise<void> => {
        await this.accountService.login({ email, password });

        runInAction(() => {
            this.state = {
                ...this.state,
                showLoginModal: false
            }
        });

        return this.init();
    };

    public signOut = async (): Promise<void> => {
        try {
            if (!this.isAuthenticated) {
                return ;
            }

            await this.accountService.signOut();
        } catch (error) {
            // Handle error scenario, possibly setting flags to show error messages
        }

        runInAction(() => {
            this.state = {
                info: undefined,
                expireDate: undefined,
                showLoginModal: false
            }
        });

        localStorage.removeItem('user');
    };

    public register = async (nickname: string, email: string, password: string): Promise<void> => {
        await this.accountService.register({ nickname, email, password });
        await this.logIn(email, password);
    };

    public showSignInModal = () => {
        this.state = {
            ...this.state,
            showLoginModal: true,
        }
    };

    public closeSignInModal = () => {
        this.state = {
            ...this.state,
            showLoginModal: false,
        }
    };

    private isExpired = (expireDate: Date): boolean => {
        const now = new Date();
        return now.getTime() > expireDate.getTime();
    };
}

export default UserStore;