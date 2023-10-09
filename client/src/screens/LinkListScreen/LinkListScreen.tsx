import { observer } from "mobx-react-lite"
import {useState} from 'react';
import LinkList from './components/LinkList.tsx';
import AddLinkButton from './components/AddLinkButton.tsx';

const LinkListScreen = observer(() => {
    const [section, setSection] = useState<'list' | 'addLink'>('list');
    return (
        <>
            <AddLinkButton showAddLink={section == 'list'} onClick={() => setSection(section === 'list' ? 'addLink' : 'list')} />
            { section === 'list' && <LinkList /> }
        </>
    );
});

export default LinkListScreen;
