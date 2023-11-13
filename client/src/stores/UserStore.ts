import {makeAutoObservable, runInAction} from 'mobx';
import Events from '../constants/events.ts';
import IIdentityService from '../services/IdentityService/interfaces/IIdentityService.ts';
import UserInfo from '../services/IdentityService/interfaces/UserInfo.ts';
import safelyParseJson from '../utils/safelyParseJson.ts';

type UserStoreState = {
    info?: UserInfo | undefined | null;
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
    };

    get isAuthenticated(): boolean {
        return !!this.state.info?.nickname;
    }

    handleUnauthorizedResponse = () => {
        this.state = {
            showLoginModal: true,
            info: undefined,
        }
    };

    public init = async (): Promise<void> => {
        const userStorageItem = safelyParseJson(localStorage.getItem('user'));
        if (userStorageItem && userStorageItem.nickname) {
            runInAction(() => {
                this.state = {
                    ...this.state,
                    info: {
                        nickname: userStorageItem.nickname,
                    },
                };
            });

            return ;
        }

        const userInfo = await this.identityService.userInfo();
        localStorage.setItem('user', JSON.stringify(userInfo));

        runInAction(() => {
            this.state = {
                ...this.state,
                info: userInfo
            };
        });
    }

    public logIn = async (email: string, password: string): Promise<void> => {
        await this.identityService.login({ email, password });

        runInAction(() => {
            this.state = {
                ...this.state,
                showLoginModal: false
            }
        });

        await this.init();

    };

    public signOut = async (): Promise<void> => {
        try {
            if (!this.isAuthenticated) {
                return ;
            }

            await this.identityService.signOut();

            runInAction(() => {
                this.state = {
                    info: undefined,
                    showLoginModal: false
                }
            });

            localStorage.removeItem('user');
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