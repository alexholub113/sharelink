import LinkType from './LinkType.ts';
import {YoutubeVideo} from './Link.ts';
import UnknownSource from './UnknownSource.ts';

type PreviewLink = {
    type: LinkType;
    title: string;
    tags: string[];
    youtube?: YoutubeVideo,
    unknownSource?: UnknownSource,
};

export default PreviewLink;