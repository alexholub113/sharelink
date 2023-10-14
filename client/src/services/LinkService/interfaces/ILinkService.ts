import Link from './Link.ts';
import Tag from './Tag.ts';
import LinkType from './LinkType.ts';

export type GetListResponse = {
    items: Link[];
    tags: Tag[]
}

export type PreviewLinkResponse = {
    id: string;
    type: LinkType;
    title: string;
    tags: string[];
};

export type AddLinkResponse = {
    link: Link;
};

interface ILinkService {
    getList(): Promise<GetListResponse>;
    previewLink(url: string): Promise<PreviewLinkResponse>;
    addLink(url: string): Promise<AddLinkResponse>;
    like(linkId: string): Promise<void>;
    save(linkId: string): Promise<void>;
}

export default ILinkService;
