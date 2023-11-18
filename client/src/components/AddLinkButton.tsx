import React from 'react';

type AddLinkButtonProps = {
    showAddLink: boolean;
    onClick: () => void;
};
const AddLinkButton: React.FC<AddLinkButtonProps> = ({ showAddLink, onClick }) => {
    const buttonColor = showAddLink ?
        'from-cyan-400 via-cyan-500 to-cyan-600 focus:ring-cyan-300 dark:focus:ring-cyan-800' :
        'from-cyan-600 via-cyan-700 to-cyan-800 focus:ring-cyan-400 dark:focus:ring-cyan-900';
    return (
        <>
            <button onClick={onClick} className={`text-white bg-gradient-to-r hover:bg-gradient-to-br focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 button-animation ${buttonColor}`}>
                <div className="flex flex-row justify-center items-center font-bold text-lg">
                    { showAddLink && (
                        <>
                            <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                            </svg>
                            <span className="ml-2">Add New Link</span>
                        </>
                    )}
                    { !showAddLink && (
                        <>
                            <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="ml-2">Go Back To List</span>
                        </>
                    )}
                </div>
            </button>
        </>
    );
};

export default AddLinkButton;