import Link from '../../../../../services/LinkService/interfaces/Link.ts';
import LinkType from '../../../../../services/LinkService/interfaces/LinkType.ts';
import YoutubeVideoContent from './Contents/YoutubeVideoContent.tsx';

const LinkListItemContent = ({ type, youtube }: Pick<Link, 'type' | 'youtube'>) => {
    if (type === LinkType.Youtube) {
        return (<YoutubeVideoContent {...youtube} />);
    }

    return null;
};

export default LinkListItemContent;