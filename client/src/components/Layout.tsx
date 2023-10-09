import React, { PropsWithChildren } from 'react';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col items-center max-w-[60rem]">
                {children}
            </div>
        </div>
    );
};

export default Layout;
