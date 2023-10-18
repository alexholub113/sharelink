import Link from './Link.ts';
import Tag from './Tag.ts';
import PreviewLink from './PreviewLink.ts';

type Response = {
    success: boolean;
    errors?: string[];
};

export type GetListResponse = {
    items: Link[];
    tags: Tag[]
}

export type AddLinkResponse = {
    data: Link;
} & Response;

export type PreviewLinkResponse = {
    data: PreviewLink;
} & Response;

interface ILinkService {
    getList(): Promise<GetListResponse>;
    previewLink(url: string): Promise<PreviewLinkResponse>;
    addLink(previewLink: PreviewLink): Promise<AddLinkResponse>;
    like(linkId: string): Promise<void>;
    save(linkId: string): Promise<void>;
    remove(linkId: string): Promise<void>;
}

export default ILinkService;
