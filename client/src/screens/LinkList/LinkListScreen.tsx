import LinkInfiniteScrollList from './LinkInfiniteScrollList.tsx';
import LinkListToolbar from './LinkListToolbar/LinkListToolbar.tsx';

const LinkListScreen = () => {
    return (
        <>
            <div className="flex items-center justify-center md:mb-16 mb-8 w-full max-w-screen-sm">
                <LinkListToolbar />
            </div>

            <div className="flex flex-wrap w-full items-start justify-center gap-4">
                <LinkInfiniteScrollList />
            </div>
        </>
    );
};

export default LinkListScreen;