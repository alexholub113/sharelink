import { useState } from 'react';
import FloatingInput from '../../../../../components/FloatingInput.tsx';
import FloatingInputWrapper from '../../../../../components/FloatingInputWrapper.tsx';
import Button from '../../../../../components/Button.tsx';
import SearchIcon from '../../../../../components/Icons/SearchIcon.tsx';

const SearchInput = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    return (
        <FloatingInputWrapper>
            <SearchIcon />
            <FloatingInput
                value={searchTerm}
                onChange={(value) => setSearchTerm(value)}
                placeholder="Search by name"
                pl="pl-10" pr="pr-16"/>
            <Button onClick={() => setSearchTerm('')} className="absolute right-2.5 bottom-2.5 dark:bg-transparent hover:bg-gray-100
                                   px-2 top-3 outline-none">
                Clear
            </Button>
        </FloatingInputWrapper>
    );
};

export default SearchInput;