import Link from './Link.ts';
import Tag from './Tag.ts';

export type GetListResponse = {
    items: Link[];
    tags: Tag[]
}

export type PreviewYoutubeVideoResponse = {
    id: string;
    title: string;
    publishedAt: string;
    tags: string[];
};

export type AddYoutubeVideoResponse = {
    link: Link;
};

interface ILinkService {
    getList(): Promise<GetListResponse>;
    previewYoutubeVideo(videoId: string): Promise<PreviewYoutubeVideoResponse>;
    addYoutubeVideo(videoId: string): Promise<AddYoutubeVideoResponse>;
    like(linkId: string): Promise<void>;
    save(linkId: string): Promise<void>;
}

export default ILinkService;
