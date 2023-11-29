import {observer} from 'mobx-react-lite';
import {useLinkStore} from '../../../contexts/AppContext.tsx';
import LinkListItem from './LinkListItem/LinkListItem.tsx';
import LinkListItemSkeleton from './LinkListItemSkeleton.tsx';
import InfiniteScrollList from '../../../components/InfiniteScrollList.tsx';
import useAsyncAction from '../../../hooks/useAsyncAction.ts';

const Skeletons = () => (
    <>
        <LinkListItemSkeleton />
        <LinkListItemSkeleton />
        <LinkListItemSkeleton />
        <LinkListItemSkeleton />
    </>
);

const LinkInfiniteScrollList = observer(() => {
    const { state: { links, isListLoading, paginationState: { hasNextPage } }, loadMore } = useLinkStore();
    const {execute: executeLoadMore, loading: nextPageLoading } = useAsyncAction(loadMore);
    return (
        <div className="flex flex-wrap w-full items-start justify-center gap-4">
            {!isListLoading && (
                <InfiniteScrollList isLoading={nextPageLoading}
                                    isReloading={false}
                                    renderLoader={() => <Skeletons />}
                                    hasNextPage={hasNextPage}
                                    fetchNextPage={executeLoadMore}
                threshold={2}>
                    { links.map((link) => (
                        <div key={link.id} className="link-item-wrapper">
                            <LinkListItem  link={link} />
                        </div>
                    )) }
                </InfiniteScrollList>
            )}
            { isListLoading && <Skeletons />}
        </div>
    );
});

export default LinkInfiniteScrollList;