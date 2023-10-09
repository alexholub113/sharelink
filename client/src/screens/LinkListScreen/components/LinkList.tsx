import { observer } from "mobx-react-lite"
import {useStore} from '../../../contexts/AppContext.tsx';
import LinkStore from '../../../stores/LinkStore.ts';
import LinkListItem from './LinkListItem.tsx';

const LinkListScreen = observer(() => {
    const { state: { links } } = useStore<LinkStore>(LinkStore);

    return (
        <>
            { links.map((link) => (
                <LinkListItem key={link.id} link={link} />
            )) }
        </>
    );
});

export default LinkListScreen;
