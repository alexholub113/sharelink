import FloatingInput from '../../components/FloatingInput.tsx';
import {useState} from 'react';

const AddLinkScreen = () => {
    const [linkUrl, setLinkUrl] = useState('');
    return (
        <div className="mt-14 w-full md:max-w-screen-md">
            <FloatingInput value={linkUrl} onChange={(value) => setLinkUrl(value)} placeholder="Put your URL here" />
        </div>
    );
};

export default AddLinkScreen;
