import {makeObservable, observable, runInAction} from 'mobx'
import Link from '../services/ShareUsefulnessService/interfaces/Link.ts';
import ShareUsefulnessService from '../services/ShareUsefulnessService/ShareUsefulnessService.ts';
import IShareUsefulnessService from '../services/ShareUsefulnessService/interfaces/IShareUsefulnessService.ts';

type LinkStoreState = {
    isLoading: boolean;
    links: Link[];
};

class LinkStore {

    private readonly shareUsefulnessService: IShareUsefulnessService = new ShareUsefulnessService();
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
        const response = await this.shareUsefulnessService.GetList();
        runInAction(() => {
            this.state.links = response.items;
            console.log('this.state.links', this.state.links);
            this.state.isLoading = false;
        });
    };
}

export default LinkStore;
