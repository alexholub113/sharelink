import Link from '../../../../services/LinkService/interfaces/Link.ts';
import LinkContent from './LinkContent/LinkContent.tsx';

const LinkListItem = ({ link }: { link: Link }) => {
    return (
        <div className="w-full md:max-w-screen-md p-4 text-center bg-white border-solid border-1 border-gray-200 rounded-lg 
        dark:shadow-2xl dark:shadow-zinc-900 sm:p-8 card-dark dark:border-zinc-900">
            <LinkContent link={link} />
        </div>
    );
};

export default LinkListItem;
