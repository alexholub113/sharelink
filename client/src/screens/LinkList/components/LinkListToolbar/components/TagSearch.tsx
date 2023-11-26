import {useLinkStore} from '../../../../../contexts/AppContext.tsx';
import TagSearchInput from '../../../../../components/TagSearchInput.tsx';

const TagSearch = () => {
    const { toggleTagFilter } = useLinkStore();
    return <TagSearchInput onTagClick={toggleTagFilter} />;
};

export default TagSearch;