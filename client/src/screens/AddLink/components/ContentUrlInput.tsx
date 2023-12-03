import {useState} from 'react';
import Button from '../../../components/Button.tsx';

type ContentUrlInput = {
    onSubmit: (url?: string) => Promise<void>;
    initialUrl?: string;
    isLoading?: boolean;
};

const UrlInput = ({onSubmit, initialUrl, isLoading}: ContentUrlInput) => {
    const [linkUrl, setLinkUrl] = useState<string | undefined>(initialUrl ?? '');

    return (
        <div className="relative">
            <input type="text" value={linkUrl} onChange={(event) => setLinkUrl(event.target.value)} className="
                        block w-full p-4 pr-12 pl-10 rounded-full input-border-blue card-background
                         dark:placeholder-zinc-400 text-sm dark-border"
                   placeholder="https://www.youtube.com/watch?v=some-video-id" />
            <Button disabled={isLoading} onClick={() => onSubmit(linkUrl)} className="absolute right-2.5 p-2 transition bottom-2.5 text-cyan-600 rounded-full cursor-pointer dark:text-cyan-500 active:scale-95 dark:hover:bg-cyan-700">
                <svg className="w-5 h-5 rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                    <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
                </svg>
            </Button>
        </div>
    );
};

export default UrlInput;