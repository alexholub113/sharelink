import YoutubeVideoContent from './Contents/YoutubeVideoContent.tsx';
import Link from '../../models/Link.ts';
import LinkType from '../../models/LinkType.ts';
import UnknownSourceContent from './Contents/UnknownSourceContent.tsx';

const LinkListItemContent = ({ type, youtube, unknownSource }: Pick<Link, 'type' | 'youtube' | 'unknownSource'>) => {
    if (type === LinkType.Youtube && youtube) {
        return (<YoutubeVideoContent {...youtube} />);
    }

    if (type === LinkType.UnknownSource && unknownSource) {
        return (<UnknownSourceContent {...unknownSource} />);
    }

    return null;
};

export default LinkListItemContent;