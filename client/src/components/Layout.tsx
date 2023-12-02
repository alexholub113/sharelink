import React, { PropsWithChildren } from 'react';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col items-center pb-52 w-full px-4 min-w-[300px] max-w-[2048px]">
                {children}
            </div>
        </div>
    );
};

export default Layout;