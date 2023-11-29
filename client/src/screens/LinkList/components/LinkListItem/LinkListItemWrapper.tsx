import {PropsWithChildren} from 'react';

const LinkListItemWrapper = ({ children }: PropsWithChildren) => (
    <div className="link-item-wrapper">
        {children}
    </div>
);

export default LinkListItemWrapper;