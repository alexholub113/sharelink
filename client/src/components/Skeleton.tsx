import {PropsWithChildren} from 'react';

type SkeletonProps = {
    className?: string;
} & PropsWithChildren;
const Skeleton = ({ children, className }: SkeletonProps) => (
    <div className={`h-8 rounded-lg animate-pulse dark:bg-gray-700 ${className}`}>
        {children}
    </div>
);

export default Skeleton;
