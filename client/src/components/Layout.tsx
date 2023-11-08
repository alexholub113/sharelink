import React, { PropsWithChildren } from 'react';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col items-center sm:px-4 md:px-24 max-w-screen-2xl pb-24 md:w-[95%] min-w-[300px]">
                {children}
            </div>
        </div>
    );
};

export default Layout;
