import YoutubeVideoContent from './Contents/YoutubeVideoContent.tsx';
import Link from '../../../models/Link.ts';
import LinkType from '../../../models/LinkType.ts';

const LinkListItemContent = ({ type, youtube }: Pick<Link, 'type' | 'youtube'>) => {
    if (type === LinkType.Youtube) {
        return (<YoutubeVideoContent {...youtube} />);
    }

    return null;
};

export default LinkListItemContent;