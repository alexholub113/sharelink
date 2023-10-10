import LinkType from './LinkType.ts';

type Link = {
    id: string;
    youtube: {
        id: string;
        title: string;
        publishedAt: string;
    },
    likes: number;
    liked: boolean;
    user: string;
    createdAt: string;
    type: LinkType;
    tags: string[];
};

export default Link;
