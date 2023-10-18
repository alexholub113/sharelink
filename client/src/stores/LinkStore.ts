import {action, makeObservable, observable, runInAction} from 'mobx'
import ILinkService from '../services/LinkService/interfaces/ILinkService.ts';
import LinkService from '../services/LinkService/LinkService.ts';
import Link from '../services/LinkService/interfaces/Link.ts';
import Tag from '../services/LinkService/interfaces/Tag.ts';
import PreviewLink from '../services/LinkService/interfaces/PreviewLink.ts';

type Filter = {
    tags: Tag[];
    query: string;
};

type Preview = {
    url?: string;
    link?: PreviewLink;
};

type LinkStoreState = {
    isListLoading: boolean;
    links: Link[];
    tags: Tag[];
    filter: Filter;
    preview: Preview;
};

class LinkStore {

    private readonly linkService: ILinkService = new LinkService();
    constructor() {
        makeObservable(this, {
            state: observable,
            applyTagFilter: action,
            removeTagFilter: action,
            setQuery: action,
            previewLink: action,
            likeLink: action,
            saveLink: action,
            updatePreviewLink: action,
        });

        this.init();
    }
    
    state: LinkStoreState = {
        isListLoading: true,
        links: [],
        tags: [],
        filter: {
            tags: [],
            query: ''
        },
        preview: {
        }
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
    
    public likeLink = async (id: string) => {
        const link = this.state.links.find(link => link.id === id);
        if (!link) {
            throw new Error('Link not found');
        }
        
        const index = this.state.links.findIndex(link => link.id === id);
        this.state.links[index] = {
            ...link,
            liked: !link.liked,
            likes: link.liked ? link.likes - 1 : link.likes + 1
        };
        await this.linkService.like(id);
    };
    
    public saveLink = async (id: string) => {
        const link = this.state.links.find(link => link.id === id);
        if (!link) {
            throw new Error('Link not found');
        }

        const index = this.state.links.findIndex(link => link.id === id);
        this.state.links[index] = {
            ...link,
            saved: !link.saved
        };
    };

    public previewLink = async (url: string) => {
        this.state.preview = {
            url,
            link: undefined,
        };

        const previewLink = await this.linkService.previewLink(url);
        runInAction(() => {
            this.state.preview = {
                ...this.state.preview,
                link: previewLink
            };
        });
    };
    
    public updatePreviewLink = (updates: Partial<PreviewLink>) => {
        if (!this.state.preview.link) {
            throw new Error('Preview Link not found');
        }

        this.state.preview.link = {
            ...this.state.preview.link,
            ...updates,
        };
    };

    private init = async () => {
        await this.getList();
    };
    
    private getList = async () => {
        const response = await this.linkService.getList();
        runInAction(() => {
            this.state.links = response.items;
            this.state.tags = [...new Set<Tag>(response.tags)];
            this.state.isListLoading = false;
        });
    }
}

export default LinkStore;
