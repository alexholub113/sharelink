import React from 'react';
import {Button} from 'flowbite-react';

type AddLinkButtonProps = {
    showAddLink: boolean;
    onClick: () => void;
};
const AddLinkButton: React.FC<AddLinkButtonProps> = ({ showAddLink, onClick }) => {
    return (
        <Button gradientMonochrome={showAddLink ? 'cyan' : 'teal' } pill size="lg" className="mb-6" onClick={onClick}>
            { showAddLink && (
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                </svg>
            )}
            { !showAddLink && (
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                </svg>
            )}
        </Button>
    );
};

export default AddLinkButton;
