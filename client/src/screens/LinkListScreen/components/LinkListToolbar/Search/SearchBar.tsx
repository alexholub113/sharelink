import { useState } from 'react';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    return (
        <>
            <div className="relative z-0">
                <div className="absolute inset-y-0 pt-1 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="text" id="floating_standard" className="
                                block py-3 pl-10 pr-16 w-full text-gray-900 bg-transparent border-0 
                                border-b-2 border-gray-300 appearance-none dark:text-white/80 
                                dark:border-gray-600 dark:focus:border-cyan-500 focus:outline-none
                                 focus:ring-0 focus:border-cyan-600 peer"
                       placeholder=" " value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
                <label htmlFor="floating_standard" className="
                            absolute text-gray-500 dark:text-gray-400 duration-300 pl-10
                            transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 
                            peer-focus:text-cyan-600 peer-focus:dark:text-cyan-500
                             peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                              peer-focus:scale-75 peer-focus:-translate-y-6">
                    Search by name or tag
                </label>
                <button onClick={() => setSearchTerm('')} className="dark:text-white/60 absolute right-2.5 bottom-2.5 dark:bg-transparent hover:bg-gray-100
                                    focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer text-sm
                                    px-2 top-3 outline-none">
                    Clear
                </button>
            </div>
        </>
    );
};

export default SearchBar;
