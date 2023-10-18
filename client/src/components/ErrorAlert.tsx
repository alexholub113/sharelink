
const ErrorAlert = ({ message, onClose, className }: { message: string, onClose: () => void, className?: string }) => {
    return (
        <div className={`flex items-center p-4 text-red-800 rounded-lg bg-red-50 card-dark dark:text-red-400 ${className}`}
             role="alert">
            <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                 fill="currentColor" viewBox="0 0 20 20">
                <path
                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span className="sr-only">Info</span>
            <div className="ml-3 mr-4 text-sm font-medium">{message}</div>
            <button onClick={onClose}
                    className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 p-1.5 button-animation bg-transparent hover:scale-105 inline-flex items-center justify-center dark:text-red-400"
                    data-dismiss-target="#alert-2" aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>
        </div>
    );
};

export default ErrorAlert;
