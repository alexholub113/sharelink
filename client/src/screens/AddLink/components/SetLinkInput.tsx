import {useState} from 'react';
import Input from '../../../components/Input.tsx';
import {observer} from 'mobx-react-lite';
import LinkStore from '../../../stores/LinkStore.ts';
import {useStore} from '../../../contexts/AppContext.tsx';

const SetLinkInput = observer(() => {
    const { state: { preview: { url }}, previewLink } = useStore<LinkStore>(LinkStore);
    const [linkUrl, setLinkUrl] = useState(url);
    
    return (
        <div className="flex items-center gap-2">
            <Input placeholder="Put you URL here" value={linkUrl} onChange={setLinkUrl} />
            <button onClick={() => previewLink(linkUrl)} className="inline-flex justify-center button-animation p-2 text-cyan-600 rounded-full cursor-pointer hover:bg-cyan-100 dark:text-cyan-500 dark:hover:bg-zinc-600">
                <svg className="w-5 h-5 rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                    <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
                </svg>
            </button>
        </div>
    );
});

export default SetLinkInput;
