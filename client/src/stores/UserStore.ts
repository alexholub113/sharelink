import {makeAutoObservable, runInAction} from 'mobx';
import Events from '../constants/events.ts';
import IIdentityService from '../services/IdentityService/interfaces/IIdentityService.ts';

type UserStoreState = {
    isAuthenticated: boolean;
    showLoginModal: boolean;
};

class UserStore {
    constructor(private readonly identityService: IIdentityService) {
        makeAutoObservable(this);

        // Register event listener for unauthorized responses
        window.addEventListener(Events.UnauthorizedResponseReceived, this.handleUnauthorizedResponse);
    }

    state: UserStoreState = {
        showLoginModal: false,
        isAuthenticated: false
    };

    handleUnauthorizedResponse = () => {
        this.state = {
            showLoginModal: true,
            isAuthenticated: false
        }
    };

    public init = async (): Promise<void> => {
        const userInfo = await this.identityService.userInfo();

        runInAction(() => {
            this.state = {
                ...this.state,
                isAuthenticated: !!userInfo
            };
        });
    }

    public logIn = async (email: string, password: string): Promise<void> => {
        try {
            await this.identityService.login({ email, password });

            runInAction(() => {
                this.state = {
                    ...this.state,
                    showLoginModal: false
                }
            });

            await this.init();
        } catch (error) {
            // Handle error scenario, possibly setting flags to show error messages
        }
    };

    public register = async (nickname: string, email: string, password: string): Promise<void> => {
        try {
            await this.identityService.register({ nickname, email, password });
            await this.logIn(email, password);
        } catch (error) {
            // Handle error scenario, possibly setting flags to show error messages
        }
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
}

export default UserStore;