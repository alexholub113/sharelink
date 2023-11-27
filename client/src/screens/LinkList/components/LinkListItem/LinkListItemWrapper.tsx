import {PropsWithChildren} from 'react';

type LinkListItemWrapperProps = {
    className?: string;
} & PropsWithChildren;

const LinkListItemWrapper = ({ children, className }: LinkListItemWrapperProps) => (
    <div className={`flex flex-col gap-2 w-full md:max-w-screen-sm border-gray-200 rounded-lg
            dark:shadow-xl dark:shadow-zinc-900 bg-transparent m-5 mt-6 ${className}`}>
        {children}
    </div>
);

export default LinkListItemWrapper;