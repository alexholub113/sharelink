import { observer } from "mobx-react-lite"
import {useStore} from '../../../contexts/AppContext.tsx';
import LinkStore from '../../../stores/LinkStore.ts';
import LinkListItem from './LinkListItem/LinkListItem.tsx';
import LinkListToolbar from './LinkListToolbar/LinkListToolbar.tsx';

const LinkListScreen = observer(() => {
    const { state: { links } } = useStore<LinkStore>(LinkStore);

    return (
        <>
            <div className="mb-6">
                <LinkListToolbar />
            </div>
            { links.map((link) => (
                <LinkListItem key={link.id} link={link} />
            )) }
        </>
    );
});

export default LinkListScreen;
