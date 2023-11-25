
import LinkListItemContent from './components/LinkListItemContent.tsx';
import LinkListItemTitle from './components/LinkListItemTitle.tsx';
import Link from '../../../../services/LinkService/interfaces/Link.ts';
import LinkListItemAuthor from './components/LinkListItemAuthor.tsx';
import LinkListItemTags from './components/LinkListItemTags.tsx';
import LinkListItemWrapper from './LinkListItemWrapper.tsx';
import LinkListItemActionButtons from './components/LinkListItemActionButtons.tsx';

const LinkListItem = ({ link }: { link: Link }) => {
    return (
        <LinkListItemWrapper>
            <LinkListItemContent {...link} />
            <div className="px-2 mb-4">
                <LinkListItemActionButtons {...link} />
            </div>
            <LinkListItemTags tags={link.tags} />
            <LinkListItemTitle title={link.title} />
            <LinkListItemAuthor {...link} />
        </LinkListItemWrapper>
    );
};

export default LinkListItem;