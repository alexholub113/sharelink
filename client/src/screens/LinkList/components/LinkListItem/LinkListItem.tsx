
import LinkListItemContent from './components/LinkListItemContent.tsx';
import LinkListItemTitle from './components/LinkListItemTitle.tsx';
import Link from '../../../../services/LinkService/interfaces/Link.ts';
import LinkListItemAuthor from './components/LinkListItemAuthor.tsx';
import LinkListItemTags from './components/LinkListItemTags.tsx';
import LinkListItemLikeBar from './components/LinkListItemLikeBar.tsx';
import LinkListItemWrapper from './LinkListItemWrapper.tsx';

const LinkListItem = ({ link }: { link: Link }) => {
    return (
        <LinkListItemWrapper>
            <LinkListItemTitle title={link.title} />
            <LinkListItemTags tags={link.tags} />
            <LinkListItemAuthor {...link} />
            <LinkListItemContent link={link} />
            <LinkListItemLikeBar {...link} />
        </LinkListItemWrapper>
    );
};

export default LinkListItem;
