import Link from './Link.ts';
import Tag from './Tag.ts';
import PreviewLink from './PreviewLink.ts';

export type GetListResponse = {
    items: Link[];
    tags: Tag[]
}

export type AddLinkResponse = {
    link: Link;
};

interface ILinkService {
    getList(): Promise<GetListResponse>;
    previewLink(url: string): Promise<PreviewLink>;
    addLink(url: string): Promise<AddLinkResponse>;
    like(linkId: string): Promise<void>;
    save(linkId: string): Promise<void>;
    remove(linkId: string): Promise<void>;
}

export default ILinkService;
