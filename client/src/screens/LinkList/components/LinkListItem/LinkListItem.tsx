
import LinkListItemContent from './components/LinkListItemContent.tsx';
import LinkListItemTitle from './components/LinkListItemTitle.tsx';
import Link from '../../../../services/LinkService/interfaces/Link.ts';
import LinkListItemAuthor from './components/LinkListItemAuthor.tsx';
import LinkListItemTags from './components/LinkListItemTags.tsx';
import LinkListItemLikeBar from './components/LinkListItemLikeBar.tsx';

const LinkListItem = ({ link }: { link: Link }) => {
    return (
        <div className="flex flex-col gap-2 w-full md:max-w-screen-sm p-4 border-solid border-1 border-gray-200 rounded-lg 
        dark:shadow-xl dark:shadow-zinc-900 dark:bg-transparent dark:border-zinc-900">
            <LinkListItemTitle title={link.title} />
            <LinkListItemTags tags={link.tags} />
            <LinkListItemAuthor {...link} />
            <LinkListItemContent link={link} />
            <LinkListItemLikeBar {...link} />
        </div>
    );
};

export default LinkListItem;
