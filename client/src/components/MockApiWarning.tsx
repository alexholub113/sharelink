import {useState} from 'react';
import Modal from './Modal.tsx';

const MockApiWarning = () => {
    const [showMockApiWarning, setShowMockApiWarning] = useState(import.meta.env.VITE_MOCK_API === 'true');

    return <>
        { showMockApiWarning &&
            <Modal onClose={() => setShowMockApiWarning(false)}>
                <div className="flex flex-col justify-center items-center">
                    <h3 className="text-xl font-medium dark:text-white mb-4">Server Offline</h3>
                    <p className="text-sm text-black dark:text-white mb-4">The server is currently offline to save costs. Displayed data is for example purposes only. For more information, please contact me at a.golub113@gmail.com.</p>
                </div>
            </Modal>
        }</>;
};

export default MockApiWarning;