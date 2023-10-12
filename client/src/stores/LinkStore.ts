import {action, makeObservable, observable, runInAction} from 'mobx'
import ILinkService from '../services/LinkService/interfaces/ILinkService.ts';
import LinkService from '../services/LinkService/LinkService.ts';
import Link from '../services/LinkService/interfaces/Link.ts';
import Tag from '../services/LinkService/interfaces/Tag.ts';

type Filter = {
    tags: Tag[];
    query: string;
};

type LinkStoreState = {
    isLoading: boolean;
    links: Link[];
    tags: Tag[];
    filter: Filter;
};

class LinkStore {

    private readonly linkService: ILinkService = new LinkService();
    constructor() {
        makeObservable(this, {
            state: observable,
            applyTagFilter: action,
            removeTagFilter: action,
            setQuery: action
        });

        this.init();
    }
    
    state: LinkStoreState = {
        isLoading: true,
        links: [],
        tags: [],
        filter: {
            tags: [],
            query: ''
        },
    };
    
    public applyTagFilter = (tag: Tag) => {
        this.state.filter.tags = [...this.state.filter.tags, tag];
    };

    public removeTagFilter = (tag: Tag) => {
        this.state.filter.tags = this.state.filter.tags.filter(t => t.title !== tag.title);
    };
    
    public setQuery = (query: string) => {
        this.state.filter.query = query;
    };

    private init = async () => {
        await this.getList();
    };
    
    private getList = async () => {
        const response = await this.linkService.getList();
        runInAction(() => {
            this.state.links = response.items;
            this.state.tags = [...new Set<Tag>(response.tags)];
            this.state.isLoading = false;
        });
    }
}

export default LinkStore;
