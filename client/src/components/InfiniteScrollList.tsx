import * as React from 'react';
import {useRef, useCallback, PropsWithChildren} from 'react';

type InfiniteScrollListProps = {
    isLoading: boolean;
    isReloading: boolean;
    renderLoader: (isLoaderActive: boolean) => React.ReactNode | null;
    threshold?: number;
    hasNextPage: boolean;
    fetchNextPage: () => void;
} & PropsWithChildren;

const InfiniteScrollList = (props: InfiniteScrollListProps) => {
    const {
        children,
        isLoading,
        isReloading,
        renderLoader,
        hasNextPage,
        fetchNextPage,
        threshold = 3,
    } = props;

    const observer = useRef<IntersectionObserver>();

    const lastRowElementRef = useCallback((node: Element) => {
        if (isLoading || isReloading || !hasNextPage) return;
        if (observer.current) observer.current.disconnect();

        if (!observer.current) {
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    fetchNextPage();
                }
            });
        }

        if (node) {
            observer.current.observe(node);
        }
    }, [isLoading, isReloading, props.hasNextPage]);

    const childrenCount = React.Children.count(children);

    return (
        <>
            { !isReloading && React.Children.map(children, (child, index) => {
                if (!React.isValidElement(child) || childrenCount - threshold !== index + 1) {
                    return child;
                }

                return React.cloneElement(child, {
                    ...child.props,
                    ref: lastRowElementRef,
                });
            }) }

            { hasNextPage && renderLoader(isLoading || isReloading) }
        </>
    );
};

export default InfiniteScrollList;