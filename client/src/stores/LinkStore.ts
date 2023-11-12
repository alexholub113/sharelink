import {action, makeObservable, observable, runInAction} from 'mobx'
import type ILinkService from '../services/LinkService/interfaces/ILinkService.ts';
import Link from '../services/LinkService/interfaces/Link.ts';
import Tag from '../services/LinkService/interfaces/Tag.ts';
import PreviewLink from '../services/LinkService/interfaces/PreviewLink.ts';
import {validateUrl} from '../utils/urlValidator.ts';
import {handleError} from '../utils/errors.ts';

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
    constructor(private readonly linkService: ILinkService) {
        makeObservable(this, {
            state: observable,
            applyTagFilter: action,
            removeTagFilter: action,
            setQuery: action,
            previewLink: action,
            likeLink: action,
            saveLink: action,
            updatePreviewLink: action,
            submitLink: action,
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
        this.state.filter.tags = this.state.filter.tags.filter(t => t.name !== tag.name);
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
            isLiked: !link.isLiked,
            likes: link.isLiked ? link.likes - 1 : link.likes + 1
        };
        await this.linkService.like({ linkId: id, state: !link.isLiked });
    };

    public saveLink = async (id: string) => {
        const link = this.state.links.find(link => link.id === id);
        if (!link) {
            throw new Error('Link not found');
        }

        const index = this.state.links.findIndex(link => link.id === id);
        await this.linkService.save({ linkId: id, state: !link.isSaved });
        this.state.links[index] = {
            ...link,
            isSaved: !link.isSaved
        };
    };

    public previewLink = async (url: string): Promise<{errorMessage?: string }> => {
        this.state.preview = {
            url: undefined,
            link: undefined,
        };
        const { valid, error } = validateUrl(url);
        if (!valid) {
            return {
                errorMessage: error === 'invalid-url' ?
                    'Your URL is invalid. Try fix it.' :
                    'This kind of URL is not supported.'
            };
        }

        this.state.preview.url = url;

        const previewLink = await this.linkService.previewLink({ url });

        runInAction(() => {
            this.state.preview = {
                ...this.state.preview,
                link: previewLink
            };
        });

        return {};
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

    public submitLink = async (): Promise<{ success: boolean, errorMessage?: string }> => {
        if (!this.state.preview.link) {
            throw new Error('Preview Link not found');
        }

        try {
            const link = await this.linkService.addLink({
                url: this.state.preview.url!,
                ...this.state.preview.link,
            });

            runInAction(() => {
                this.state.links = [link, ...this.state.links];
                this.state.preview = {};
            });

            return {
                success: true,
                errorMessage: undefined
            };
        } catch (e: unknown) {
            return { success: false, errorMessage: handleError(e).errorMessage };
        }
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