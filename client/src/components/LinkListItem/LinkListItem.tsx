
import LinkListItemContent from './components/LinkListItemContent.tsx';
import LinkListItemTitle from './components/LinkListItemTitle.tsx';
import LinkListItemAuthor from './components/LinkListItemAuthor.tsx';
import LinkListItemTags from './components/LinkListItemTags.tsx';
import LinkListItemActionButtons from './components/LinkListItemActionButtons.tsx';
import Link from '../../models/Link.ts';

const LinkListItem = ({ link }: { link: Link }) => {
    return (
        <>
            <LinkListItemContent {...link} />
            <div className="px-2 mb-4">
                <LinkListItemActionButtons {...link} />
            </div>
            <LinkListItemTags tags={link.tags} />
            <LinkListItemTitle title={link.title} />
            <LinkListItemAuthor {...link} />
        </>
    );
};

export default LinkListItem;