import LinkType from './LinkType.ts';

export type YoutubeVideo = {
    videoId: string;
};

type Link = {
    id: string;
    title: string;
    youtube: YoutubeVideo,
    likes: number;
    isLiked: boolean;
    isSaved: boolean;
    belongsToUser: boolean;
    user: string;
    createdAt: string;
    type: LinkType;
    tags: string[];
};

export default Link;