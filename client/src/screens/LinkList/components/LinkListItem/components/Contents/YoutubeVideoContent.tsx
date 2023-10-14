import {YoutubeVideo} from '../../../../../../services/LinkService/interfaces/Link.ts';

const YoutubeVideoContent = ({ id }: YoutubeVideo) => {
    return (
        <iframe className="aspect-video w-full border-1 dark:border-zinc-900 shadow dark:shadow-zinc-900"
                src={`https://www.youtube.com/embed/${id}`} title="YouTube video player"></iframe>
    );
};

export default YoutubeVideoContent;
