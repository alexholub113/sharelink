import { observer } from "mobx-react-lite"
import {useStore} from '../../contexts/AppContext.tsx';
import LinkStore from '../../stores/LinkStore.ts';
import LinkListItem from './components/LinkListItem/LinkListItem.tsx';
import LinkListToolbar from './components/LinkListToolbar/LinkListToolbar.tsx';

const LinkListScreen = observer(() => {
    const { state: { links } } = useStore<LinkStore>(LinkStore);

    return (
        <>
            <div className="md:mb-16 mb-8">
                <LinkListToolbar />
            </div>
            
            <div className="flex flex-wrap w-full items-center justify-center gap-4">
                { links.map((link) => (
                    <LinkListItem key={link.id} link={link} />
                )) }
            </div>
        </>
    );
});

export default LinkListScreen;
