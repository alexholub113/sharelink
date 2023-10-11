import React, { PropsWithChildren } from 'react';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col items-center md:w-[50%]">
                {children}
            </div>
        </div>
    );
};

export default Layout;
