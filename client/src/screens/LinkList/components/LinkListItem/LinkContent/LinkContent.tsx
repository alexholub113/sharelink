import Link from '../../../../../services/LinkService/interfaces/Link.ts';
import LinkType from '../../../../../services/LinkService/interfaces/LinkType.ts';
import YoutubeVideoContent from './Contents/YoutubeVideoContent.tsx';

const LinkContent = ({ link }: { link: Link }) => {
    if (link.type === LinkType.youtube) {
        return (<YoutubeVideoContent {...link.youtube} />);
    }

    return null;
};

export default LinkContent;
