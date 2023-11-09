import Link from './Link.ts';
import Tag from './Tag.ts';

export type GetListResponse = {
    items: Link[];
    tags: Tag[];
    pageNumber: number;
    totalPages: number;
    totalCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export type AddLinkRequest = {
    url: string;
    tags: string[];
    title: string;
}

export type PreviewLinkRequest = {
    url: string;
}

export type LikeLinkRequest = {
    linkId: string;
    state: boolean;
}

export type SaveLinkRequest = {
    linkId: string;
    state: boolean;
}

export type PreviewLinkResponse = Pick<Link, 'type' | 'title' | 'youtube' | 'tags'>;

interface ILinkService {
    getList(): Promise<GetListResponse>;
    previewLink(request: PreviewLinkRequest): Promise<PreviewLinkResponse>;
    addLink(request: AddLinkRequest): Promise<Link>;
    like(request: LikeLinkRequest): Promise<void>;
    save(request: SaveLinkRequest): Promise<void>;
    remove(linkId: string): Promise<void>;
}

export default ILinkService;