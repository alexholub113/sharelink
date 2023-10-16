import * as React from 'react';
import {PropsWithChildren} from 'react';
import LinkStore from '../stores/LinkStore.ts';
import AuthService from '../services/AuthService/AuthService.ts';
import UserStore from '../stores/UserStore.ts';

export const useStore = <T extends object>(store: object): T => React.useContext(AppContext).stores.get(store) as T;

export const useLinkStore = (): LinkStore => useStore<LinkStore>(LinkStore);
export const useUserStore = (): UserStore => useStore<UserStore>(UserStore);

export const useService = <T extends object>(store: object): T => React.useContext(AppContext).services.get(store) as T;

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
    stores.set(LinkStore, new LinkStore());
    stores.set(UserStore, new UserStore());
    
    const services = new Map();
    services.set(AuthService, new AuthService());
    return <AppContext.Provider value={{stores, services}}>{children}</AppContext.Provider>;
};
