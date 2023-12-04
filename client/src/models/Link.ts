import LinkType from './LinkType.ts';
import UnknownSource from './UnknownSource.ts';

export type YoutubeVideo = {
    videoId: string;
};

type Link = {
    id: string;
    title: string;
    youtube?: YoutubeVideo,
    unknownSource?: UnknownSource,
    likes: number;
    isLiked: boolean;
    isSaved: boolean;
    belongsToUser: boolean;
    user: string;
    createdAt: string;
    type: LinkType;
    tags: string[];
    editable: boolean;
};

export default Link;