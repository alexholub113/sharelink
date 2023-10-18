import React, { PropsWithChildren } from 'react';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col items-center md:px-24 max-w-screen-2xl md:w-[95%] pb-24">
                {children}
            </div>
        </div>
    );
};

export default Layout;
