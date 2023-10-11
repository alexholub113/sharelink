import LinkType from './LinkType.ts';

export type YoutubeVideo = {
    id: string;
    title: string;
    publishedAt: string;
};

type Link = {
    id: string;
    youtube: YoutubeVideo,
    likes: number;
    liked: boolean;
    user: string;
    createdAt: string;
    type: LinkType;
    tags: string[];
};

export default Link;
