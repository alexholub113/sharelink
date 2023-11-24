import {PropsWithChildren} from 'react';

type LinkListItemWrapperProps = {
    className?: string;
} & PropsWithChildren;

const LinkListItemWrapper = ({ children, className }: LinkListItemWrapperProps) => (
    <div className={`flex flex-col gap-3 w-full md:max-w-screen-sm p-4 border-gray-200 rounded-lg
            dark:shadow-xl dark:shadow-zinc-900 card-border bg-transparent mt-6 ${className}`}>
        {children}
    </div>
);

export default LinkListItemWrapper;