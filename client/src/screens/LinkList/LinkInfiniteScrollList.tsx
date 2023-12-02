import {observer} from 'mobx-react-lite';
import LinkListItemSkeleton from '../../components/LinkListItem/LinkListItemSkeleton.tsx';
import {useLinkStore} from '../../contexts/AppContext.tsx';
import useAsyncAction from '../../hooks/useAsyncAction.ts';
import InfiniteScrollList from '../../components/InfiniteScrollList.tsx';
import LinkListItem from '../../components/LinkListItem/LinkListItem.tsx';

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
        <>
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
        </>
    );
});

export default LinkInfiniteScrollList;