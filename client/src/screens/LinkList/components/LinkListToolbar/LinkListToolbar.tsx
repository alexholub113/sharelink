import TagFilter from './TagFilter/TagFilter.tsx';
import SearchInput from './Search/SearchInput.tsx';

const LinkListToolbar = () => {
    return (
        <div className="flex flex-col w-full md:max-w-screen-md">
            <div className="flex mb-3">
                <TagFilter />
            </div>
            <SearchInput />
        </div>
    );
};

export default LinkListToolbar;
