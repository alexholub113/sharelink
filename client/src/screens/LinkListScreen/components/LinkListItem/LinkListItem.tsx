import Link from '../../../../services/LinkService/interfaces/Link.ts';
import LinkContent from './LinkContent/LinkContent.tsx';

const LinkListItem = ({ link }: { link: Link }) => {
    return (
        <div className="w-full md:max-w-screen-md mb-3 p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-zinc-700 dark:border-gray-700">
            <LinkContent link={link} />
        </div>
    );
};

export default LinkListItem;
