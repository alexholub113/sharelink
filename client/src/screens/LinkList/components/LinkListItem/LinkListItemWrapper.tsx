import {PropsWithChildren} from 'react';

const LinkListItemWrapper = ({ children }: PropsWithChildren) => (
    <div className="flex flex-col gap-2 w-full md:max-w-screen-sm p-4 border-solid border-1 border-gray-200 rounded-lg 
        dark:shadow-xl dark:shadow-zinc-900 dark:bg-transparent dark:border-zinc-900">
        {children}
    </div>
);

export default LinkListItemWrapper;
