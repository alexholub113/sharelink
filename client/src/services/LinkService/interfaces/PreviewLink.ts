import LinkType from './LinkType.ts';
import {YoutubeVideo} from './Link.ts';

type PreviewLink = {
    type: LinkType;
    title: string;
    tags: string[];
    youtube: YoutubeVideo,
};

export default PreviewLink;
