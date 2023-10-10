import React from 'react';

type AddLinkButtonProps = {
    showAddLink: boolean;
    onClick: () => void;
};
const AddLinkButton: React.FC<AddLinkButtonProps> = ({ showAddLink, onClick }) => {
    const buttonColor = showAddLink ? 'cyan' : 'teal';
    return (
        <button onClick={onClick} className={`text-white bg-gradient-to-r from-${buttonColor}-400 via-${buttonColor}-500 to-${buttonColor}-600 hover:bg-gradient-to-br focus:outline-none focus:ring-${buttonColor}-300 dark:focus:ring-${buttonColor}-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2`}>
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
        </button>
    );
};

export default AddLinkButton;
