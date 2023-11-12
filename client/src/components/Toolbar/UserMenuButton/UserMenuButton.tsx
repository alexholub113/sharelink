import {useState} from 'react';
import UserMenu from './UserMenu.tsx';

const UserMenuButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen)} className="font-semibold text-black/70 p-2 outline-none hover:text-black hover:scale-110 active:scale-105 transition cursor-pointer" type="button">
                <span className="sr-only">Open user menu</span>
                <svg className="w-8 h-8 dark:text-zinc-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                </svg>
            </button>
            { isOpen && <UserMenu onClose={() => setIsOpen(false)} /> }
        </div>
    );
};

export default UserMenuButton;