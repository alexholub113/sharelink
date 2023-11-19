import {PropsWithChildren} from 'react';

type SkeletonProps = {
    className?: string;
} & PropsWithChildren;
const Skeleton = ({ children, className }: SkeletonProps) => (
    <div className={`h-6 rounded-lg animate-pulse card-background ${className}`}>
        {children}
    </div>
);

export default Skeleton;