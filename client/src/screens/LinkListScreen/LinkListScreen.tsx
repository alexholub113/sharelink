import { observer } from "mobx-react-lite"
import {useState} from 'react';
import LinkList from './components/LinkList.tsx';
import AddLinkButton from './components/AddLinkButton.tsx';

const LinkListScreen = observer(() => {
    const [section, setSection] = useState<'list' | 'addLink'>('list');
    return (
        <>
            <div className="mb-6">
                <AddLinkButton showAddLink={section == 'list'} onClick={() => setSection(section === 'list' ? 'addLink' : 'list')} />
            </div>
            { section === 'list' && <LinkList /> }
        </>
    );
});

export default LinkListScreen;
