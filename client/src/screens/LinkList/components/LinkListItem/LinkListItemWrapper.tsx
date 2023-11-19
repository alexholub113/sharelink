import {PropsWithChildren} from 'react';

const LinkListItemWrapper = ({ children }: PropsWithChildren) => (
    <div className="flex flex-col gap-2 w-full md:max-w-screen-sm p-4 border-gray-200 rounded-lg
            dark:shadow-xl dark:shadow-zinc-900 card-border card-background">
        {children}
    </div>
);

export default LinkListItemWrapper;