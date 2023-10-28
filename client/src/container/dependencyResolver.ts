import Types from './constants/Types.ts';
import LinkService from '../services/LinkService/LinkService.ts';
import LinkStore from '../stores/LinkStore.ts';
import UserStore from '../stores/UserStore.ts';
import AuthService from '../services/AuthService/AuthService.ts';

const resolvers = new Map<symbol, () => object>();

resolvers.set(Types.LinkService, () => new LinkService());
resolvers.set(Types.AuthService, () => new AuthService());

resolvers.set(Types.LinkStore, () => new LinkStore(resolve(Types.LinkService)));
resolvers.set(Types.UserStore, () => new UserStore(resolve(Types.AuthService)));

const resolve = <T>(key: symbol) => {
    const resolver = resolvers.get(key);
    if (!resolver) {
        throw new Error(`No resolver found for ${key.toString()}`);
    }

    return resolver() as T;
};

export { resolve }