import LinkStore from '../../stores/LinkStore.ts';
import { observer } from "mobx-react-lite"
import { useStore } from '../../contexts/AppContext.tsx';

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
