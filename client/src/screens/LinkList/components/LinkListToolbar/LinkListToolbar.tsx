import TopTagsList from './components/TopTagsList.tsx';
import SearchInput from './components/SearchInput.tsx';
import TagSearch from './components/TagSearch.tsx';

const LinkListToolbar = () => {
    return (
        <div className="flex flex-col gap-4 w-full md:max-w-screen-md">
            <TopTagsList />
            <div className="flex flex-row w-full items-center justify-center">
                <TagSearch />
            </div>
            <SearchInput />
        </div>
    );
};

export default LinkListToolbar;