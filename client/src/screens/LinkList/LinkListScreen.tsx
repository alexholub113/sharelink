import { observer } from "mobx-react-lite"
import {useLinkStore} from '../../contexts/AppContext.tsx';
import LinkListItem from './components/LinkListItem/LinkListItem.tsx';
import LinkListToolbar from './components/LinkListToolbar/LinkListToolbar.tsx';
import LinkListItemSkeleton from './components/LinkListItemSkeleton.tsx';

const LinkListScreen = observer(() => {
    const { state: { links, isListLoading } } = useLinkStore();

    return (
        <>
            <div className="flex items-center justify-center md:mb-16 mb-8 w-full max-w-screen-sm">
                <LinkListToolbar />
            </div>

            <div className="flex flex-wrap w-full items-start justify-center gap-4">
                { links.map((link) => (
                    <LinkListItem key={link.id} link={link} />
                )) }
                { !links.length && isListLoading && (
                    <>
                        <LinkListItemSkeleton />
                        <LinkListItemSkeleton />
                    </>
                )}
            </div>
        </>
    );
});

export default LinkListScreen;