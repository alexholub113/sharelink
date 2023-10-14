import LinkType from './LinkType.ts';

export type YoutubeVideo = {
    id: string;
};

type Link = {
    id: string;
    title: string;
    youtube: YoutubeVideo,
    likes: number;
    liked: boolean;
    saved: boolean;
    user: string;
    createdAt: string;
    type: LinkType;
    tags: string[];
};

export default Link;
