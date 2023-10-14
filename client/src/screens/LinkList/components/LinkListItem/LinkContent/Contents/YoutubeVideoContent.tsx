import {YoutubeVideo} from '../../../../../../services/LinkService/interfaces/Link.ts';
import ContentTitle from './ContentTitle.tsx';

const YoutubeVideoContent = ({ title, id }: YoutubeVideo) => {
    return (
        <>
            <ContentTitle title={title} />
            <iframe className="aspect-video w-full" src={`https://www.youtube.com/embed/${id}`} title="YouTube video player"></iframe>
        </>
    );
};

export default YoutubeVideoContent;
