import Layout from './components/Layout.tsx';
import Toolbar from './components/Toolbar/Toolbar.tsx';
import {useEffect, useState} from 'react';
import LinkListScreen from './screens/LinkList/LinkListScreen.tsx';
import AddLinkButton from './components/AddLinkButton.tsx';
import AddLinkScreen from './screens/AddLink/AddLinkScreen.tsx';
import {useUserStore} from './contexts/AppContext.tsx';
import {observer} from 'mobx-react-lite';

const App = observer(() => {
    const [section, setSection] = useState<'list' | 'addLink'>('list');
    const { init } = useUserStore();

    useEffect(() => {
        init();
    }, [init]);

    return (
        <div className="bg-zinc-900 min-h-screen">
            <Toolbar />
            <Layout>
                <>
                    <div className="mb-8">
                        <AddLinkButton showAddLink={section == 'list'} onClick={() => setSection(section === 'list' ? 'addLink' : 'list')} />
                    </div>
                    { section === 'list' && <LinkListScreen /> }
                    { section === 'addLink' && <AddLinkScreen onSuccess={() => setSection('list')} /> }
                </>
            </Layout>
        </div>
    )
});

export default App