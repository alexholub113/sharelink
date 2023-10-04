import LinkStore from '../../stores/LinkStore.ts';
import {useStore} from '../../contexts/StoreContext.tsx';
import { observer } from "mobx-react-lite"

const LinkList = observer(() => {
    const { state: { links } } = useStore<LinkStore>(LinkStore);
    return (
        <div>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
            <ul>
                {links.map(link => (
                    <li>{link.title}</li>
                ))}
            </ul>
        </div>
    );
});

export default LinkList;
