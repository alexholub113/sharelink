import {useState} from 'react';
import {observer} from 'mobx-react-lite';
import LinkStore from '../../../stores/LinkStore.ts';
import {useStore} from '../../../contexts/AppContext.tsx';
import {validateUrl} from '../../../utils/urlValidator.ts';
import AddLinkInfoAlert from './AddLinkInfoAlert.tsx';
import ErrorAlert from '../../../components/ErrorAlert.tsx';

const AddLinkSetUrl = observer(() => {
    const { state: { preview: { url }}, previewLink } = useStore<LinkStore>(LinkStore);
    const [linkUrl, setLinkUrl] = useState<string | undefined>(url);
    const [errorMessage, setErrorMessage] = useState<string | undefined>();
    
    const handleSubmit = () => {
        if (linkUrl === url) return;
        const { valid, error } = validateUrl(linkUrl);
        if (!valid) {
            setErrorMessage(
                error === 'invalid-url' ?
                    'Your URL is invalid. Try fix it.' :
                    'This kind of URL is not supported.'
            );
            return;
        }

        setErrorMessage(undefined);
        previewLink(linkUrl!);
    }
    return (
        <div className="flex flex-col gap-4">
            <div className="relative">
                <input type="text" onChange={(event) => setLinkUrl(event.target.value)} className="
                        block w-full p-4 pl-10 border rounded-full input-border-blue dark:bg-zinc-600 
                        dark:border-zinc-500 dark:placeholder-zinc-400 dark:text-white"
                       placeholder="https://www.youtube.com/watch?v=some-video-id" />
                <button onClick={handleSubmit} className="absolute right-2.5 p-2 transition bottom-2.5 text-cyan-600 rounded-full cursor-pointer dark:text-cyan-500 hover:scale-110 active:scale-95 dark:hover:bg-cyan-700">
                    <svg className="w-5 h-5 rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                        <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
                    </svg>
                </button>
            </div>
            { errorMessage && <ErrorAlert message={errorMessage} onClose={() => setErrorMessage(undefined)} /> }
            <AddLinkInfoAlert />
        </div>
    );
});

export default AddLinkSetUrl;
