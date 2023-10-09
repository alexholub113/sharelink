import React, { PropsWithChildren } from 'react';
import Toolbar from './Toolbar.tsx';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <div className="container mx-auto flex flex-col h-screen p-6">
                <Toolbar />
                <div>
                    {children}
                </div>
            </div>
        </>
    );
};

export default Layout;
