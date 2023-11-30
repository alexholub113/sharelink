import {YoutubeVideo} from '../../../../models/Link.ts';

const YoutubeVideoContent = ({ videoId }: YoutubeVideo) => {
    return (
        <iframe className="aspect-video w-full border-1 dark:border-zinc-900 shadow dark:shadow-zinc-900"
                src={`https://www.youtube.com/embed/${videoId}`} title="YouTube video player"></iframe>
    );
};

export default YoutubeVideoContent;