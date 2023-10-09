import LinkType from './LinkType.ts';

type Link = {
    id: string;
    url: string;
    title: string;
    user: string;
    createdAt: string;
    type: LinkType;
};

export default Link;
