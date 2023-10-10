import Link from './Link.ts';

type GetListTag = {
    title: string;
    count: number;
};

export type GetListResponse = {
    items: Link[];
    tags: GetListTag[]
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
    GetList(): Promise<GetListResponse>;
    PreviewYoutubeVideo(videoId: string): Promise<PreviewYoutubeVideoResponse>;
    AddYoutubeVideo(videoId: string): Promise<AddYoutubeVideoResponse>;
    Like(linkId: string): Promise<void>;
}

export default ILinkService;
