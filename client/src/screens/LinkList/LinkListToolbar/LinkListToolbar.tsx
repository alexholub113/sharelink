import TopTagsList from './components/TopTagsList.tsx';
import SearchByTitleInput from './components/SearchByTitleInput.tsx';
import UserInteractionsFilter from './components/UserInteractionsFilter.tsx';
import { observer } from 'mobx-react-lite';
import TagSearchInput from '../../../components/LinkListItem/TagSearchInput.tsx';
import {useLinkStore} from '../../../contexts/AppContext.tsx';

const LinkListToolbar = observer(() => {
    const { toggleTagFilter, state: { filter: { tags }} } = useLinkStore();
    return (
        <div className="flex flex-col gap-4 w-full md:max-w-screen-md">
            <TopTagsList />
            <div className="flex flex-wrap gap-2 w-full items-center justify-center">
                <TagSearchInput exclude={tags} onTagSelect={toggleTagFilter} />
                <UserInteractionsFilter />
            </div>
            <SearchByTitleInput />
        </div>
    );
});

export default LinkListToolbar;