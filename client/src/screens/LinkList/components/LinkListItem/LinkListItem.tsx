
import LinkListItemContent from './components/LinkListItemContent.tsx';
import LinkListItemTitle from './components/LinkListItemTitle.tsx';
import Link from '../../../../services/LinkService/interfaces/Link.ts';
import LinkListItemAuthor from './components/LinkListItemAuthor.tsx';
import LinkListItemTags from './components/LinkListItemTags.tsx';
import LinkListItemLikeBar from './components/LinkListItemLikeBar.tsx';
import LinkListItemWrapper from './LinkListItemWrapper.tsx';
import LinkListItemActionButtons from './components/LinkListItemActionButtons.tsx';

const LinkListItem = ({ link }: { link: Link }) => {
    return (
        <LinkListItemWrapper>
            <LinkListItemActionButtons {...link} />
            <LinkListItemTitle title={link.title} />
            <LinkListItemTags tags={link.tags} />
            <div className="mt-4">
                <LinkListItemAuthor {...link} />
            </div>
            <LinkListItemContent {...link} />
            <LinkListItemLikeBar {...link} />
        </LinkListItemWrapper>
    );
};

export default LinkListItem;