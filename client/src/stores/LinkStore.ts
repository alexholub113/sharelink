import {makeObservable, observable, runInAction} from 'mobx'
import ILinkService from '../services/LinkService/interfaces/ILinkService.ts';
import LinkService from '../services/LinkService/LinkService.ts';
import Link from '../services/LinkService/interfaces/Link.ts';

type LinkStoreState = {
    isLoading: boolean;
    links: Link[];
};

class LinkStore {

    private readonly linkService: ILinkService = new LinkService();
    constructor() {
        makeObservable(this, {
            state: observable
        });

        this.init();
    }
    
    state: LinkStoreState = {
        isLoading: true,
        links: [],
    };

    private init: () => Promise<void> = async () => {
        const response = await this.linkService.GetList();
        runInAction(() => {
            this.state.links = response.items;
            console.log('this.state.links', this.state.links);
            this.state.isLoading = false;
        });
    };
}

export default LinkStore;
