import Layout from './components/Layout.tsx';
import Toolbar from './components/Toolbar/Toolbar.tsx';
import {useEffect, useState} from 'react';
import LinkListScreen from './screens/LinkList/LinkListScreen.tsx';
import AddLinkButton from './components/AddLinkButton.tsx';
import AddLinkScreen from './screens/AddLink/AddLinkScreen.tsx';
import {useUserStore} from './contexts/AppContext.tsx';
import {observer} from 'mobx-react-lite';
import Footer from './components/Footer.tsx';
import Header from './components/Header.tsx';
import MockApiWarning from './components/MockApiWarning.tsx';

const App = observer(() => {
    const [section, setSection] = useState<'list' | 'addLink'>('list');
    const { init, isAuthenticated, showSignInModal } = useUserStore();

    useEffect(() => {
        init();
    }, [init]);
    
    const handleAddLinkButton = () => {
        if (section === 'list' && !isAuthenticated) {
            showSignInModal();
        }

        setSection(section === 'list' ? 'addLink' : 'list');
    };

    return (
        <div className="flex flex-col justify-start min-h-screen">
            <div className="flex-grow">
                <Toolbar />
                <MockApiWarning />

                <Layout>
                    <>
                        <Header />
                        <div className="mb-8">
                            <AddLinkButton showAddLink={section == 'list'} onClick={handleAddLinkButton} />
                        </div>
                        { section === 'list' && <LinkListScreen /> }
                        { section === 'addLink' && <AddLinkScreen onSuccess={() => setSection('list')} /> }
                    </>
                </Layout>
            </div>
            <Footer />
        </div>
    )
});

export default App