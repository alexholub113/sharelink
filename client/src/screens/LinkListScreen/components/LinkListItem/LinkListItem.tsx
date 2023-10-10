import Link from '../../../../services/LinkService/interfaces/Link.ts';
import LinkType from '../../../../services/LinkService/interfaces/LinkType.ts';
import YoutubeItem from './SpecificItems/YoutubeItem.tsx';

const LinkListItem = ({ link }: { link: Link }) => {
    if (link.type === LinkType.youtube) {
        return (<YoutubeItem link={link} />);
    }

    return null;
};

export default LinkListItem;
