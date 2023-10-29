import Types from './constants/Types.ts';
import LinkService from '../services/LinkService/LinkService.ts';
import LinkStore from '../stores/LinkStore.ts';
import UserStore from '../stores/UserStore.ts';
import AuthService from '../services/AuthService/AuthService.ts';
import HttpClient from '../services/HttpClient/HttpClient.ts';

const container = new Map<symbol, object>();
const resolvers = new Map<symbol, () => object>();

resolvers.set(Types.LinkService, () => new LinkService(resolve(Types.HttpClient)));
resolvers.set(Types.AuthService, () => new AuthService());
resolvers.set(Types.HttpClient, () => new HttpClient());

resolvers.set(Types.LinkStore, () => new LinkStore(resolve(Types.LinkService)));
resolvers.set(Types.UserStore, () => new UserStore(resolve(Types.AuthService)));

const resolve = <T>(key: symbol) => {
    if (!container.has(key)) {
        const resolver = resolvers.get(key);
        if (!resolver) {
            throw new Error(`No resolver found for ${key.toString()}`);
        }

        const value = resolver();
        container.set(key, value);

        return value as T;
    }

    return container.get(key) as T;
};

export { resolve }