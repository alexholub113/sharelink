import * as React from 'react';
import {PropsWithChildren} from 'react';
import LinkStore from '../stores/LinkStore.ts';

export const useStore = <T extends object>(store: object): T => React.useContext(StoresContext).get(store) as T;

const StoresContext = React.createContext<Map<object, object>>(new Map());

export const StoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const stores = new Map();
    stores.set(LinkStore, new LinkStore());
    return <StoresContext.Provider value={stores}>{children}</StoresContext.Provider>;
};
