import TopTagsList from './components/TopTagsList.tsx';
import SearchByTitleInput from './components/SearchByTitleInput.tsx';
import UserInteractionsFilter from './components/UserInteractionsFilter.tsx';
import {useLinkStore} from '../../contexts/AppContext.tsx';
import TagSearchInput from '../LinkListItem/TagSearchInput.tsx';

const LinkListToolbar = () => {
    const { toggleTagFilter } = useLinkStore();
    return (
        <div className="flex flex-col gap-4 w-full md:max-w-screen-md">
            <TopTagsList />
            <div className="flex flex-wrap gap-2 w-full items-center justify-center">
                <TagSearchInput onTagClick={toggleTagFilter} />
                <UserInteractionsFilter />
            </div>
            <SearchByTitleInput />
        </div>
    );
};

export default LinkListToolbar;