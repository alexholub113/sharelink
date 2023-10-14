import Layout from './components/Layout.tsx';
import Toolbar from './components/Toolbar.tsx';
import {useState} from 'react';
import LinkListScreen from './screens/LinkList/LinkListScreen.tsx';
import AddLinkButton from './components/AddLinkButton.tsx';
import AddLinkScreen from './screens/AddLink/AddLinkScreen.tsx';

function App() {
    const [section, setSection] = useState<'list' | 'addLink'>('list');
    return (
        <div className="bg-zinc-800 min-h-screen">
            <Toolbar />
            <Layout>
                <>
                    <div className="mb-8">
                        <AddLinkButton showAddLink={section == 'list'} onClick={() => setSection(section === 'list' ? 'addLink' : 'list')} />
                    </div>
                    { section === 'list' && <LinkListScreen /> }
                    { section === 'addLink' && <AddLinkScreen /> }
                </>
            </Layout>
        </div>
    )
}

export default App
