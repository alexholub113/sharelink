import * as React from 'react';
import {PropsWithChildren} from 'react';
import LinkStore from '../stores/LinkStore.ts';
import UserStore from '../stores/UserStore.ts';
import {resolve} from '../container/dependencyResolver.ts';
import Types from '../container/constants/Types.ts';
import OAuthService from '../services/OAuthService/OAuthService.ts';

export const useStore = <T extends object>(store: object): T => React.useContext(AppContext).stores.get(store) as T;

export const useLinkStore = (): LinkStore => useStore<LinkStore>(LinkStore);
export const useUserStore = (): UserStore => useStore<UserStore>(UserStore);

export const useService = <T extends object>(service: object): T => React.useContext(AppContext).services.get(service) as T;

type AppContextType = {
    stores: Map<object, object>;
    services: Map<object, object>;
};

const AppContext = React.createContext<AppContextType>({
    stores: new Map(),
    services: new Map(),
});

export const AppContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const stores = new Map();
    stores.set(LinkStore, resolve<LinkStore>(Types.LinkStore));
    stores.set(UserStore, resolve<UserStore>(Types.UserStore));

    const services = new Map();
    services.set(OAuthService, resolve<OAuthService>(Types.OAuthService));
    return <AppContext.Provider value={{stores, services}}>{children}</AppContext.Provider>;
};